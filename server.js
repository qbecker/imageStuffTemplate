//Express is the convniance API were using for url routing
var express = require('express');
//path is another conviencen API for so we dont have to find the root project dir on our own
var path = require('path');
//a fancy constructor
var app = express();
//another fancy constructor
var router = express.Router();


//The route of our index page. 
//Lets express know where the javascript file for handeling the request of "/" on our website
var rtIndex = require('./routes/index.js');


//setting the render engine to use jade, a templating engine
//http://jadelang.net/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//telling express that we want '/' to be handeled by the var rtIndex
app.use('/', rtIndex);

//Telling experss that we want the dir /uploads to be public
//for example if we go to mysite.com/test.img it will display the image
app.use(express.static(__dirname + '/uploads'));


//one liner for node to listen on 8080, the default port
app.listen(8080);

//exporting the router for use in our 'routes' folder
module.exports.router = router;