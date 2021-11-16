let Timer = document.querySelector('.timer')
let StartButton = document.querySelector('#start-button')

let OnGoing = false;

StartButton.addEventListener('click', () => {
    if(OnGoing) return;
})


function StartQuiz() {
    OnGoing = true
}