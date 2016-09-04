let self = {}

self.defaultResponse = (req, res) => {
	res.status(200).json({
		id: 1234, 
		name: 'mock'
	})
}

class ExampleReader {
	constructor(definition){
		this.verb = definition[1].toLowerCase()
		this.url = definition[2]
		this.capture = this.waitForIt
		this.body = { mock: 'mocked'}
	}

	processLine(line){
		let statusLine = line.match(/> status: (\d*)/)
		if (statusLine){
			this.status = statusLine[1]
		}
		
		this.capture(line)
	}

	waitForIt(line){
		let responseStartLine = line.match(/> response: ```/)
		if (responseStartLine){
			console.info('Body capture started', line)
			this.capture = this.captureResponse
			this.bodyTxt = ''
		}
	}

	captureResponse(line){
		if (line.match(/```/)){
			console.info('Body capture ended', line, this.bodyTxt)
			this.capture = () => {}
			this.body = JSON.parse(this.bodyTxt)
		} else {
			this.bodyTxt += line
		}
	}

	response(req, res){
		res.status(this.status||200).json(this.body)
	}

	registerRoute(router){
		console.info('registering', this)
		router[this.verb](this.url, (req, res) => this.response(req, res))
	}
}
self.ExampleReader = ExampleReader

module.exports = self