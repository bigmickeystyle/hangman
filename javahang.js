var words = ["YES", "BAZOOKA", "KLEPTOMANIAC", "SINGULARITY"];

var wordhtml = document.getElementById('word');
var guesshtml = document.getElementById('guess');
var wronghtml = document.getElementById('wrong');
var hangman = document.getElementsByClassName('hangman');


var reset = [];
var guess = null;
var current = [];
var rightLetters = [];
var wrongLetters = [];
var flag = 1;

document.addEventListener('keydown', function(e){
    e.preventDefault();
    if (e.keyCode > 64 && e.keyCode < 91 && flag == 1){
        guess = String.fromCharCode(e.keyCode);
        engine();
    }
});

var currentWord = 0;
var word = words[currentWord];
var clue = word.split('');
for (var i = 0; i < word.length; i++){
    current.push('_ ');
}


function engine(){
    wronghtml.style.color = "red";
    wronghtml.style.textDecoration = "line-through";
    var correct = false;
    for (var i = 0; i < clue.length; i++){
        if (word[i] == guess){
            current[i] = guess;
            correct = true;
        }
    }
    if (correct == false){
        guesshtml.style.color = "red";
        guesshtml.innerHTML = "WRONG";
        if (wrongLetters.indexOf(guess) == -1){
            wrongLetters.push(guess);
            reset.push(hangman[0]);
            hangman[0].classList.remove('hangman');
        }
    }
    else if (rightLetters.indexOf(guess) == -1) {
        guesshtml.innerHTML = guess + "&#x2714";
        guesshtml.style.color = "green";
        rightLetters.push(guess);
    }
    wordhtml.innerHTML = current.join('');
    wronghtml.innerHTML = wrongLetters.join("   ");
    if (current.join('') === clue.join('')){
        flag = 0;
        guesshtml.innerHTML = "CORRECT";
        setTimeout(wipe, 3000);
    }
}

function wipe(){
    flag = 1;
    currentWord += 1;
    word = words[currentWord];
    clue = word.split('');
    current = [];
    wrongLetters = [];
    rightLetters = [];
    for (var i = 0; i < word.length; i++){
        current.push('_ ');
    }
    wordhtml.innerHTML = current.join('');
    guesshtml.innerHTML = "";
    wronghtml.innerHTML = wrongLetters;
    reset.map(function(div){div.classList.add('hangman');});
}

wordhtml.innerHTML = current.join('');

var startPost = 0;
var startBar = 0;
var post = document.getElementById('post');
var bar = document.getElementById('bar');

function initialisePost(){
    startPost = parseInt(startPost) + 5 + 'px';
    post.style.height = startPost;
    var animPost = requestAnimationFrame(initialisePost);
    if (post.style.height == '900px'){
        cancelAnimationFrame(animPost);
    }
}

function initialiseBar(){
    startBar = parseInt(startBar) + 1 + '%';
    bar.style.width = startBar;
    var animBar = requestAnimationFrame(initialiseBar);
    if (bar.style.width == '95%'){
        cancelAnimationFrame(animBar);
    }
}

initialisePost();
initialiseBar();
