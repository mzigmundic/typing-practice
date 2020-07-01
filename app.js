// Get elements
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const endgameElement = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words
const words = [
    'mali',
    'crvenilo',
    'slon',
    'znanje',
    'automotiv',
    'crvotocina',
    'buducnost',
    'proslost',
    'pastrva',
    'rustika',
    'kontenjer',
    'saprofit',
    'bronhitis',
    'kamenjar',
    'prapovijest',
    'labud',
    'bablilon',
    'sjever',
    'gitara',
    'hidrofobija',
    'semafor',
    'antitijelo',
    'sakrament',
    'drvo',
    'crijep',
    'tup',
    'crn',
    'jak',
    'slab'
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in local storage or to medium if not there
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Focus on input on start
text.focus();

// Start countdown
const timeInterval = setInterval(updateTime, 1000);

// Get random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update score
function updateScore() {
    score++;
    scoreElement.innerHTML = score;
}

// Update time
function updateTime() {
    time--;
    timeElement.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

// Game over, show end screen
function gameOver() {
    endgameElement.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="window.location.reload()">Reload</button>
    `;
    endgameElement.style.display = 'flex';
}

addWordToDOM();


// Event Listeners

// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        // Clear
        e.target.value = '';

        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else if (difficulty === 'easy') {
            time += 5;
        }

        updateTime();
    }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});