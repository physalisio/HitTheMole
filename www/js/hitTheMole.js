    window.onload = onDeviceReady;

var molePositions = [
    {x: 212, y: 128},
    {x: 490, y: 128},
    {x: 80, y: 340},
    {x: 350, y: 340},
    {x: 620, y: 340}
];
//var holePositions = [{x: , y: }];

var points = 0;
var aspectRatio;
var enlargement = 1;
var borderWidth = 0;
var interval = 1000;

function onDeviceReady() {
    setBackgroundSize();

    initMoleClickHandler();
    setTimeout("showTheMole()", interval);
}

function setBackgroundSize() {
    var longestAspectRatio = 800 / 450;
    var documentWidth = window.innerWidth;
    var documentHeight = window.innerHeight;
    aspectRatio = documentWidth / documentHeight;
    var background = document.getElementById("background");
//    var holes = document.getElementById("holes");
    
    if (aspectRatio >= longestAspectRatio) {
        background.style["height"] = documentHeight + "px";
//        holes.style["height"] = documentHeight + "px";
        document.body.style["height"] = documentHeight + "px";
//        background.style["width"] = documentWidth + "px";
//        holes.style["width"] = documentWidth + "px";
        document.body.style["width"] = documentWidth + "px";
    } else {
        var backgroundAspectRatio = 800 / 450;
        var backgroundWidth = backgroundAspectRatio * documentHeight;
        background.style["height"] = documentHeight + "px";
//        holes.style["height"] = documentHeight + "px";
        document.body.style["height"] = documentHeight + "px";
        background.style["width"] = backgroundWidth + "px";
//        holes.style["width"] = backgroundWidth + "px";
        document.body.style["width"] = backgroundWidth + "px";
        borderWidth = (backgroundWidth - documentWidth) / 2;
        background.style["left"] = "-" + borderWidth + "px";
//        holes.style["left"] = "-" + borderWidth + "px";
    }

    enlargement = background.offsetHeight / 450;
    var mole = document.getElementById("mole");
    mole.style["height"] = mole.offsetHeight * enlargement + "px";
    mole.style["width"] = mole.offsetWidth * enlargement + "px";
}

function initMoleClickHandler() {
    var mole = document.getElementById("mole");
    mole.onclick = function () {
        mole.onclick = '';
        points += 10;
        var pointText = document.getElementById("points");
        pointText.innerHTML = points;
        interval -= 25;
    };
}

function showTheMole() {
    setMolePosition();
    initMoleClickHandler();
    var mole = document.getElementById("mole");
    mole.style.visibility = "visible";
    
    var i = 6;
    var interval1 = setInterval(function () {
        mole.style["top"] = (mole.offsetTop - 10) + "px";
        
        if (i === 0) {
            setTimeout(function () {
                var j = 0;
                var interval2 = setInterval(function () {
                    mole.style["top"] = (mole.offsetTop + 10) + "px";
                    
                    if (j === 6) {
                        clearInterval(interval2);
                        mole.style.visibility = "hidden";
                        setTimeout(function(){
                            showTheMole();
                        }, 3000);
                    }
                    j++;
                }, 200);
            }, interval);
            clearInterval(interval1);
        }
        i--;
    }, 200);
}

function setMolePosition() {
    var randomIndex = _.random(0, molePositions.length - 1);
    var molePosition = molePositions[randomIndex];
    var positionX = molePosition["x"] * enlargement - borderWidth;
    var positionY = molePosition["y"] * enlargement;
    mole.style["left"] = positionX + "px";
    mole.style["top"] = positionY + "px";
}