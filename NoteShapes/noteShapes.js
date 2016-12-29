var title;
var img;
var txt;
var textField;
var canvasDisp;
var slider;
var sliderDisp;
var txtSz;
var testPix
var buttonOutline
var buttonShape
var outlineShape
var imgFilename

var imgFilenameArry = ["pine.png", "tree-silhouette.png", "leaf.png", "heart.png", "favorite-heart-button.png", "car_black.png", "car-black-side-silhouette.png"];
var imgArrayIndex



var start = [];
var end = [];
var TEST = 0;

var s2 = [];

function preload() {
    if (imgArrayIndex == undefined) {
      imgArrayIndex = 3;
      imgFilename = imgFilenameArry[imgArrayIndex]
    }
    var imgFolder = "images/";
    var imgFile = imgFolder + imgFilename;
    // var imgFile = "leaf.png"
    // var imgFile = "favorite-heart-button.png"
    // var imgFile = "car-black-side-silhouette.png"
    // var imgFile = "heart.png"
    // var imgFile = "tree-silhouette.png"
    // var imgFile = "car_black.png"
    // var imgFile = "favorite-heart-button.png"

    img = loadImage(imgFile);

}

function setup() {
    // title = createElement("h1", "Welcome to Note Shapes");
    // title.style("text-align", "center");
    // // createP("Enter your text:");
    //
    // var txtBack = createA("/index.html", "Back to main page.");
    // txtBack.style("align", "center");
    // txtBack.style("margin-left", "auto");
    // txtBack.style("margin-right", "auto");
    // textField.style("display", "block");
    // txt2.style("text-decoration", "underline")

    var txtColor = "white";
    var bgColor = "black";

    var txt2 = createElement("p", "Enter your text");
    // txt2.class("noteshape_Text");
    txt2.style("text-align", "center");
    txt2.style("text-decoration", "underline")
    txt2.style("color", txtColor)


    textField = createElement("textarea", "This is a test of the program. ");
    textField.input(updateCanvas);
    textField.style("display", "block");
    textField.style("margin-left", "auto");
    textField.style("margin-right", "auto");
    textField.style("width", img.width + "px");


    createP(" ");

    slider = createSlider(5, 30, 10, 0.05);
    slider.input(sliderUpdate);
    slider.style("display", "block");
    slider.style("margin-left", "auto");
    slider.style("margin-right", "auto");
    slider.style("width", img.width + "px");

    sliderDisp = createElement("p", "FontSize: 15px");
    sliderDisp.style("text-align", "center");
    sliderDisp.style("color", txtColor)


    createP(" ");

    buttonOutline = createButton("Press for shape outline")
    buttonOutline.style("display", "block");
    buttonOutline.style("margin-left", "auto");
    buttonOutline.style("margin-right", "auto");
    buttonOutline.style("background-color", bgColor);
    buttonOutline.style("color", txtColor);
    buttonOutline.mousePressed(outlineAdd);
    outlineShape = 255;

    createP(" ");

    buttonShape = createButton("Press for new shape")
    buttonShape.style("display", "block");
    buttonShape.style("margin-left", "auto");
    buttonShape.style("margin-right", "auto");
    buttonShape.mousePressed(newShape);
    imgArrayIndex = 0;

    createP(" ");

    var imgSize = createElement("p", "Image size is: " + img.width + " px by " + img.height + " px" );
    imgSize.style("text-align", "center");
    imgSize.style("color", txtColor)

    createP(" ");

    canvasDisp = createCanvas(img.width, img.height);
    canvasDisp.style("display", "block");
    canvasDisp.style("margin-left", "auto");
    canvasDisp.style("margin-right", "auto");
    pixelDensity(1);
    // textField = select("#textEnter");



    textSize(txtSz);
    textAlign(LEFT, TOP)
    textFont("Helvetica");
    // textField.changed(newText);

    sliderUpdate()
    updateCanvas()
}

function sliderUpdate() {
    txtSz = slider.value();
    textSize(txtSz);
    sliderDisp.html("FontSize: " + slider.value() + "px");
    updateCanvas();
}

function outlineAdd() {
    if (outlineShape == 0) {
        outlineShape = 255;
    } else if (outlineShape == 255) {
        outlineShape = 0;
    } else {
        outlineShape = 125;
    }
    updateCanvas();
}

function newShape() {
    imgArrayIndex++
    if (imgArrayIndex == imgFilenameArry.length) {
        imgArrayIndex = 0;
    }
    imgFilename = imgFilenameArry[imgArrayIndex];
    var imgFolder = "images/";
    var imgFile = imgFolder + imgFilename;

    img = loadImage(imgFile);
    preload();
    updateCanvas();

}

// function newText(){
//
// }

