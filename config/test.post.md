#### [POST] /musicians
You can post a musician's name and the API will guess the band
	
	< body: ```json 
	{
	  "name": "Richard Starkey",
	  "nickname": "Ringo Starr"
	}
	```
	
	> status: 201	
	> response: ```json
	{
	  "name": "Richard Starkey", 
	  "nickname": "Ringo Starr", 
	  "band": "The Beatles"
	}
	```

#### [POST] /musicians
You can post a musician's name and the API will guess the band
	
	< body: ```json 
	{
	  "name": "Gordon Sumner",
	  "nickname": "Sting"
	}
	```
	
	> status: 201	
	> response: ```json
	{
	  "name": "Gordon Sumner",
	  "nickname": "Sting",
	  "band": "The Police"
	}
	```