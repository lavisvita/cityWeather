'use strict';
let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = 4000,
    weatherAction = require('./routes/weatherAction'),
    Cities = require('./models/Cities'),
    mongoose = require('mongoose');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
mongoose.connect('mongodb://localhost/testTasks');
app.use(bodyParser.urlencoded({extended: true, defer: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use('/', weatherAction);

app.listen(port, function(){
    console.log('listening on port: ' + port);
});

