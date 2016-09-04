# My API definition 

This is my API. This API can make stuff.

## [GET] /users/:id

You can consult any user

### Examples
#### [GET] /users/1

	> status: 200
	> response: ```json
	{
		"id": 1,
		"name": "my user"
	}
	```

#### [PUT] /users/1
	
	> status: 202
	> response: ```json
	{
		"id": 1,
		"name": "other user", 
		"lastname": "has lastname"
	}
	```

#### [GET] /users/3
	
	> status: 404
	> response: ```json
	{
		"error": "not_found",
		"message": "user not found, try another user"
	}
	```
