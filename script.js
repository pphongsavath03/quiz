var quizQuestions = document.getElementById("quiz-questions");
var timer = document.getElementById("timer");
var btnStart = document.getElementById("btn-start");
var timecounter = document.getElementById("timecounter");
var titleitem = document.getElementById("title-item");
var nextQuestions
var questionanswers = document.getElementById("question-answers");
var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnScore");
var currentindex = 0;
var score = 0;
var count = 50;
var alert = document.getElementById("alert");
var info = document.getElementById("info");
var allScores = [];

// quiz questions

var storedScores = JSON.parse(localStorage.getItem("userData"));
var questions = [{
        title: "Question 1:  Commonly used data type Do Not include:",
        choices: ["A: strings", "B: boolean", "C: alerts", "D: integers"],
        answer: "C: alerts"
    },
    {
        title: "Question 2:  The condition in an if/else statement is enclosed within:",
        choices: ["A: quotes", "B: curly brackets", "C: parentheses", "D: square brackets"],
        answer: "C: parentheses"
    },
    {
        title: "Question 3:  Arrays in JavaScript can be used to store:",
        choices: ["A: numbers and strings", "B: others Arrays", "C: boolean", "D: all of the above"],
        answer: "D: all of the above"
    },
    {
        title: "Question 4:  String values must be enclosed within _______ when being assigned to variables. ",
        choices: ["A: commas", "B: curly brackets", "C: quotes", "D: parentheses"],
        answer: "C: quotes"
    },
    {
        title: "Question 5:  A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["A: javaScript", "B: terminal/bash", "C: alerts", "D: console.log"],
        answer: "D: console.log"
    },
]

btnStart.addEventListener("click", starQuiz);

// start quiz function

function starQuiz() {
    if (storedScores !== null) {
        allScores = storedScores;
    }
    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timecounter.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")
    nextQuestions = questions[currentindex]
    console.log(nextQuestions.title)

    displayQuestion(nextQuestions)

    gametime()
}
btnScore.addEventListener("click", function() {
    let name = document.getElementById("inputScore").value
    scorePage(name, count)
});

// Time Count down

function gametime() {
    timeInterval = 50;
    var timeInterval = setInterval(function() {
        timer.innerText = count
        count--;
        if (count <1) {
            quizQuestions.textContent = ("times up!!")
            clearInterval(timeInterval)
            endgame()
        }
    }, 1000);
}

//score keeping

function scorePage(a, b) {

    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "highscore.html";
}

  // display questions and answers

function displayQuestion(question) {
    titleitem.innerText = question.title
    question.choices.forEach(element => {
        var button = document.createElement("button")
        button.className = "btn-dark btn-block text-left m-1"
        button.innerText = element
        questionanswers.appendChild(button)
        button.addEventListener("click", displaynextQuestion)
    });
}


function displaynextQuestion(e) {
    currentindex++
    if (currentindex < questions.length) {
        correction(e.target.innerText == nextQuestions.answer)
        questionanswers.innerHTML = ""
        if (currentindex < questions.length) {
            nextQuestions = questions[currentindex]
            displayQuestion(nextQuestions)
        } else {
            currentindex = 0
            displayQuestion(nextQuestions)
        }

    } else {
        console.log("endgame")
        endgame()


    }


}

// question response

function correction(response) {

    if (response) {
        alert.innerText = "Correct!"
        console.log("Correct!")
    } else {
        alert.innerText = "Incorrect!"
        count = count - 10
        timer.innerHTML = count
        console.log("Incorrect!")

    }
    setTimeout(function() {
        alert.innerText = ""

    }, 1000);

}

function endgame() {
    myScore.innaText = count
    addscore.classList.remove("d-none")
    timecounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
    addscore.classList.remove("d-none")


}
