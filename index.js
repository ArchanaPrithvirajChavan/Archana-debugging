// DOM Elements
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

// Game variables
let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Generate random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Hide all feedback messages
function hideAllMessages() {
  Array.from(messages).forEach(msg => (msg.style.display = 'none'));
}

// Initialize / Reset the game
function setup() {
  targetNumber = getRandomNumber(1, 99);
  console.log('Target number:', targetNumber);

  attempts = 0;
  guessInput.value = '';
  guessInput.disabled = false;
  submitButton.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

// Handle a guess
function checkGuess() {
  // Always hide messages at the start
  hideAllMessages();

  const guess = parseInt(guessInput.value, 10);

  // Input validation
  if (Number.isNaN(guess)) {
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.textContent = 'Please enter a valid number.';
    return;
  }

  if (guess < 1 || guess > 99) {
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.textContent = 'Please enter a number between 1 and 99.';
    return;
  }

  attempts++;
  const remainingAttempts = maxNumberOfAttempts - attempts;

  // Correct guess
  if (guess === targetNumber) {
    correctMessage.style.display = 'block';
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} ${attempts === 1 ? 'guess' : 'guesses'}.`;

    guessInput.disabled = true;
    submitButton.disabled = true;
    resetButton.style.display = 'block';
    return;
  }

  // Maximum attempts reached
  if (attempts >= maxNumberOfAttempts) {
    maxGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.textContent = '0 guesses remaining';

    guessInput.disabled = true;
    submitButton.disabled = true;
    resetButton.style.display = 'block';
    return;
  }

  // Feedback for remaining attempts
  numberOfGuessesMessage.style.display = 'block';
  numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${remainingAttempts === 1 ? 'guess' : 'guesses'} remaining`;

  if (guess < targetNumber) {
    tooLowMessage.style.display = 'block';
  } else {
    tooHighMessage.style.display = 'block';
  }
}

// Event listeners
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

// Initialize game
setup();
