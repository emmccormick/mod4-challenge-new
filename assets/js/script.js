var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var submitButton = document.getElementById('submit-btn')

var questionContainerEl = document.getElementById('question-container')
var questionResultEl = document.getElementById('results-container')
var scoreContainerEl = document.getElementById('score-container')

var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-btns')
var resultsEl = document.getElementById('results-container')
var currentQuestionIndex = 0

var timer = 60
var timerEl = document.querySelector(".timer")
var gameTimer;
var score = 0

// CAN ADD MORE QUESTIONS LATER
var questionBank = [
    { 
        question: 'What color is NOT in the American flag?',
        answers: [
            {text: 'blue', correct: false }, 
            {text: 'pink', correct: true }, 
            {text: 'red', correct: false }, 
            {text: 'white', correct: false}
        ]
    },

    { 
        question: 'How many days are in a week?',
        answers: [
            {text: '8', correct: false }, 
            {text: '10', correct: false }, 
            {text: '7', correct: true }, 
            {text: '11', correct: false}
        ]
    },

    { 
        question: 'What month is Christmas in?',
        answers: [
            {text: 'December', correct: true }, 
            {text: 'February', correct: false }, 
            {text: 'March', correct: false }, 
            {text: 'July', correct: false}
        ]
    },
  ]; 


// GIVEN I am taking a code quiz WHEN I click the start button THEN a timer starts and I am presented with a question
startButton.addEventListener('click', startQuiz)

  // button to control Question flow
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    if (currentQuestionIndex === questionBank.length) {
        endGame()
    }
    else {
        setNextQuestion()
    }
})


// starts the game -- hides start button & shows the Q; starts timer
function startQuiz() {
    startButton.classList.add('hide')
    questionContainerEl.classList.remove('hide')
    currentQuestionIndex = 0
    setNextQuestion()
    gameTimer = setInterval(timerTick, 1000)

};

// timer function - runs & displays timer on page, executes endGame() when timer runs out
function timerTick() {
    timer--
    timerEl.textContent = timer
    if (timer <= 0) {
        endGame()
    }
}

// WHEN I answer a question THEN I am presented with another question - CLICKING NEXT   
function setNextQuestion() {
    resetState()
    showQuestion(questionBank[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', checkResult)
        answerButtonsEl.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

// found this answer using google [find link] - it sets a var for a "correct" answer but I'm not sure what the Array.from part is doing
function checkResult(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(resultsEl, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    nextButton.classList.remove('hide')

// WHEN I answer a question incorrectly THEN time is subtracted from the clock
function setStatusClass() {
    clearStatusClass(resultsEl)
    if (correct) {
        document.getElementById('results-container').innerText = "Correct!"
    }
    else {
        resultsEl.innerText ="Wrong"
        timer = timer - 1
    }
}

function clearStatusClass(resultsEl) {
    resultsEl.innerText = ""
}

}

// WHEN all questions are answered or the timer reaches 0 THEN the game is over
// there's currently a bug where the score keeps ticking down, I can't get the clearInterval to stop it no matter where in the code I place it

function endGame() {
    questionContainerEl.classList.add('hide')
    resultsEl.classList.add('hide')
    scoreContainerEl.classList.remove('hide')
    clearInterval(timer)
    score = timer
    var scoreBanner = `Your Score: ${score}`
    questionResultEl.classList.remove('hide')
    questionResultEl.innerText = scoreBanner
}    
// WHEN the game is over THEN I can save my initials and score
submitButton.addEventListener('click', saveHighScores)

function saveHighScores() {
    let initials = document.getElementById('input').value.trim()
    var highScores = JSON.parse(localStorage.getItem("High Scores")) || []
    let newScore = {
        score: score,
        initials: initials
    }

    highScores.push(newScore)

    localStorage.setItem("High Scores", JSON.stringify(highScores))

}


// can't get this part to work properly - start btn stops working when it's active. will fix later
// function renderScores() {
//     var render = JSON.parse(localStorage.getItem(highScores)
//     resultsEl.classList.remove('hide')
//     resultsEl.innerText = render
// }




