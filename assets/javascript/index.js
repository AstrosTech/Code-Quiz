let TimerElement = document.getElementById('timer')
let StartButton = document.getElementById('start-button')

let OnGoing = false;
let GameInterval;
let Timer = 10;

StartButton.addEventListener('click', () => {
    if(OnGoing) return;

    StartQuiz()
})


function StartQuiz() {
    OnGoing = true

    Gameinterval = setInterval(() => {
        if(Timer == 0) {
            EndQuiz()
            return
        }

        Timer--
        TimerElement.textContent = Timer
    }, 1000)
}


function EndQuiz() {
    clearInterval(Gameinterval)
    TimerElement.textContent = "Offline"
}