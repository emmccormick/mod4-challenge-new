var startButton = document.getElementById('start-btn')
var timer = 60
// how to display answers?
var questions = [
    { q: 'What color is the sky?', a: '' },
    { q: 'How many days are in a week?', a: },
    { q: 'What month is Christmas in?', a: },
    { q: 'What year was WI founded?', a: },
  ]; 


// GIVEN I am taking a code quiz WHEN I click the start button THEN a timer starts and I am presented with a question
startButton.addEventListener('click', startQuiz)

        // need time to start decreasing - second event listener w/ a timer?



function startQuiz() {
    console.log('started')
    startButton.classList.add('hide')
};

// WHEN I answer a question THEN I am presented with another question
function setNextQuestion() {

}


// WHEN I answer a question incorrectly THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0 THEN the game is over
// WHEN the game is over THEN I can save my initials and score
