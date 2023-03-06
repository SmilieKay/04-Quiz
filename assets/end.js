const username =document.querySelector("#username")
const saveScoreBtn =document.querySelector("#saveScoreBtn")
const finalScore =document.querySelector("#finalScore")
const mostRecentScore = localStorage.getItem("mostRecentScore")

const highScores = JSON.parse(localStorage.getItem("highScores")) || []// makes the variable highScores localStorage.getItem highscores gets the highscores from local storage JSON.parse makes it into a javaScript object

const MAX_HIGH_SCORES = 5 // sets the amount of high scores stored 

finalScore.innerText = mostRecentScore//tells the displays the most recent score for the user

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => { 
    e.preventDefault()

    const score = { 
        score: mostRecentScore,
        name: username.value
    }
    
    

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem("highScores", JSON.stringify(highScores))
    window.location.assign("highscores.html")
}