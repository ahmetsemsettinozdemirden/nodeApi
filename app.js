// dependencies
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
// var jwt = require('jsonwebtoken');

// imports database models
// var User = require('./app/models/user');
const config = require('./app/config');


// connecting to database
mongoose.connect('mongodb://localhost/BasicAuth');

// setting secret key for auth
app.set('superSecret', config.secret);
//app.use("/public", express.static(__dirname + '/public')); // public klasoru icindeki dosyalarin kullanilmasini saglar.

// middlewares
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
app.use(morgan('dev'));

// import and use api router
var apiRouter = require('./app/routes/apiRouter');
app.use('/api', apiRouter);

app.all('/', function (req, res) {
    res.json({message: 'use /api/... to use API.'});
})

// start server
var port = process.env.PORT || 1337;
app.listen(port);
console.log('server started on', port);


