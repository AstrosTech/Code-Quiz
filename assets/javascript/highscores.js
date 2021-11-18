let ol = document.getElementById('highscores')

let Highscores = JSON.parse(localStorage.getItem('HighScores'))
if(!Highscores) {
    let li = document.createElement("li")
    li.textContent = "No high scores"

    ol.appendChild(li)
}

for(score of Highscores) {
    let li = document.createElement("li")
    li.textContent = `${score.Initials} | ${score.Score}`

    ol.appendChild(li)
}