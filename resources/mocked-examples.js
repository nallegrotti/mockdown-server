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
		let bodyStartLine = line.match(/< body: ```/)
		if (responseStartLine){
			console.info('Response Body capture started', line)
			this.capture = this.captureResponse
			this.bodyTxt = ''
		}
		if (bodyStartLine){
			console.info('Body capture started', line)
			this.capture = this.captureBodyParameter
			this.bodyParamTxt = ''
		}
	}

	captureResponse(line){
		if (line.match(/```/)){
			console.info('Response body capture ended', line, this.bodyTxt)
			this.capture = () => {}
			this.body = JSON.parse(this.bodyTxt)
		} else {
			this.bodyTxt += line
		}
	}

	captureBodyParameter(line){
		if (line.match(/```/)){
			console.info('Body capture ended', line, this.bodyParamTxt)
			this.capture = this.waitForIt
			this.bodyKey = JSON.stringify(JSON.parse(this.bodyParamTxt))
		} else {
			this.bodyParamTxt += line
		}
	}

	response(req, res, next){
		console.log("Body=", req.body)
		console.log("ParamBody=", this.bodyKey)
		if (JSON.stringify(req.body) == this.bodyKey){
			res.status(this.status||200).json(this.body)
		}
		next()
	}

	registerRoute(router){
		console.info('registering', this)
		router[this.verb](this.url, (req, res, next) => this.response(req, res, next)) 
	}
}
self.ExampleReader = ExampleReader

module.exports = self