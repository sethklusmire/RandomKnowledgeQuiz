// Establish all variables

var quizContainer = document.getElementById("quiz");
var quizQuestionContainer = document.getElementById("quiz_question");
// Get yer buttons goin.
var startBtn = document.getElementById("start");
var resetBtn = document.getElementById("reset");
// Used a css class to hide the clear and reset button. These could o at the bottom but it's nice having them together.
resetBtn.classList.add("hidden");
var clearBtn = document.getElementById("clear");
clearBtn.classList.add("hidden");
var countDownInterval;
// This is my timer. Found a nice one on stack overflow but had too tinker with it.
startBtn.addEventListener("click" , function(){
    var quizTime = 120
    var currentQuestionElement = buildQuestionElement(quizQuestions[currentQuestionIndex]);
quizQuestionContainer.innerHTML = ''; 
quizQuestionContainer.append(currentQuestionElement);
startBtn.classList.add("hidden");
// THis function counts down from quizTime. Which because its a random knowledge quiz, I gave the participant 120 seconds.
countDownInterval = setInterval(function () {
  quizTime -= 1
  document.getElementById("countDown").textContent = quizTime
  if (quizTime === 0) {
    gameOver();
  }
}, 1000)
})
// The questions.
var totalCorrectAnswers = 0;


const quizQuestions = [
  {
    question: "What movie was Val Kilmer Batman in?",
    answers: [
      "Batman Returns",
      "Batman & Robin",
      "Batman Begins",
      "Batman Forever",
    ],
    correctAnswer: "Batman Forever"
  },
  {
    question: "The study of birds is known as?",
    answers: [
      "Mythology",
      "Ornithology",
      "Theology",
      "Proctology",
    ],
    correctAnswer: "Ornithology"
  },
  {
    question: "What year did the Stock Market crash in America?",
    answers: [
        "1931",
        "1930",
        "1929",
        "1928",
    ],
    correctAnswer: "1929",
  },
  {
    question: "What jersey numbers are quarterback allowed to wear?",
    answers: [
        "60-79",
        "1-19",
        "80-89",
        "20-49",  
    ],
    correctAnswer: "1-19",
  },
  {
    question: "What James Bond movie did Duran Duran do the theme song for?",
    answers: [
        "A View to a Kill",
        "Die Another Day",
        "The Man with the Golden Gun",
        "From Russia with Love",
    ],
    correctAnswer: "A View to a Kill",
  },
  {
    question: "What is the longest side of a right triangle called?",
    answers: [
        "Hippocampus",
        "Hypotenuese",
        "Hypothesis",
        "Hippopotamus",
    ],
    correctAnswer: "Hypotenuese",
  },
  {
    question: "What year did Rome have 4 Emperors?",
    answers: [
        "100 BC",
        "69 AD",
        "1 AD",
        "25 AD",
],
    correctAnswer: "69 AD",
  },
  {
    question: "Chianti wine is what primarily what grape varital?",
    answers: [
        "Sangiovese",
        "Nebbiolo",
        "Barbera",
        "Chianti",  
    ],
    correctAnswer: "Sangiovese",
  },
  {
    question: "What is the capital of Missouri?",
    answers: [
        "Kansas City",
        "St.Louis",
        "Jefferson City",
        "Springfield",
    
    ],
    correctAnswer: "Jefferson City",
  },
  {
    question: "The Colorado Rockies have one player in the baseball Hall of Fame, who?",
    answers: [
        "Todd Helton",
        "Troy Tulowitzki",
        "Larry Walker",
        "Charlie Blackmon",
    
    ],
    correctAnswer: "Larry Walker",
  },


]
// This is the start of looping through the questions.
var currentQuestionIndex = 0


function buildQuestionElement(question) {
  var questionId = question.question;

  
  var questionLabel = document.createElement('label');
  questionLabel.setAttribute('for', questionId); 
  questionLabel.textContent = question.question;


  
  var radioGroup = document.createElement('div');
  radioGroup.setAttribute('role', 'radiogroup');
  radioGroup.setAttribute('id', question.question); 




//   The loop for the questions.
  for (var i = 0; i < question.answers.length; i++) {
    var answerId = 'q1_a' + i;
    var answerInput = document.createElement('input');
    answerInput.setAttribute('type', 'radio');
    answerInput.setAttribute('id', answerId); 
    answerInput.setAttribute('name', questionId); 
    answerInput.setAttribute('value', question.answers[i]);
    
    
    answerInput.addEventListener('change', handleAnswerSelected);

    var answerLabel = document.createElement('label');
    answerLabel.setAttribute('for', answerId); 
    answerLabel.textContent = question.answers[i];


    var answerContainer = document.createElement('div');
    answerContainer.setAttribute('class', 'answer-container')
    answerContainer.appendChild(answerInput);
    answerContainer.appendChild(answerLabel);


    radioGroup.appendChild(answerContainer);


  }

  var questionElement = document.createElement('div');
  questionElement.appendChild(questionLabel);
  questionElement.appendChild(radioGroup);

  return questionElement;
}

// When an answer is selected it is recorded in the code below.
function handleAnswerSelected(event) {
  var selectedAnswer = event.currentTarget.value;
  var currentQuestion_correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;
  if (selectedAnswer == currentQuestion_correctAnswer){
      totalCorrectAnswers += 1
  }

  currentQuestionIndex++;
  if (currentQuestionIndex >= quizQuestions.length) {
    gameOver(); 
  }
  else {
    var currentQuestionElement = buildQuestionElement(quizQuestions[currentQuestionIndex]);
  quizQuestionContainer.innerHTML = ''; 
  quizQuestionContainer.append(currentQuestionElement);  
  }
}
// When the game is done what happens? This happens. Show the score andput your initials in.
function gameOver(){
    quizQuestionContainer.innerHTML = "your score was " + totalCorrectAnswers + "/" + quizQuestions.length;
    clearInterval(countDownInterval);
    document.getElementById("countDown").textContent = "";
    var initialsElement = document.getElementById("initials");
    initialsElement.classList.remove("hidden");

}
// More buttons! Local storage was confusing.
var submitBtn = document.getElementById("submit-initials");
var currentHighScores = JSON.parse(localStorage.getItem("highScores"));
if (currentHighScores == null) {
    currentHighScores = []
}
submitBtn.addEventListener("click" , function(){

    currentHighScores.push({
        initials: document.getElementById("initials_input").value,
        score: totalCorrectAnswers,
    })
    var initialsElement = document.getElementById("initials");
    initialsElement.classList.add("hidden");
// This exists to log all of the high scores.
   for(var i = 0; i < currentHighScores.length; i++){
       var highScoreLineItem = currentHighScores[i];
       var highScoreListItemElement = document.createElement("li");
       highScoreListItemElement.textContent = highScoreLineItem.initials + " " + highScoreLineItem.score + "/" + quizQuestions.length;

       highscore_list.appendChild(highScoreListItemElement);
   }
   localStorage.setItem("highScores", JSON.stringify(currentHighScores));
   resetBtn.classList.remove("hidden");
   clearBtn.classList.remove("hidden");
})
// This is to get rid of all the logged high scores.
clearBtn.addEventListener("click" , function(){

    localStorage.removeItem("highScores");
    highscore_list.classList.add("hidden");
})
// Found window.location.reset on w3 schools. The reset button shoots you back to the beginning, almost like refreshing the page.
resetBtn.addEventListener("click" , function(){
    window.location.reload();
})




