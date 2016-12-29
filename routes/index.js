var express = require('express');
var router = express.Router();
var multer  = require('multer');
var path = require('path');

//API writing unique file names
var crypto = require('crypto');

// telling our route where the function to manipulate our picture is.
var picManipulation = require('../model/doStuffToPicture.js');

// varable to tell multer how to name the file
var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err){
        return cb(err);  
      } 

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
});

//var to multer where to store the file
var upload = multer({ storage: storage });



//when express get a 'GET' request on '/'
// render the index.jade file
router.get('/',function(req, res){
    res.render('index.jade');
});


// when express gets a 'POST' request on '/'
//call our image manipulation function
//upload single handels one file. the 'displayImage' is the name/ID of the html file upload field
router.post('/', upload.single('displayImage'), function(req, res){
    //sendBackPic function(file path, what the user entered, callback)
    //callbacks are because node runs on a single thread
    //this allows us to delegate a worker thread to deal with the image manipulation
    //while node handels another request
    // req.file.path is a key from the JSON object of the req var(Whats in our file upload html form)
    // req.body.Text is also a JSON value of the data in our textbox
    
    picManipulation.sendBackPic(req.file.path, req.body.Text, function(result){
        res.send(result);
    });
});

module.exports = router;