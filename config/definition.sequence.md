#### [GET] /heros/1
El primer request devuelve un estado transitorio 

	> status: 200
	> response: ```json
	{"name": "Bruce Wayne", "status": "child"}
	```

Los siguientes request devuelven el estado final. El cambio sucede en background. 

	> status: 200
	> response: ```json
	{"name": "Bruce Wayne", "status": "orphan"}
	```
