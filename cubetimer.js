let startTime;
let interval;
let running = false;

const timerDisplay = document.getElementById('timerDisplay');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');
const generateScrambleButton = document.getElementById('generateScrambleButton');
const cubeScramble = document.getElementById('cubeScramble');

document.addEventListener('keydown', handleSpacebar);
document.addEventListener('keydown', handleEscKey);

startStopButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
generateScrambleButton.addEventListener('click', generateScramble);

function handleSpacebar(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        toggleTimer();
    }
}

function handleEscKey(event) {
    if (event.code === 'Escape') {
        event.preventDefault();
        resetTimer();
    }
}

function toggleTimer() {
    if (running) {
        clearInterval(interval);
        running = false;
        startStopButton.innerText = 'Press Spacebar to Start';
    } else {
        startTime = Date.now() - (running ? startTime : 0);
        interval = setInterval(updateTimer, 10);
        running = true;
        startStopButton.innerText = 'Press Spacebar to Stop';
    }
}

function updateTimer() {
    const currentTime = Date.now() - startTime;
    const minutes = String(Math.floor(currentTime / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((currentTime % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(currentTime % 1000).padStart(3, '0');

    timerDisplay.innerText = `${minutes}:${seconds}:${milliseconds}`;
}

function resetTimer() {
    clearInterval(interval);
    running = false;
    timerDisplay.innerText = '00:00:00.000';
    startStopButton.innerText = 'Press Spacebar to Start';
}

const scrambles = [
    "R U L' B R B L U R B R U' B R' R2 L R",
    "B2 U2 R2 L2 U B L B R B' R' R L B",
    "R L U2 R2 B' R' L R U L U' R L' R'",
    "U L2 R B2 L' R' U2 L2 B2 R L U2 B R2 ",
    "R L2 B2 U R' U' B2 L' R  U2 R U2 L2 R",
    "R L B U L R B2 R2 L' U2 B L R L' U' R'",
    "L' U' L R U2 B2 L B' U R' L2 U2 R' B L' B'",
    "L2 U' R, U2 B' L R' L R B2 U2 L2 R' U2",
    "R B2 R U L B' U2 R' L2 U' R2 L U' R2 U",
    "L2, B2 R' U2 L' R2 U2 R L R' B' U' R U",
];

function generateScramble() {
    const randomIndex = Math.floor(Math.random() * scrambles.length);
    const randomScramble = scrambles[randomIndex];
    cubeScramble.innerText = randomScramble;
}

