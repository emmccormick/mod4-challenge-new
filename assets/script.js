var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var submitButton = document.getElementById('submit-btn')

var questionContainerEl = document.getElementById('question-container')
var questionResult = document.getElementById('results-container')
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
    console.log('started')
    startButton.classList.add('hide')
    questionContainerEl.classList.remove('hide')
    currentQuestionIndex = 0
    setNextQuestion()
    gameTimer = setInterval(timerTick, 1000)

};

function timerTick() {
    timer--
    timerEl.textContent = timer
    if (timer === 0) {
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


function checkResult(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(resultsEl, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    nextButton.classList.remove('hide')


function setStatusClass() {
    clearStatusClass(resultsEl)
    if (correct) {
        document.getElementById('results-container').innerText = "Correct!"
    }
    else {
        resultsEl.innerText ="Wrong"
    }
}

function clearStatusClass(resultsEl) {
    resultsEl.innerText = ""
}




    
    // if (this.value == questionBank[currentQuestionIndex].correctAnswer) {
    //     console.log(this.value)
    //     console.log(questionBank[currentQuestionIndex].correctAnswer)
    //     score++
    //     currentQuestionIndex++
    //     setNextQuestion()
    // }
    // else {
    //     timer = timer - 5
    //     currentQuestionIndex++
    //     setNextQuestion()
    // }
}

function endGame() {
    questionContainerEl.classList.add('hide')
    resultsEl.classList.add('hide')
    scoreContainerEl.classList.remove('hide')
    score = timer
}    

submitButton.addEventListener('click', saveHighScores())

function saveHighScores() {
    let initials = document.getElementById('input').value.trim()
    var HighScores = JSON.parse(localStorage.getItem("High Scores")) || []
    let newScore = {
        score: score,
        initials: initials
    }
HighScores.push(newScore)

localStorage.setItem("High Scores", JSON.stringify(HighScores))

// go to new window with high scores - get the high scores out of local storage & sort based on score .sort(), forEach to put on page
// window.location
    
}



// WHEN I answer a question incorrectly THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0 THEN the game is over
// WHEN the game is over THEN I can save my initials and score


// create another function to save scores & in that fn use setLocal, create var for high score and create var for initials 

// when timer gets down to 0 or all q's answers 