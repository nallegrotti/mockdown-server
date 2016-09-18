# My API definition 

This is my second API. This API can make stuff.

## [GET] /users/:id

You can consult any user

### Examples
#### [GET] /users/10

	> status: 200
	> response: ```json
	{
		"id": 10,
		"name": "my user",
		"nickname": "has a nick"
	}
	```

#### [PUT] /users/10
	
	> status: 202
	> response: ```json
	{
		"id": 1,
		"name": "other user", 
		"lastname": "has lastname",
		"nickname": "has a nick"
	}
	```

#### [GET] /users/30
	
	> status: 404
	> response: ```json
	{
		"error": "not_found",
		"message": "user not found, try another user"
	}
	```
