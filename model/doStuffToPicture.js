var fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename);


//this function is where you would put your image proccessing logic
function sendBackPic(picPath, userText, callback){
    //slice off the first part of the picture path so we only have the filename
    var picPath = picPath.split("/")[1];
    //create an array to put strings of HTML in
    var responseBuffer = [];
    responseBuffer.push('<HTML>');
    responseBuffer.push('<BODY>');
    responseBuffer.push('<CENTER>');
    responseBuffer.push('<p>The text you entered: ' + userText + '</p>' );
    responseBuffer.push('<br>');
    responseBuffer.push('<p>The image you uploaded:</p><br>' );
    responseBuffer.push('<img src ="'+picPath+'">');
    responseBuffer.push('</CENTER>');
    responseBuffer.push('</BODY>');
    responseBuffer.push('</HTML>');
    //join all indexes of the array into one so the browser can parse it
    //and shove it into our callback varable
    callback(responseBuffer.join(""));
    
    //clear the response buffer array to not cause a memory leak
    responseBuffer = [];
}

module.exports.sendBackPic = sendBackPic;