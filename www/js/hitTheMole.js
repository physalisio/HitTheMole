window.onload = onDeviceReady;

var molePositions = [{x: 208, y: 10}];
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
    if (aspectRatio >= longestAspectRatio) {
        background.style["height"] = documentHeight + "px";
        background.style["width"] = documentWidth + "px";
    } else {
        var backgroundAspectRatio = 800 / 450;
        var backgroundWidth = backgroundAspectRatio * documentHeight;
        background.style["height"] = documentHeight + "px";
        background.style["width"] = backgroundWidth + "px";
        borderWidth = (backgroundWidth - documentWidth) / 2;
        console.log("borderWidth: " + borderWidth);
        background.style["left"] = "-" + borderWidth + "px";
    }

    enlargement = background.offsetHeight / 450;
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

    var i = 7;
    var interval1 = setInterval(function () {
        mole.style.backgroundPosition = (i * -100) + "px";

        if (i === 1) {
            setTimeout(function () {
                var j = 1;
                var interval2 = setInterval(function () {
                    mole.style.backgroundPosition = (j * -100) + "px";

                    if (j === 7) {
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
    var positionX = molePosition["x"] * enlargement;
    var positionY = molePosition["y"] * enlargement;
    var mole = document.getElementById("mole");
//    mole.style["height"] = mole.offsetHeight * enlargement + "px";
//    mole.style["width"] = mole.offsetWidth * enlargement + "px";
//    mole.style["zoom"] = enlargement;
//    mole.style["moz-transform"] = "scale(" + enlargement + ")";
    mole.style["left"] = positionX + "px";
    mole.style["top"] = positionY + "px";
//    console.log("positionX: " + positionX + ", positionY: " + positionY);
}