# RESTful Node.js API for Unnamed (Tappz) Project
Server side of the Unnamed Project created by Node.js. It has Express, Mongoose, Morgan and Jwt frameworks.


## Docs

Simple documentary for API. All responses' types are json.

#### Sign In

Searches the username on the database and checks its password,then if the authentication is successful generates a token and return token, message and userId to application. Uses POST http method.

```
http://localhost:1337/api/signIn
```

##### Requirements
- username
- password


###### The List of Responses:
- {success: false, message: 'fill in the blanks!'}
- {success: false, message: 'user not found!'}
- {success: false, message: 'invalid password!!'}
- {success: true, message: 'successful', token: token, userId: user._id}

#### Sign Up

Searches the username and email on the database and checks it there any exists, then if there is no existence, creates new user object and push it to database, return a message to application. Uses POST http method.

```
http://localhost:1337/api/signUp
```

##### Requirements
- username (string)
- password (string)
- email    (string)

##### The List of Responses:
- {success: false, message: 'fill in the blanks!'}
- {success: false, message: 'username or email is already using!'}
- {success: true, message: 'user created!'}

The rest of methods require a token. User have to sign in before using them.

#### List All Users

Lists all users in the database. Uses GET http method.

```
http://localhost:1337/api/users/
```

##### Requirements
- token

##### The List of Responses:
- {{(User Object)}, {(User Object)}, ...}


#### List User by ID

Searches an user in database by id and returns the users information. Uses GET http method.

```
http://localhost:1337/api/users/:id
```

##### Requirements
- token
- id

##### The List of Responses:
- {success: false, message: 'user not found!'}
- {(User Object)}

#### Update User by ID

Searches an user in database by id and updates it according to given (new) user information. If any property of user is not given, then that property does not change. Uses PATCH http method.

```
http://localhost:1337/api/users/:id
```

##### Requirements
- token
- id

##### The List of Responses:
- {success: false, message: 'user not found!'}
- {(User Object)}

#### Delete User by ID

Searches an user in database by id and deletes it. Uses DELETE http method.

```
http://localhost:1337/api/users/:id
```

##### Requirements
- token
- id

##### The List of Responses:
- {result: true, message: 'Deleted successfully!'}

