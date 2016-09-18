var responseWord;
var clue;

var wraphtml = document.getElementById('wrapper');
var wordhtml = document.getElementById('word');
var guesshtml = document.getElementById('guess');
var wronghtml = document.getElementById('wrong');
var hangman = document.getElementsByClassName('hangman');
var pagehtml = document.getElementById('page');
var post = document.getElementById('post');
var bar = document.getElementById('bar');
var head = document.getElementById('head');
var highscorehtml = document.getElementById('highscore');
var thunderStrike = new Audio('sounds/thunder3.mp3');

var highscore = 0;
var score = 0;
var reset = [];
var guess = null;
var current = [];
var rightLetters = [];
var wrongLetters = [];
var flag = 1;
var sky = "d";
var startPost = 0;
var startBar = 0;

function keyListen(){
    document.addEventListener('keydown', function(e){
        e.preventDefault();
        if (e.keyCode > 64 && e.keyCode < 91 && flag == 1){
            console.log(e.key);
            guess = e.key.toUpperCase();
            engine();
        }
    });
}

function generateClue(){
    clue = responseWord.split('');
    for (var i = 0; i < responseWord.length; i++){
        current.push('_ ');
    }
}

function generateWordlen(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function engine(){
    wordhtml.innerHTML = current.join('');
    wronghtml.style.color = "red";
    wronghtml.style.textDecoration = "line-through";
    var correct = false;
    for (var i = 0; i < clue.length; i++){
        if (responseWord[i] == guess){
            current[i] = guess;
            correct = true;
        }
    }
    if (!correct && wrongLetters.indexOf(guess) == -1){
        thunder();
        guesshtml.innerHTML = guess + " &#10006";
        pagehtml.className = sky + "ark";
        guesshtml.style.color = "red";
        sky += "ark";
        wrongLetters.push(guess);
        reset.push(hangman[0]);
        hangman[0].classList.remove('hangman');
        if (wrongLetters.length == 2){
            head.style.backgroundImage = "url('images/concerned.png')";
        }
        if (wrongLetters.length == 4){
            head.style.backgroundImage = "url('images/uhoh.png')";
        }
        if (wrongLetters.length == 6){
            flag = 0;
            wordhtml.innerHTML = responseWord;
            guesshtml.innerHTML = "YOU LOSE";
            setTimeout(tryAgain, 4000);
        }
    }
    else if (correct && rightLetters.indexOf(guess) == -1) {
        guesshtml.innerHTML = guess + "&#x2714";
        guesshtml.style.color = "green";
        rightLetters.push(guess);
        wordhtml.innerHTML = current.join('');
    }
    wronghtml.innerHTML = wrongLetters.join("   ");
    if (current.join('') === clue.join('')){
        flag = 0;
        guesshtml.innerHTML = "CORRECT";
        setTimeout(wipe, 1000);
        newWord();
    }
}

function initialiseGallows(){

    startPost = parseInt(startPost) + 1 + '%';
    post.style.height = startPost;
    startBar = parseInt(startBar) + 1  + '%';
    bar.style.width = startBar;
    var animBar = requestAnimationFrame(initialiseGallows);
    if (bar.style.width == '92%'){
        cancelAnimationFrame(animBar);
    }
}

function newWord(){

    var wordlen = generateWordlen(6, 12);

    var requestWord = new XMLHttpRequest;

    requestWord.open('GET', "http://www.setgetgo.com/randomword/get.php?len=" + wordlen);

    requestWord.send();

    requestWord.addEventListener('readystatechange', function() {
        if (requestWord.readyState != XMLHttpRequest.DONE) {
            return;
        }
        var status;
        try {
            status = requestWord.status;
        } catch(e) {
            console.log(e);
            return;
        }
        if (status != 200) {
            console.log("error - status " + status);
            return;
        }
        responseWord = requestWord.responseText.toUpperCase();
        generateClue();
        console.log(responseWord);
    });
}

function clean(){
    if (score > highscore){
        highscore = score;
    }
    highscorehtml.innerHTML = "SCORE " + score + "<br>HIGHSCORE " + highscore;
    sky = "d";
    flag = 1;
    current = [];
    wrongLetters = [];
    rightLetters = [];
    wronghtml.innerHTML = wrongLetters;
    reset.map(function(div){div.classList.add('hangman');});
    pagehtml.className = "start";
}

function initialise(){
    score = 0;
    clean();
    keyListen();
    guesshtml.innerHTML = "Are you ready?";
    wordhtml.innerHTML = "Type 'YES' to start";
    responseWord = 'YES';
    generateClue();
    if (bar.style.width != '92%' && post.style.height != '900px'){
        initialiseGallows();
    }

}

function wipe(){
    console.log("wipe");
    clean();
    generateClue();
    guesshtml.innerHTML = "";
    wordhtml.innerHTML = current.join('');
    score += 10;
}

initialise();

function tryAgain(){
    guesshtml.innerHTML = "Try again?";
    guesshtml.style.color = "black";
    var mEnter = function(){
        guesshtml.classList.add("hover");
    };

    var mLeave = function(){
        guesshtml.classList.remove("hover");
    };

    guesshtml.addEventListener('mouseenter', mEnter);
    guesshtml.addEventListener('mouseleave', mLeave);

    function removeMouse(){
        guesshtml.classList.remove("hover");
        guesshtml.removeEventListener('mouseenter', mEnter);
        guesshtml.removeEventListener('mouseleave', mLeave);
    }
    guesshtml.addEventListener('click', removeMouse);
    guesshtml.addEventListener('click', initialise);


}


function thunder(){
    flag = 0;
    wraphtml.classList.add('thunder');
    thunderStrike.play();
    setTimeout(function(){
        wraphtml.classList.remove('thunder');
        flag = 1;
    }, 4000);
}

// TODO:
// fade in castle
// clean up code in general
// fix arms and legs and replace body
// maybe some noises/music
// thunder effect
