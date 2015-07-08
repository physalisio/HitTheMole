window.onload = onDeviceReady;

var molePositions = [
    {x: 314, y: 184},
    {x: 710, y: 184},
    {x: 124, y: 480},
    {x: 510, y: 480},
    {x: 890, y: 480}
];
var holePositions = [
    {x: 242, y: 184},
    {x: 638, y: 184},
    {x: 54, y: 482},
    {x: 436, y: 482},
    {x: 816, y: 482}];

var points = 0;
var aspectRatio;
var enlargement = 1;
var borderWidth = 0;
var interval = 1000;
var moleShowingInterval = 200;
var animationSpeed = 200;
var movementHeight = 10;

function onDeviceReady() {
    setBackgroundSize();

    initMole();
    initHoles();
    setTimeout("showTheMole()", interval);
}

function setBackgroundSize() {
    var longestAspectRatio = 1136 / 640;
    var documentWidth = window.innerWidth;
    var documentHeight = window.innerHeight;
    aspectRatio = documentWidth / documentHeight;
    var background = document.getElementById("background");

    if (aspectRatio >= longestAspectRatio) {
        background.style["height"] = documentHeight + "px";
        document.body.style["height"] = documentHeight + "px";
        document.body.style["width"] = documentWidth + "px";
    } else {
        var backgroundAspectRatio = 1136 / 640;
        var backgroundWidth = backgroundAspectRatio * documentHeight;
        background.style["height"] = documentHeight + "px";
        document.body.style["height"] = documentHeight + "px";
        background.style["width"] = backgroundWidth + "px";
        document.body.style["width"] = backgroundWidth + "px";
        borderWidth = (backgroundWidth - documentWidth) / 2;
        background.style["left"] = "-" + borderWidth + "px";
    }

    enlargement = background.offsetHeight / 640;
    movementHeight = movementHeight * enlargement;
}

function initMole() {
    var mole = document.getElementById("mole");
    mole.style["height"] = mole.offsetHeight * enlargement + "px";
    mole.style["width"] = mole.offsetWidth * enlargement + "px";
    initMoleClickHandler();

    var stars = document.getElementById("stars");
    stars.style["height"] = stars.offsetHeight * enlargement + "px";
    stars.style["width"] = stars.offsetWidth * enlargement + "px";
}

function initMoleClickHandler() {
    var mole = document.getElementById("mole");
    mole.onclick = function () {
        mole.onclick = '';
        points += 10;
        var pointText = document.getElementById("points");
        pointText.innerHTML = points;
        interval -= 10;
        animationSpeed -= 10;
        moleShowingInterval -= 10;
        var stars = document.getElementById("stars");
        stars.style.visibility = "visible";
        stars.style["left"] = mole.offsetLeft - (stars.offsetWidth - mole.offsetWidth) / 2 + "px";
        stars.style["top"] = mole.offsetTop - (stars.offsetHeight / 3) + "px";
    };
}

function initHoles() {
    initHole("hole1", "holeBackground1", holePositions[0]);
    initHole("hole2", "holeBackground2", holePositions[1]);
    initHole("hole3", "holeBackground3", holePositions[2]);
    initHole("hole4", "holeBackground4", holePositions[3]);
    initHole("hole5", "holeBackground5", holePositions[4]);
}

function initHole(holeId, holeBackgroundId, holePosition) {
    var hole = document.getElementById(holeId);
    var height = hole.offsetHeight * enlargement + "px";
    var width = hole.offsetWidth * enlargement + "px";
    var positionX = holePosition["x"] * enlargement - borderWidth;
    var positionY = holePosition["y"] * enlargement;
    hole.style["height"] = height;
    hole.style["width"] = width;
    hole.style["left"] = positionX + "px";
    hole.style["top"] = positionY + "px";

    var holeBackground = document.getElementById(holeBackgroundId);
    holeBackground.style["height"] = height;
    holeBackground.style["width"] = width;
    holeBackground.style["left"] = positionX + "px";
    holeBackground.style["top"] = positionY + "px";
}

function showTheMole() {
    setMolePosition();
    initMoleClickHandler();
    var mole = document.getElementById("mole");
    mole.style.visibility = "visible";
    var stars = document.getElementById("stars");

    var i = 6;
    var interval1 = setInterval(function () {
        mole.style["top"] = (mole.offsetTop - movementHeight) + "px";

        if (i === 0) {
            setTimeout(function () {
                var j = 0;
                var interval2 = setInterval(function () {
                    mole.style["top"] = (mole.offsetTop + movementHeight) + "px";
                    stars.style["top"] = (stars.offsetTop + movementHeight) + "px";

                    if (j === 6) {
                        clearInterval(interval2);
                        mole.style.visibility = "hidden";
                        stars.style.visibility = "hidden";
                        setTimeout(function () {
                            showTheMole();
                        }, moleShowingInterval);
                    }
                    j++;
                }, animationSpeed);
            }, interval);
            clearInterval(interval1);
        }
        i--;
    }, animationSpeed);
}

function setMolePosition() {
    var randomIndex = _.random(0, molePositions.length - 1);
    var molePosition = molePositions[randomIndex];
    var positionX = molePosition["x"] * enlargement - borderWidth;
    var positionY = molePosition["y"] * enlargement;
    var mole = document.getElementById("mole");
    mole.style["left"] = positionX + "px";
    mole.style["top"] = positionY + "px";
}