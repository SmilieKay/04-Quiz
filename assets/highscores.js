const highScoresList = document.querySelector("#highScoresList") // calls the id from html and css
const highScores = JSON.parse(localStorage.getItem("highScores")) || [] // makes the stringed data into a javaScript object

highScoresList.innerHTML = 
highScores.map(score => { 
    return `<li class="high-score">${score.name} - ${score.score}<li>`
}).join("")