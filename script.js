let guy = document.getElementById('guy');
let container = document.getElementById('container');
let title = document.getElementById('title');
let score = document.getElementById('score');
let playBtn = document.getElementById('playBtn');
let guyLeft = 360;
let num = 900;
let num1 = 1000;
let trackScore = 0;
let t = 0;
let result = false;
let result2 = false;
let i = 0;
let moveAliens;
let collideTimer;


function play() {
    i = 0;
    title.classList.add('fadeOut');
    playBtn.classList.add('fadeOut');
    document.getElementById('fs').innerHTML = "";
    move();
}

function anim(e) {
    if (e.keyCode == 39) {
        guy.innerHTML = '<img src="assets/spaceDudeRR.png">'
        guyLeft += 40;
        guy.style.left = guyLeft + 'px';
        if (guyLeft >= document.body.offsetWidth - 40) {
            guyLeft = -40;
        }
    }

    if (e.keyCode == 37) {
        guy.innerHTML = '<img src="assets/spaceDudeRL.png">'
        guyLeft -= 40;
        guy.style.left = guyLeft + 'px';
        if (guyLeft <= 0) {
            guyLeft += document.body.offsetWidth;
        }
    }
}

function noAnim() {
    guy.innerHTML = '<img src="assets/spaceDude.png">';
}

document.onkeydown = anim;
document.onkeyup = noAnim;

function collide() {
    result = collision($('#guy'), $('#glob'));
    result2 = collision($('#guy'), $('#glob2'));
    if (result || result2) {
        t = 1;
    }
}

function go() {
    if (!result && !result2 && t == 0) {
        trackScore = trackScore + 1;
        document.getElementById('score').innerHTML = (trackScore);
    }
}

function collision(div1, div2) {
    let x1 = div1.offset().left;
    let y1 = div1.offset().top;
    let h1 = div1.outerHeight(true);
    let w1 = div1.outerWidth(true);
    let b1 = y1 + h1;
    let r1 = x1 + w1;
    let x2 = div2.offset().left;
    let y2 = div2.offset().top;
    let h2 = div2.outerHeight(true);
    let w2 = div2.outerWidth(true);
    let b2 = y2 + h2;
    let r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
        return false;
    } else {
        detachDiv();
        i = 2000;
        trackScore = 0;
        playBtn.classList.remove('fadeOut');
        clearInterval(moveAliens);
        clearInterval(collideTimer);
        return true;
    }
}

function move() {
    moveAliens = setInterval(() => {
        trackScore++;
        score.innerHTML = trackScore;
        let ran = Math.floor((Math.random() * document.body.offsetWidth-40) + 1);
        let ran1 = Math.floor((Math.random() * document.body.offsetWidth-40) + 1);

        $("#Al").animate({left: ran}, num);
        $("#glob").animate({left: ran + 70}, num);
        $("#glob").animate({top: document.body.offsetHeight}, num);
        $("#glob").animate({top: '50px'}, 0);
        $("#Al").animate({left: ran}, num);

        $("#Al2").animate({left: ran1}, num1);
        $("#glob2").animate({left: ran1 + 70}, num1);
        $("#glob2").animate({top: document.body.offsetHeight}, num1);
        $("#glob2").animate({top: '50px'}, 0);
        $("#Al2").animate({left: ran1}, num1);

        if (num > 250 && num1 > 300) {
            num = num - 10;
            num1 = num - 10;
        }
    }, 1000);

    collideTimer = setInterval(function () {
        collide()
    }, 50);
}

function detachDiv() {
    result = false;
    result2 = false;
    $('#Al').remove();
    $('#Al2').remove();
    $('#guy').remove();
    $('#glob').remove();
    $('#glob2').remove();
    addBack();

}

function addBack() {
    $("#container").append('<div id= "glob"><img src="assets/g1.png"></div>');
    $("#container").append('<div id= "glob2"><img src="assets/g2.png"></div>');
    $("#container").append('<div id= "Al"><img src="assets/alienAl.png" width="175" height="115"></div>');
    $("#container").append('<div id= "Al2"><img src="assets/alienAl2.png" width="175" height="115"></div>');
    $("#container").append('<div id = "guy"><img src="assets/spaceDude.png"> </div>');
    guy = document.getElementById('guy');
    guyLeft = 360;
    num1 = 1000;
    num = 900;
    t = 0;
    document.getElementById('score').innerHTML = ("");
    document.getElementById('fs').innerHTML = "Score: " + (trackScore);
    playBtn.innerHTML = "Play Again"
}