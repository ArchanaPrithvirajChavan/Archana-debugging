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
  for (let i = 0; i < messages.length; i++) {
    messages[i].style.display = 'none';
  }
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
  maxGuessesMessage.style.display = 'none';
  resetButton.style.display = 'none';
  resetButton.disabled = false;
  numberOfGuessesMessage.style.display = 'none';
}

// Handle a guess
function checkGuess() {
  const guess = parseInt(guessInput.value, 10);

  // Input validation
  if (Number.isNaN(guess)) {
    hideAllMessages();
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.textContent = 'Please enter a valid number.';
    return;
  }

  if (guess < 1 || guess > 99) {
    hideAllMessages();
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.textContent = 'Please enter a number between 1 and 99.';
    return;
  }

  // Increment attempts
  attempts++;

  // Hide previous feedback
  hideAllMessages();

  // Correct guess
  if (guess === targetNumber) {
    correctMessage.style.display = 'block';
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} ${attempts === 1 ? 'guess' : 'guesses'}.`;

    submitButton.disabled = true;
    guessInput.disabled = true;

    resetButton.style.display = 'block';
    resetButton.disabled = false;
    return;
  }

  // Maximum attempts reached
  if (attempts >= maxNumberOfAttempts) {
    maxGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.textContent = '0 guesses remaining';

    submitButton.disabled = true;
    guessInput.disabled = true;

    resetButton.style.display = 'block';
    resetButton.disabled = false;
    return;
  }

  // Feedback for remaining attempts
  const remainingAttempts = maxNumberOfAttempts - attempts;
  numberOfGuessesMessage.style.display = 'block';
  numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${remainingAttempts === 1 ? 'guess' : 'guesses'} remaining`;

  if (guess < targetNumber) {
    tooLowMessage.style.display = 'block';
  } else if (guess > targetNumber) {
    tooHighMessage.style.display = 'block';
  }
}

// Event listeners
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

// Initialize game
setup();
