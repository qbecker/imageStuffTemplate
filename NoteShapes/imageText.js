var title;
var img;
var txt;
var textField;
var sliderDisp;
// var txtSz = 24;
var txtSz;
var slider;
var canvasDisp

var start = [];
var end = [];
var TEST = 0;

var s2 = [];

function preload() {

    var imgFolder = "images/";
    // var imgFile = "pine.png";
    // var imgFile = "leaf.png"
    // var imgFile = "favorite-heart-button.png"
    // var imgFile = "car-black-side-silhouette.png"
    // var imgFile = "heart.png"
    // var imgFile = "tree-silhouette.png"
    // var imgFile = "car_black.png"

    // var imgFile = imgFolder+"_Braden_Limb_1small.jpg"
    // var imgFile = imgFolder+"rainbow2.jpg"
    // var imgFile = imgFolder + "favorite-heart-button.png"
    // var imgFile = imgFolder + "k+b_bw.jpg"
    var imgFile = imgFolder + "ideacity2bw.png"
        // var imgFile = imgFolder + "lake_bw.png"

    img = loadImage(imgFile);

}

function setup() {
    title = createElement("h1", "Welcome to Text Picture");
    title.style("text-align", "center");
    // createP("Enter your text:");
    var txt2 = createElement("p", "Enter your text");
    txt2.style("text-align", "center");
    txt2.style("text-decoration", "underline")

    var txtBack = createA("/index.html", "Back to main page.");
    //     var aspectRatio = img.width/img.height;
    //     var imgHeight = 1000;
    // createCanvas(imgHeight*aspectRatio, imgHeight);
    // img.resize(imgHeight*aspectRatio, imgHeight);
    textField = createElement("textarea", "This is a test of the program. ");
    textField.input(updateCanvas);
    textField.style("display", "block");
    textField.style("margin-left", "auto");
    textField.style("margin-right", "auto");
    textField.style("width", img.width / 2 + "px");
    textField.style("height", 100 + "px");

    createP(" ");

    slider = createSlider(5, 50, 20, 1);
    slider.input(sliderUpdate);
    slider.style("display", "block");
    slider.style("margin-left", "auto");
    slider.style("margin-right", "auto");
    slider.style("width", 500 + "px");

    createP(" ");

    sliderDisp = createElement("p", "FontSize: 15px");
    sliderDisp.style("text-align", "center");

    createP(" ");

    var imgSize = createElement("p", "Image size is: " + img.width + " px by " + img.height + " px");
    imgSize.style("text-align", "center");

    createP(" ");

    canvasDisp = createCanvas(img.width, img.height);
    canvasDisp.style("display", "block");
    canvasDisp.style("margin-left", "auto");
    canvasDisp.style("margin-right", "auto");
    pixelDensity(1);

    sliderUpdate()
    updateCanvas()


}

function sliderUpdate() {
    // txtSz = slider.value();
    // textSize(txtSz);
    sliderDisp.html("FontSize: " + slider.value() + " px");
    updateCanvas();
}

function updateCanvas() {
    start = [];
    end = [];
    s2 = [];

    backColor = 255;
    background(backColor);

    txtSz = slider.value();
    textSize(txtSz);
    textAlign(LEFT, TOP)
    textFont("Helvetica");
    // image(img,0,0)

    txt = textField.value();
    // fill(255);
    var margSize = 10;

    // Load pixel arrays for image and canvas.
    img.loadPixels();

    loadPixels();

    // Store locations of text start and stop
    for (var y = margSize; y < height - margSize - txtSz; y++) {
        start.push([margSize, y]);
        end.push([width - margSize, y]);
    }

    // Loop through every pixel.
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {

            // Get RGB colors from image.
            var indexPre = (x + y * width - 1) * 4;
            var index = (x + y * width) * 4;
            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];
            var alpha = img.pixels[index + 3];


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

                    var xx = round(start[k][0] + used + textWidth(charUse) / 2);
                    var yy = round(start[k][1] + txtSz / 2);

                    // Get RGB colors from image.
                    var index = (xx + yy * width) * 4;
                    var r = img.pixels[index + 0];
                    var g = img.pixels[index + 1];
                    var b = img.pixels[index + 2];
                    var alpha = img.pixels[index + 3];

                    var clrScale = 200;
                    r = r / 255 * clrScale;
                    b = b / 255 * clrScale;
                    g = g / 255 * clrScale;
                    alpha = alpha / 255 * clrScale;
                    if (alpha < 50) {
                        alpha = 50;
                    }


                    // if (yy > 250 && yy < 350 && TEST < 500) {
                    //   // print(r,g,b,alpha);
                    //   print(xx,yy);
                    //   TEST++
                    // }

                    // fill(x1/width*255,y1/height*255,152,255);
                    fill(r, g, b, alpha);
                    // fill(random(255));


                    text(charUse, start[k][0] + used, start[k][1])
                    strPix = textWidth(charUse) + spcAdd;
                    used += strPix

                    if (i == charEnd && start[k][1] != start[k + 1][1]) {
                        nextUse = start[k][1] + txtSz * 1;
                    }
                }
                charStart = charEnd + 2;
                charEnd += 2;
                // usedTot += used;
            }

        }
    }

}
