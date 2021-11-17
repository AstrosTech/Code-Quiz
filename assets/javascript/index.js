let TimerElement = document.getElementById('timer')
let StartButton = document.getElementById('start-button')
let QuestionElement = document.getElementById('Questions')

let Score = 0;
let Timer = 10;
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
    displayQuestion(NewQuestion.RandomQuestion, NewQuestion.Index)
}

function displayQuestion(QuestionObject, index) {
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

function endQuiz() {
    clearInterval(Gameinterval)
    TimerElement.textContent = "Offline"
    hideQuestion()
    showElements()
}

function getRandomQuestion() {
    let Index = Math.floor(Math.random() * Questions.length);
    let RandomQuestion = Questions[Index]
    Questions.splice(0, Index)
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

function hideQuestion() { QuestionElement.style.display = "none"}

function clearAnswers(parent) { 
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}