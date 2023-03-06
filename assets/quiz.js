const question = document.querySelector("#question"); //connects to the id question in css and makes it a variable question
const choices = Array.from(document.querySelectorAll(".answer-text")); //makes a variable named choices and that is connected to the answer-text class Array.from makes a array from it items in class answer-text
const progressText = document.querySelector("#progressText"); //makes a variable named progressText that is connected to id progressText
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let correctAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];



let questions = [
  {
    question: "What does .length do?",
    choice1: "Adds to a array length or string.",
    choice2: "Determines the length of a array or string.",
    choice3: "Makes a function longer.",
    choice4: "Measures the distance between items. ",
    answer: 2,
  },
  {
    question: "Which method will return a string value that has been converted to lower case?",
    choice1: "toLowerCase()",
    choice2: "toLower()",
    choice3: "changeCase(case)",
    choice4: "None of the above",
    answer: 1,
  },
  {
    question: "Inside which HTML element should you put the JavaScript?",
    choice1: "<script>",
    choice2: "<js>",
    choice3: "<java>",
    choice4: "www.",
    answer: 1,
  },
  {
    question: "What is the correct way to change a HTML id using JavaScript?",
    choice1: "forget it, it can't be done",
    choice2: "document.getElementByName.innerHTML = ",
    choice3: "document.getElementById",
    choice4: "toHTML()",
    answer: 3,
  },
  {
    question: "How do you write 'Welcome User' in a alert box?",
    choice1: "ReplaceOut.ar(Welcome User)",
    choice2: "END OF LINE",
    choice3: "msgBox('Welcome User');",
    choice4: "alert('Welcome User');",
    answer: 4,
  },
  {
    question: "How do you call a function named 'user' on JavaScript?",
    choice1: "Greetings User",
    choice2: "comeHere(user)",
    choice3: "user()",
    choice4: "iFightForThe(user)",
    answer: 3,
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    choice1: "Math.max(x,y)",
    choice2: "top(x,y) ",
    choice3: "highest(x,y)",
    choice4: "Math.floor",
    answer: 1,
  },
  {
    question: "Which event occurs when the user clicks on a HTML element?",
    choice1: "you get on the grid",
    choice2: "onHover",
    choice3: "onclick",
    choice4: "nothing",
    answer: 3,
  },
  {
    question: "How do you declare a JavaScript variable?",
    choice1: "I declare you a variable",
    choice2: "var name;",
    choice3: "This is Blue leader",
    choice4: "v name",
    answer: 2,
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    choice1: " = ",
    choice2: " - ",
    choice3: " / ",
    choice4: " oh my user ",
    answer: 1,
  },
];


const SCORE_POINTS = 100; //all caps because it is not going to change
const MAX_QUESTIONS = 10;

//function that uses spread operator to get questions and calls the function getNewQuestion
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]; // the spread operator takes each object in questions and places them inside of the array avilableQuestions
  getNewQuestion(); //calls the function getNewQuestion which is created below
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }
  questionCounter++; //adds one to the question bar
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`; //is a template literal that shows the user what question they are on and a progress bar. It is a shorter way of writing "Question " + questionCounter + " of " + MAX_QUESTIONS innerText is a feature that will print for the user to see.
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; // targets the id progressBarFull and then the style for it and the width it takes the amount of the questionCounter divides it by MAX_QUESTIONS and adds % to it that then shows as the width of progressBarFull

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length); //creates a var named questionsIndex Math.random()gives a random number including decimals then it is is multiplied by the length of availableQuestions and Math.floor makes it a whole number
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question; // takes the index number or availableQuestions and displays it for the user

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);
  correctAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    // e is short for event adds a click event to each choice
    if (!correctAnswers) return;

    correctAnswers = false; // sets correctAnswers from true to false
    const selectedChoice = e.target; // makes a constant variable that is a target event which gets the element where the event occurs
    const selectedAnswer = selectedChoice.dataset["number"]; // dataset gets data-number from the html and the targeted event selectedChoice and makes it into the variable selectedAnswer

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; // is a ternary operator  boolean that states if selectedAnswer is equal to currentQuestion answer then use the items under class correct in css if not use incorrect

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS); //if the correct then it adds 100 points
    } else if (time < 30) {
      time = 0;
    } else {
      time -= 30;
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000); // allows time for the red or green to show  and then gets the next question
  });
});


const startingMinutes = 3;

let time = startingMinutes * 60;

const countdownEl = document.getElementById("countdown");

function setTime() {
  let timerInterval = setInterval(function () {
    const minutes = Math.floor(time / 60); //time is divided by 60 and then Math.floor makes sure there are no decimals
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    time--;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    if (time <= 0) {
      clearInterval(timerInterval);
      localStorage.setItem("mostRecentScore", score);
      return window.location.assign("end.html");

    } else if (time <= 10) {
      // countdownEl.style.backgroundColor = "red";
      countdownEl.style.color = "red";
    }
  }, 1000);
}

setTime();

incrementScore = (num) => { 
  if (availableQuestions.length === 0 && time > 120 && score === 900) {
    score += 1000; alert("Congratulations User!\nYou beat the MasterControl and earned the bonus points.") //adds 1000 bonus points if all the questions are correct and answered in less then one minute
  } else
 { score += num;
  scoreText.innerText = score;}
};

startGame();
