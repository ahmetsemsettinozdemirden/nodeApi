var express = require('express');
var jwt = require('jsonwebtoken');

var apiRouter = express.Router();

var User = require('../models/user');
const config = require('../config');

// TODO's
/*
 * delete user
 */

apiRouter.post('/signIn', function (req, res) {

    // check the username and password fields
    if (req.body.username !== '' && req.body.password !== '') {

        // search username in database
        User.findOne({username: req.body.username}, function (err, user) {

            if (err) throw err;

            // check user via username
            if (!user) {
                res.json({success: false, message: 'user not found!'});
            } else if (user) {
                // check password
                if (req.body.password != user.password) {
                    res.json({success: false, message: 'invalid password!'});
                } else {

                    // creates a token for user
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 1440
                    });

                    // response to user with token
                    res.json({success: true, message: 'succesful', token: token, userId: user._id});
                }
            }
        });

    } else {
        res.json({success: false, message: 'fill in the blanks!'});
    }

});

apiRouter.post('/signUp', function (req, res) {

    if (req.body.username !== "" && req.body.email !== "") {

        User.count({$or: [{username: req.body.username}, {email: req.body.email}]}, function (err, c) {
            if (err)
                console.error(err);
            else if (c == 0) {
                res.json({success: true, message: 'user created!'});
                User.create({username: req.body.username, email: req.body.email, password: req.body.password});
            } else {
                res.json({success: false, message: 'username or email is already using!'});
            }
        });

    } else {
        res.json({success: false, message: 'fill in the blanks!'});
    }
});

// verify token for requests
apiRouter.use(function (req, res, next) {

    // check for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'failed to authenticate token'});
            } else {
                //console.log("decoded", decoded);
                req.decoded = decoded;
                next();
            }
        })

    } else {

        // return res.status(403).send({
        return res.status(403).json({
            success: false,
            message: 'no token provided'
        });

    }

});

// get all users
apiRouter.get('/users/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) throw err;
        res.json(users);
    });
});

// get user by id
apiRouter.get('/users/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({success: false, message: 'user not found!'});
        } else {
            res.json(user);
        }
    });
});

// update one user by id
apiRouter.patch('/users/:id', function (req, res) {

    User.findById(req.params.id, function (err, user) {
        if (err) throw err;

        // check the user exists
        if (!user) {
            res.json({success: false, message: 'user not found!'});
        } else {

            // if there is changes on user's properties use them, else use most recent properties of user
            var _username = req.body.newUsername ? req.body.newUsername : user.username;
            var _password = req.body.newPassword ? req.body.newPassword : user.password;
            var _email = req.body.newEmail ? req.body.newEmail : user.email;

            User.findOneAndUpdate({_id: req.params.id}, {
                username: _username,
                password: _password,
                email: _email
            }, function (err, user) {
                if (err) throw err;
                res.json({result: true, message: 'Updated successfully!'});
            })
        }
    })

});

apiRouter.delete('/users/:id', function (req, res) {

    console.log("user delete request: ", req.params.id);

    User.findByIdAndRemove({_id: req.params.id}, function (err, user) {
        if (err) throw err;
        res.json({result: true, message: 'Deleted successfully!'});
    })
})


module.exports = apiRouter;