var words = ["YES", "BAZOOKA", "KLEPTOMANIAC", "SINGULARITY"];

var wordhtml = document.getElementById('word');
var guesshtml = document.getElementById('guess');
var wronghtml = document.getElementById('wrong');
var hangman = document.getElementsByClassName('hangman');


var guess = null;
var current = [];
var wrongLetters = [];


document.addEventListener('keydown', function(e){
    e.preventDefault();
    if (e.keyCode > 64 && e.keyCode < 91){
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
            hangman[0].classList.remove('hangman');
        }
    }
    else{
        guesshtml.innerHTML = guess + "&#x2714";
        guesshtml.style.color = "green";
    }
    wordhtml.innerHTML = current.join('');
    wronghtml.innerHTML = wrongLetters;
    if (current.join('') === clue.join('')){
        guesshtml.innerHTML = "CORRECT";
        setTimeout(wipe, 3000);
    }
}

function wipe(){
    currentWord += 1;
    word = words[currentWord];
    clue = word.split('');
    current = [];
    wrongLetters = [];
    for (var i = 0; i < word.length; i++){
        current.push('_ ');
    }
    wordhtml.innerHTML = current.join('');
    guesshtml.innerHTML = "";
    wronghtml.innerHTML = wrongLetters;

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
    if (post.style.height == '500px'){
        cancelAnimationFrame(animPost);
    }
}

function initialiseBar(){
    startBar = parseInt(startBar) + 1 + '%';
    bar.style.width = startBar;
    console.log(bar.style.width);
    var animBar = requestAnimationFrame(initialiseBar);
    if (bar.style.width == '95%'){
        cancelAnimationFrame(animBar);
    }
}

initialisePost();
initialiseBar();
