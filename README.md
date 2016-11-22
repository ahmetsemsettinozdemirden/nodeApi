# RESTful Node.js API for Unnamed (Tappz) Project
Server side of the Unnamed Project created by Node.js. It has Express, Mongoose, Morgan and Jwt frameworks.


## Docs

Simple documentary for API.

#### Sign In

Requires username and password of user. Uses POST http method. Searchs the username on the database and checks its password,then if the authentication is successful generates a token and response message, return them to application.

```
http://localhost:1337/api/signIn
```

###### Requirements
- username
- password


###### The List of Responses:
- {success: false, message: 'fill in the blanks!'}
- {success: false, message: 'user not found!'}
- {success: false, message: 'invalid password!!'}
- {success: true, message: 'succesful', token: token}

#### Sign Up

Requires username and password of user. Uses POST http method. Searchs the username and email on the database and checks it there any exists, then if there is no existence, creates new user object and push it to database, return a message to application.

```
http://localhost:1337/api/signUp
```

###### Requirements
- username
- password
- email

##### The List of Responses:
- {success: false, message: 'fill in the blanks!'}
- {success: false, message: 'username or email is already using!'}
- {success: true, message: 'user created!'}

**The rest of methods require a token. User have to sign in before using them.**

#### List All Users

#### List User by ID

