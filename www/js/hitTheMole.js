window.onload = onDeviceReady;

var molePositions = [{x: 212, y: 128}];
var points = 0;
var aspectRatio;
var enlargement = 1;
var borderWidth = 0;

function onDeviceReady() {
    setBackgroundSize();

    initMoleClickHandler();
    setTimeout("showTheMole()", 1000);
}

function setBackgroundSize() {
    var longestAspectRatio = 800 / 450;
    var documentWidth = window.innerWidth;
    var documentHeight = window.innerHeight;
    aspectRatio = documentWidth / documentHeight;
    var background = document.getElementById("background");
    var holes = document.getElementById("holes");
    
    if (aspectRatio >= longestAspectRatio) {
        background.style["height"] = documentHeight + "px";
        holes.style["height"] = documentHeight + "px";
        document.body.style["height"] = documentHeight + "px";
        background.style["width"] = documentWidth + "px";
        holes.style["width"] = documentWidth + "px";
        document.body.style["width"] = documentWidth + "px";
    } else {
        var backgroundAspectRatio = 800 / 450;
        var backgroundWidth = backgroundAspectRatio * documentHeight;
        background.style["height"] = documentHeight + "px";
        holes.style["height"] = documentHeight + "px";
        document.body.style["height"] = documentHeight + "px";
        background.style["width"] = backgroundWidth + "px";
        holes.style["width"] = backgroundWidth + "px";
        document.body.style["width"] = backgroundWidth + "px";
        borderWidth = (backgroundWidth - documentWidth) / 2;
        console.log("borderWidth: " + borderWidth);
        background.style["left"] = "-" + borderWidth + "px";
        holes.style["left"] = "-" + borderWidth + "px";
    }

    console.log("backgroundHeight: " + background.offsetHeight);
    enlargement = background.offsetHeight / 450;
    console.log("enlargement: " + enlargement + ", borderWidth: " + borderWidth);
    var mole = document.getElementById("mole");
    mole.style["height"] = mole.offsetHeight * enlargement + "px";
    mole.style["width"] = mole.offsetWidth * enlargement + "px";
}

function initMoleClickHandler() {
    var mole = document.getElementById("mole");
    mole.onclick = function () {
        points += 10;
        var pointText = document.getElementById("points");
        pointText.innerHTML = points;
    };
}

function showTheMole() {
    setMolePosition();
    var mole = document.getElementById("mole");
    mole.style.visibility = "visible";
    console.log("Anfang: " + mole.style["top"]);

    var i = 6;
    var interval1 = setInterval(function () {
        mole.style["top"] = (mole.offsetTop - 10) + "px";
        console.log(mole.style["top"]);

        if (i === 0) {
            setTimeout(function () {
                var j = 0;
                var interval2 = setInterval(function () {
                    mole.style["top"] = (mole.offsetTop + 10) + "px";
                    console.log(mole.style["top"]);

                    if (j === 6) {
                        clearInterval(interval2);
                        mole.style.visibility = "hidden";
                        setTimeout(function(){
                            showTheMole();
                        }, 3000);
                    }
                    j++;
                }, 200);
            }, 2000);
            clearInterval(interval1);
        }
        i--;
    }, 200);
}

function setMolePosition() {
    var randomIndex = _.random(0, molePositions.length - 1);
//    console.log("randomIndex: " + randomIndex + ", aspectRatio: " + aspectRatio + ", enlargement: " + enlargement);
    var molePosition = molePositions[randomIndex];
    var positionX = molePosition["x"] * enlargement - borderWidth;
    var positionY = molePosition["y"] * enlargement;
    console.log("positionX: " + positionX + ", positionY: " + positionY);
    mole.style["left"] = positionX + "px";
    mole.style["top"] = positionY + "px";
//    console.log("positionX: " + positionX + ", positionY: " + positionY);
}