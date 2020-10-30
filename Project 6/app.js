
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGame = document.getElementsByClassName('btn__reset')[0];

var missed = 0;

var phrases = [
    'home run',
    'walk',
    'strike out',
    'line drive',
    'single',
    'double',
    'triple',
    'pop fly',
];

// listen for the start game button to be pressed
startGame.addEventListener('click', () => {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
});

// return a random phrase from an array
function getRandomPhraseAsArray(arr) {
    var phrase = phrases[Math.floor(Math.random() * phrases.length)].split('');
    return phrase;
}

// adds the letters of a string to the display
function addPhraseToDisplay (arr) {
    for (let i = 0; i < arr.length; i++) {
        const listItem = document.createElement('li');
        const ul = document.querySelector('ul');

        listItem.textContent = arr[i];
        ul.appendChild(listItem);
        if (listItem.textContent === ' ') {
            listItem.className = 'space'
        } else {
            listItem.className = 'letter'
        }
    }
}

const baseball = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(baseball);


// check if a letter is in the phrase
function checkLetter (button) {
    const checkLetter = document.querySelectorAll('.letter');
    var match = null;
    for (let i = 0; i < checkLetter.length; i++) {
        if ( button === checkLetter[i].textContent) {
            checkLetter[i].classList.add('show');
            match = checkLetter[i].textContent;
        }
    }
    return match;
}

// check if the game has been won or lost
function checkWin () {
    let letter = document.querySelectorAll('.letter');
    let show = document.querySelectorAll('.show');

    if (letter.length === show.length) {
        overlay.className = 'win'; 
        document.querySelector('.title').innerHTML = 'You Win!!!';
        overlay.style.display = 'flex';
    }

    if (missed >= 5) {
        overlay.className = 'lose';
        document.querySelector('.title').innerHTML = 'You Lose :(';
        overlay.style.display = 'flex';
    }

    startGame.textContent = 'Reset';
    reset();
}




// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        e.target.classList.add('chosen');

        if (e.target.className === 'chosen') {
            e.target.disabled = true;
        }
    }

    let letterFound = checkLetter(e.target.textContent);

    if (letterFound === null) {
        const lives = document.querySelectorAll('.tries img');
        lives[missed].src = 'images/lostHeart.png';
        missed++;
    }

    checkWin();
});

function reset() {
    startGame.addEventListener('click', () => {
        missed = 0;
        overlay.className = 'start';

        let phrase = document.querySelector('ul');
        phrase.textContent = '';

        let hearts = document.querySelectorAll('.tries img');
        for(i = 0; i < hearts.length; i++) {
            hearts[i].setAttribute('src','images/liveHeart.png');
        }
        let resetChosen = document.querySelectorAll('.chosen');
        for (let i = 0; i < resetChosen.length; i++) {
            resetChosen[i].classList.remove('chosen');
            resetChosen[i].disabled = false;
        }

        const baseball = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(baseball);
    });
}