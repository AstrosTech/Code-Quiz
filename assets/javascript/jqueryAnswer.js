let TimerElement = document.get('#timer')
let StartButton = $('#start-button')
let QuestionElement = $('#Questions')

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

QuestionElement.on('click', 'li', (event) => {
    if(!OnGoing) return;

    let QuestionIndex = $(event.target).parent().children().eq(0).data('question')
    let AnswerIndex = $(event.target).data('answer')
    let QuestionAnswered = QuestionsSet[QuestionIndex]

    if(AnswerIndex == QuestionAnswered.Answer) {
        Score++

        nextQuestion()
        return
    }

    Score--
    Timer - 5
    nextQuestion()
})

StartButton.on('click', () => {
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
    QuestionElement.empty()
    let NewQuestion = getRandomQuestion()
    displayQuestion(NewQuestion.RandomQuestion, NewQuestion.Index)
}

function displayQuestion(QuestionObject, index) {
    let QuestionHeader = $("<h1>").text(QuestionObject.Question)
    QuestionHeader.attr("data-question", index)
    QuestionElement.append(QuestionHeader)


    for(let i = 0; i < QuestionObject.Options.length; i++) {
        let question = QuestionObject.Options[i]

        let optionLi = $("<li>").text(question)
        optionLi.attr("data-answer", i)
        QuestionElement.append(optionLi)
    }
}

function startTimer() {
    TimerElement.text(Timer)

    Gameinterval = setInterval(() => {
        if(Timer <= 0) {
            endQuiz()
            return
        }

        Timer--
        TimerElement.text(Timer)
    }, 1000)
}

function endQuiz() {
    clearInterval(Gameinterval)
    TimerElement.text("Offline")
    hideQuestion()
    showElements()
}

function getRandomQuestion() {
    let Index = Math.floor(Math.random() * Questions.length);
    let RandomQuestion = Questions[Index]
    Questions.splice(0, Index)
    return {RandomQuestion, Index}
}


function hideElements() {
    $("header").children().hide()
    $("#start-container").children().hide()
}

function showElements() {
    $("header").children().show()
    $("#start-container").children().show()
}

function hideQuestion() { QuestionElement.hide() }