let express = require('express'),
	router	= express.Router(),
	mocks 	= require('../resources/mocked-examples'),
	split 	= require('split'),
	fs    	= require('fs')

let currentExample = null;
let examples = 0;

fs.createReadStream('config/definition.md')
	.pipe(split())
	.on('data', function(line){
		let example = line.match(/^#### \[(.*)\] (.*)/)
		if (example){
			if (examples++){
				currentExample.registerRoute(router)
			}
			currentExample = new mocks.ExampleReader(example)
		}else if (currentExample){
			currentExample.processLine(line)
		}
	})
	.on('end', function(){
		if (currentExample){
			currentExample.registerRoute(router)
		}
	})

router['get']('/test', mocks.defaultResponse)
/* GET home page. */
router.get('/', mocks.defaultResponse);

module.exports = router;
