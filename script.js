const game = document.querySelector(".game"); // entire game container // to change its display
const quiz = document.querySelector(".quiz"); // quiz container // to append questions
const start = document.querySelector(".start"); // start button // to initiate game
const end = document.getElementById("end"); // end container // to change its display
const endText = document.getElementById("end-textbox"); // end container // to display custom results
const reset = document.getElementById("reset"); // reset button // to start over
const scoreBoard = document.querySelector(".score"); // scoreboard // to show updated score
const questionNumber = document.querySelector(".question-number"); // question number // to display current number
const results = document.querySelector(".results"); // results paragraph // to display at end
const instructions = document.querySelector(".instructions"); // instructions // to change its display
const endGif = document.querySelector(".gif"); // gif // to adjust according to score
let currentQuestionNumber = 0; // number to be displayed
let currentQuestionIndex = 0; // index for selecting question
let score = 0; // score to be displayed
let currentQuestion = ""; // current question to be displayed


// class to follow for each question
class Question {
  constructor(questionAsked, choices, answer, image) {
    this.questionAsked = questionAsked;
    this.choices = choices;
    this.answer = answer;
    this.image = image;
  }
}


// Array of questions and their answers
// Each question has an array of 4 choices with one indicated as the answer
const questions = [
  new Question(
    `Who was the "mad-pooper"?`,
    [`Gene`, `Tina`, `Zeke`, `Ollie`],
    `Zeke`,
    `images/Mr_Branca.jpg`
  ),
  new Question(
    `Who started the rumor that the burgers might contain human flesh?`,
    [`Louise`, `Jimmy Pesto`, `Hugo`, `Gene`],
    `Louise`,
    `images/human.jpeg`
  ),
  new Question(
    `What is the name of the local amusement park?`,
    [`Play Pier`, `Wonder Park`, `Fun Wharf`, `Wonder Wharf`],
    `Wonder Wharf`,
    `images/ww.jpg`
  ),
  new Question(
    `What is the name of the band Linda was in during High School?`,
    [`Hair Ball`, `Bad Hair Daze`, `Ta-Ta's`, `Tacos`],
    `Ta-Ta's`,
    `images/lindasband.jpeg`
  ),
  new Question(
    `Louise's class pet 'Princess Little Piddles' is what type of animal?`,
    [`Hamster`, `Gerbil`, `Rabbit`, `Chinchilla`],
    `Chinchilla`,
    `images/Louise.jpg`
  ),
  new Question(
    `Which character trapped the kids in the 'fort night' episode?`,
    [`Millie`, `Zeke`, `Josh`, `Mr. Fischoeder`],
    `Millie`,
    `images/Darryl-2.jpg`
  ),
  new Question(
    `What is the name of the bartender at Jimmy Pestos pizzeria?`,
    [`James`, `Frank`, `Trev`, `Kevin`],
    `Trev`,
    `images/Trev.jpg`
  ),
  new Question(
    `What is Jimmy Pesto's real name?`,
    [`James Pastafarian`, `Jim Johnston`, `Jim Parsons`, `James Poplopovich`],
    `James Poplopovich`,
    `images/Jimmy_Pesto.png`
  ),
  new Question(
    `Who provides the voice for the Moody Foodie?`,
    [`Jim Parsons`, `Patton Oswalt`, `Jim Gaffigan`, `Sarah Silverman`],
    `Patton Oswalt`,
    `images/moodfood.jpeg`
  ),
  new Question(
    `What name does Dr. Yap have for his blue Yamaha Pacifica guitar?`,
    [`Slow Hand`, `Betsy`, `Tina`, `Greta`],
    `Greta`,
    `images/Dr._Yap2.png`
  )
];

// initiate game
function startGame() {
  game.style.display = "block";
  // hide irrelevant content
  instructions.style.display = "none";
  start.style.display = "none";
  nextQuestion(); // run function to show first question
}

start.addEventListener("click", startGame); // start button click

// Render/append a question incrementally as the user selects "load next question"
function renderQuestion() {
  if (currentQuestionIndex < questions.length) {
    currentQuestion = questions[currentQuestionIndex];
    let renderedQuestion = document.createElement("div");
    let questionText = document.createElement("h2");
    let questionImage = document.createElement("IMG");
    let choices = document.createElement("div");
    questionText.innerHTML = currentQuestion.questionAsked;
    renderedQuestion.className = "question";
    questionImage.setAttribute("src", `${currentQuestion.image}`);
    choices.className = "choices";
    quiz.appendChild(renderedQuestion);
    renderedQuestion.appendChild(questionText);
    renderedQuestion.appendChild(questionImage);
    renderedQuestion.appendChild(choices);
    renderAnswers();
  } else {
    endGame();
  }
}

// Render/append answers to the current question
function renderAnswers() {
  let eachChoice = questions[currentQuestionIndex].choices;
  choices = document.querySelector(".choices");
  for (let q = 0; q < 4; q++) {
    choice = document.createElement("button");
    choice.className = "choice";
    choice.innerHTML = eachChoice[q];
    choices.appendChild(choice);
    choice.addEventListener("click", checkAnswer);
  }
}

// display next question
function nextQuestion() {
  clearCurrentQuestion();
  renderQuestion();
  currentQuestionIndex++;
  currentQuestionNumber++;
  questionNumber.innerHTML = `Question ${currentQuestionNumber}`;
}

// remove current question content
function clearCurrentQuestion() {
  let child = quiz.firstElementChild;
  while (child) {
    quiz.removeChild(child);
    child = quiz.firstElementChild;
  }
}

// keep score
function incrementScore() {
  score++;
  scoreBoard.innerHTML = `Score: ${score}/10`;
}


// check if given answer was correct
function checkAnswer(evt) {
  if (evt.target.innerHTML == currentQuestion.answer) {
    incrementScore();
    nextQuestion();
  } else {
    nextQuestion();
  }
}

// allow user to play again once they have reached the end
function endGame() {
  end.style.display = "block";
  renderResults();
}

// reset to starting score, question number, and question content
function resetGame() {
  end.style.display = "none";
  currentQuestionIndex = 0;
  currentQuestion = "";
  currentQuestionNumber = 0;
  score = 0;
  scoreBoard.innerHTML = `Score: ${score}/10`;
  nextQuestion();
}

// show the user how they did
function renderResults() {
  if (score < 4) {
    results.innerHTML = `You got ${10-score} out of 10 wrong. Looks like you better watch more or Louise is gonna be mad.`;
    endGif.setAttribute("src", "gifs/louiseFire.gif");
  } else if (score < 7) {
    results.innerHTML = `You got ${score} out of 10 right. Not too bad, but you might end up sleeping next to Tina!`;
    endGif.setAttribute("src", "gifs/tinaThrash.gif");
  } else if (score < 10){
    results.innerHTML = `You got ${score} out of 10 right. Very Nice that makes Tina want to dance!`;
    endGif.setAttribute("src", "gifs/tinaDance.gif");
  } else {
      results.innerHTML = `You got ${score} out of 10 right. Perfect Score! Enjoy a family dance!`;
      endGif.setAttribute("src", "gifs/famDance.gif");

  }
  reset.addEventListener("click", resetGame);
}