function updateCanvas() {
    start = [];
    end = [];
    s2 = [];

    txt = textField.value();

    background(250);
    // image(img,0,0)

    // Load pixel arrays for image and canvas.
    img.loadPixels();

    loadPixels();

    var Q = 1;
    var pixOld = 255;

    // Loop through every pixel.
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {

            // Get RGB colors from image.
            var indexPre = (x + y * width - 1) * 4;
            var index = (x + y * width) * 4;
            var indexPost = (x + y * width + 1) * 4;
            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];
            var alpha = img.pixels[index + 3];

            // Get rid of greys.
            if (alpha == 255) {
                var blk = 0;
                var grey0 = 0;
                img.pixels[index + 0] = blk + grey0;
                img.pixels[index + 1] = blk + grey0;
                img.pixels[index + 2] = blk + grey0;
                img.pixels[index + 3] = alpha;
                // if ( TEST < width ) {
                //   print(img.pixels[(10*512+10)*4]);
                //   TEST++
                // }
            } else {
                img.pixels[index + 0] = 255;
                img.pixels[index + 1] = 255;
                img.pixels[index + 2] = 255;
                img.pixels[index + 3] = alpha;
            }

            var testPix = img.pixels[(1 + 1 * width) * 4];

            // Find transition locations to black.
            if (img.pixels[index] != img.pixels[indexPre] && (x * y) > 0) {
                pixels[index + 0] = 0;
                pixels[index + 1] = 0;
                pixels[index + 2] = 0;
                pixels[index + 3] = outlineShape;

                // Store locations of text start and stop
                if (Q == 1) {
                    if (start.length != end.length) {
                        continue
                    } else {
                        if (img.pixels[index] == testPix) {
                            start.push([0, y]);
                            end.push([x, y]);
                        } else {
                            start.push([x, y]);
                            // pixels[index + 0] = 255;
                            Q = 2;
                        }
                    }

                } else {

                    end.push([x, y]);
                    Q = 1;
                }

            }

            // if (TEST < width && y == 500) {
            //     print(start[0][1]);
            //     TEST++
            // }


        }
    }

    // Update pixels on canvas.
    updatePixels();

    // var s2 = [];
    s2 = split(txt, " ");

    fill(0);
    var nextUse = 1;
    var spc = "   ";
    var indexStart = 0;
    var indexEnd = 0;
    var spcAdd = 0;
    var charStart = 0;
    var charEnd = 0;

    //  Loop through all start/end locations.
    for (var k = 0; k < start.length; k++) {
        // If all the text has been used stop.
        if (charEnd > txt.length) {
            break;
        } else {
            //  Don't put text too close together.
            if (start[k][1] >= nextUse) {
                var usedTest = 0;
                var avl = dist(start[k][0], start[k][1], end[k][0], end[k][1]);
                var avlTest = avl;
                var spcAdd = 0;
                var beenHere = 0;
                // Loop to find the number of characters to put on row.
                for (var j = indexStart; j < s2.length; j++) {
                    if (textWidth(s2[j]) <= avlTest) {
                        if (beenHere == 1) {
                            charEnd += 1
                        }
                        usedTest += textWidth(s2[j]);
                        usedTest += textWidth(spc[1]);
                        charEnd += s2[j].length;
                        avlTest = avl - usedTest;
                        indexEnd += 1;
                        beenHere = 1;
                        // if (TEST < 4) {
                        //     print(avl,avlTest,usedTest,textWidth(s2[j]));
                        //     TEST++
                        // }
                    } else if (textWidth(s2[j]) > avlTest && beenHere == 1) {
                        charEnd -= 1;
                        var pixChar = textWidth(txt.substr(charStart, charEnd - charStart + 1));
                        var numChar = charEnd - charStart;
                        spcAdd = (avl - pixChar) / numChar;
                        // spcAdd = avlTest / numChar;
                        spcAdd = spcAdd;

                        break;
                    } else {
                        break;
                    }
                }

                indexStart = indexEnd;

                if (indexStart == s2.length) {
                    charEnd -= 1;
                }

                // If no text is used then go to next pixel row.
                if (beenHere == 0) {
                    continue;
                }



                // if (TEST < 20) {
                //     print(start[k][0], start[k][1], end[k][0], end[k][1], k, j);
                //     print(avl, pixChar, numChar, charStart, charEnd, spcAdd);
                //
                //     TEST++
                // }



                var used = 0;
                for (var i = charStart; i <= charEnd; i++) {
                    var strPix = 0;
                    var charUse = txt[i];
                    // if (TEST < 20) {
                    //     print(charUse);
                    //     TEST++
                    // }
                    text(charUse, start[k][0] + used, start[k][1])
                    strPix = textWidth(charUse) + spcAdd;
                    used += strPix

                    if (i == charEnd && start[k][1] != start[k + 1][1]) {
                        nextUse = start[k][1] + txtSz * 1.1;
                    }
                }
                charStart = charEnd + 2;
                charEnd += 2;
                // usedTot += used;
            }

        }
    }

    // var loc = 149;
    // text(txt,start[loc][0],start[loc][1])
    // text("end!",end[loc][0],end[loc][1])
    // if (TEST < width) {
    //     print(txt);
    //     TEST++
    // }

}
