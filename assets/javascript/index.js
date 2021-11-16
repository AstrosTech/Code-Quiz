let Timer = document.querySelector('.timer')
let StartButton = document.querySelector('#start-button')

let OnGoing = false;
let GameInterval;
let Timer = 60;
StartButton.addEventListener('click', () => {
    if(OnGoing) return;
})


function StartQuiz() {
    OnGoing = true

    Gameinterval = setInterval(() => {
        
    }, 1000)
}