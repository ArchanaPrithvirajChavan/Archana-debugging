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
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max)
 {
  return Math.floor(Math.random() * (max - min)) + min;
 }
   function hideAllMessages() 
      {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  
      }}
      //use to reset button
      function setup()
   {
   // Get random number
        targetNumber = getRandomNumber(1, 100);
        console.log(`target number: ${targetNumber}`);

             // Reset number of attempts
             attempts=0;

             // Enable the input and submit button
              submitButton.disabled = false;
              guessInput.disabled = false;
              hideAllMessages()
              resetButton.style.display = 'none';
         }
         //use fo submit button
  function checkGuess() 
{ 
         const guess = parseInt(guessInput.value, 10);
        attempts++;
        
        hideAllMessages();
       if(attempts<=maxNumberOfAttempts)
          {
           if(guess===targetNumber)
            {
              
               numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
               correctMessage.style.display = '';
               submitButton.disabled = true;
               guessInput.disabled = true;
              guessInput.value = '';
               resetButton.style.display = '';
               resetButton.disabled =false

             }
           else {
              const remainingAttempts = maxNumberOfAttempts - attempts;
            if(guess<targetNumber)
             {
               tooLowMessage.style.display = '';
               tooHighMessage.style.display= 'none'
               numberOfGuessesMessage.style.display = '';
               numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
               numberOfGuessesMessage.style.display = '';
               numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
                if (attempts===4){
                  numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining`;
        }
             }
           else
           {
             tooHighMessage.style.display ='';
             tooLowMessage.style.display='none';
             numberOfGuessesMessage.style.display = '';
               numberOfGuessesMessage.innerHTML = `You made this ${attempts} guesses`;
              numberOfGuessesMessage.style.display = '';
               numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
            
             }
           }}
              
        if(attempts>=maxNumberOfAttempts)
        {
                tooHighMessage.style.display = 'none';
               tooLowMessage.style.display = 'none';
                correctMessage.style.display = 'none';
  
  
              numberOfGuessesMessage.textContent = '0 guesses remaining';
              numberOfGuessesMessage.style.display = 'block';
              submitButton.disabled = true;
              guessInput.disabled = true;
              guessInput.value = '';
             resetButton.style.display = 'block';

        }
               
     }
             submitButton.addEventListener('click',checkGuess)
resetButton.addEventListener('click',setup)
setup();






