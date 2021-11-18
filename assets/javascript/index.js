let TimerElement = document.getElementById('timer')
let StartButton = document.getElementById('start-button')
let QuestionElement = document.getElementById('Questions')
let Answer = document.getElementById('Answer')
let Form = document.getElementById('save-highscore')
let Initials = document.getElementById('Initials')
let SubmitInitial = document.getElementById('submit-initial')
let FinalScoreElement = document.getElementById('final-score')

let Score = 0;
let Timer = 60;
let OnGoing = false;
let GameInterval;
let Questions;

// Only For Default
let QuestionsSet = [
    {
        Question: "Inside which HTML element do we put the JavaScript?",
        Options: ["<javascript>", "<scripting>", "<script>", "<js>"],
        Answer: 2
    },
    {
        Question: `What is the correct JavaScript syntax to change the content of the HTML element below? \n\n<p id="demo">This is a demonstration.</p>`,
        Options: [
            `document.getElementById("demo").innerHTML = "Hello World!";`, 
            `document.getElement("p").innerHTML = "Hello World!";`, 
            `#demo.innerHTML = "Hello World!";`, 
            `document.getElementByName("p").innerHTML = "Hello World!";`
        ],
        Answer: 0
    },
    {
        Question: "Where is the correct place to insert a JavaScript tag?",
        Options: ["Only the <head> section", "Only the <body> section", "Both the <head> section and the <body>"],
        Answer: 2
    },
    {
        Question: "Random Question",
        Options: ["<1>", "<2>", "<3>", "<4>"],
        Answer: 2
    }
]

QuestionElement.addEventListener('click', (event) => {
    let ChoosenAnswer = event.target
    let Parent = ChoosenAnswer.parentNode
    let GivenQuestion = Parent.children[0]

    let QuestionIndex = GivenQuestion.dataset.question
    let AnswerIndex = ChoosenAnswer.dataset.answer

    let QuestionAnswered = QuestionsSet[QuestionIndex]

    if(AnswerIndex == QuestionAnswered.Answer) {
        showAnswer("Right!")
        Score++

        setTimeout(() => { nextQuestion() }, 200);
        return
    }

        showAnswer("Wrong!")
        Score--

        Timer = Timer - 5
        setTimeout(() => { nextQuestion() }, 200);
})


StartButton.addEventListener('click', () => {
    if(OnGoing) return;

    Questions = [...QuestionsSet]
    startQuiz()
})

function startQuiz() {
    OnGoing = true
    hideElements()

    nextQuestion()
    startTimer()
}

function nextQuestion() {
    clearAnswers(QuestionElement)
    let NewQuestion = getRandomQuestion()
    if(!NewQuestion) {
        Timer = 0
        endQuiz()
        return
    }
    displayQuestion(NewQuestion.RandomQuestion, NewQuestion.Index)
}

function displayQuestion(QuestionObject, index) {
    Answer.style.opacity = "0"
    let QuestionHeader = document.createElement('h1')
    QuestionHeader.textContent = QuestionObject.Question
    QuestionHeader.setAttribute("data-question", index)
    QuestionElement.appendChild(QuestionHeader)


    for(let i = 0; i < QuestionObject.Options.length; i++) {
        let question = QuestionObject.Options[i]

        let optionLi = document.createElement('li')
        optionLi.textContent = question
        optionLi.setAttribute("data-answer", i)
        QuestionElement.appendChild(optionLi)
    }
}

function startTimer() {
    TimerElement.textContent = Timer

    Gameinterval = setInterval(() => {
        if(Timer <= 0) {
            endQuiz()
            return
        }

        Timer--
        TimerElement.textContent = Timer
    }, 1000)
}


function getRandomQuestion() {
    if(Questions.length == 0) return
    let Index = Math.floor(Math.random() * Questions.length);

    let RandomQuestion = Questions[Index]
    Questions.splice(Index, 1)
    return { RandomQuestion, Index } 
}


function hideElements() {
    document.querySelector('header').classList.add("hide-container")
    document.querySelector('#start-container').classList.add("hide-container")
}

function showElements() {
    document.querySelector('header').classList.remove("hide-container")
    document.querySelector('#start-container').classList.remove("hide-container")
}

function hideQuestion() { QuestionElement.style.display = "none" }

function clearAnswers(parent) {
    while (parent.lastChild) { 
        parent.removeChild(parent.lastChild);
    }
}

function showAnswer(answer) {
    Answer.style.opacity = '1'
    Answer.textContent = answer
}

function showForm() {
    FinalScoreElement.textContent = `Your final score is ${Score}`
    Form.style.display = "block"
}

function hideForm() { Form.style.display = "none" }

function endQuiz() {
    Timer = 60
    Answer.style.display = "none"
    clearInterval(Gameinterval)
    TimerElement.textContent = "Offline"
    hideQuestion()

    showForm()
}

SubmitInitial.addEventListener('click', () => {
    storeScore(Initials.value)
    hideForm()
    showElements()
})

function storeScore(Initials) {
    let HighScores = JSON.parse(localStorage.getItem('HighScores'))
    if(HighScores) {
        HighScores.push({
            Initials,
            Score
        })
        localStorage.setItem('HighScores', JSON.stringify(HighScores))
        return
    }

    localStorage.setItem('HighScores', JSON.stringify([{
        Initials,
        Score
    }]))
}