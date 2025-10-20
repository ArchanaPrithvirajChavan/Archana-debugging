const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

function getRandomNumber(min, max) {
  // inclusive both ends
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hideAllMessages() {
  for (let i = 0; i < messages.length; i++) {
    messages[i].style.display = 'none';
  }
}

function setup() {
  targetNumber = getRandomNumber(1, 100);
  console.log('target number:', targetNumber);

  attempts = 0;
  submitButton.disabled = false;
  guessInput.disabled = false;
  guessInput.value = '';

  hideAllMessages();
  numberOfGuessesMessage.style.display = 'none';

  // hide reset initially; ensure it's not disabled so it will work when shown
  resetButton.style.display = 'none';
  resetButton.disabled = false;
}

function checkGuess() {
  const guess = parseInt(guessInput.value, 10);

  // guard: invalid input => do not increment attempts
  if (Number.isNaN(guess)) {
    hideAllMessages();
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.textContent = 'Please enter a valid number.';
    return;
  }

  // count this attempt
  attempts++;
  hideAllMessages();

  // if guessed correctly
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} ${attempts === 1 ? 'guess' : 'guesses'}.`;
    correctMessage.style.display = 'block';

    submitButton.disabled = true;
    guessInput.disabled = true;
    guessInput.value = '';

    // show reset and enable it
    resetButton.style.display = 'block';
    resetButton.disabled = false;
    return;
  }

  // not correct - check if we've reached the maximum
  if (attempts >= maxNumberOfAttempts) {
    // game over
    maxGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.textContent = '0 guesses remaining';

    submitButton.disabled = true;
    guessInput.disabled = true;
    guessInput.value = '';

    // show reset and enable it (fix: must be false so user can click)
    resetButton.style.display = 'block';
    resetButton.disabled = false;
    return;
  }

  // still have attempts left -> give feedback
  const remainingAttempts = maxNumberOfAttempts - attempts;
  numberOfGuessesMessage.style.display = 'block';
  numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${remainingAttempts === 1 ? 'guess' : 'guesses'} remaining`;

  if (guess < targetNumber) {
    tooLowMessage.style.display = 'block';
    tooHighMessage.style.display = 'none';
  } else {
    tooHighMessage.style.display = 'block';
    tooLowMessage.style.display = 'none';
  }
}

// wire events
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);
setup();
