const game = document.querySelector(".game"); // entire game container --- to change its display
const quiz = document.querySelector(".quiz"); // quiz container --- to append questions
const start = document.querySelector(".start"); // start button ---to initiate general info quiz game
const go = document.querySelector(".go"); // go button --- to initiate characters quiz game
const end = document.getElementById("end"); // end container ---to change its display
const endText = document.getElementById("end-textbox"); // end container --- to display custom results

const scoreBoard = document.querySelector(".score"); // scoreboard --- to show updated score
const questionNumber = document.querySelector(".question-number"); // question number  
const results = document.querySelector(".results"); // results  
const instructions = document.querySelector(".instructions"); // instructions  
const endGif = document.querySelector(".gif"); // gif - to adjust according to score

let score = 0; // score to be displayed

let currentQuestionNumber = 0; // number to be displayed
let currentCharQuestionNumber = 0;
let currentQuestionIndex = 0; // index for selecting question
let currentCharQuestionIndex = 0;
let currentQuestion = ""; // current question to be displayed
let currentCharQuestion = "";

// class to follow for each question general quiz
class Question {
  constructor(questionAsked, choices, answer, image) {
    this.questionAsked = questionAsked;
    this.choices = choices;
    this.answer = answer;
    this.image = image;
  }
}

// Array of questions and their answers - general q's
// Each question has an array of 4 choices with one indicated as the answer
const questions = [
  new Question(
    `Who was the "mad-pooper" in the episode "Broadcast Wagstaff School News"?`,
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
    `What is the name of the local amusement park with the ferris wheel?`,
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
    `What did Logan Bush take from Louise in the episode 'Ear-sy Rider'?`,
    [
      `her kuchi kobi doll`,
      `her homework`,
      `her tennis racket`,
      `her pink ears hat`
    ],
    `her pink ears hat`,
    `images/Logan_Bush.jpg`
  ),
  new Question(
    `What is the name of this guys restaurant?`,
    [
      `Jimmy's Pizza Place`,
      `Pesto's Perfect Pizza`,
      `Jimmy's Perfect Pizzeria`,
      `Jimmy Pesto's Pizzeria`
    ],
    `Jimmy Pesto's Pizzeria`,
    `images/Jimmy_Pesto.png`
  ),
  new Question(
    `Where does this guy work? Hint it's a bank.`,
    [
      `First Bank of Wonder Wharf`,
      `First Oceanside Savings Bank`,
      `First Savings and Loan`,
      `First Bank of Second Avenue`
    ],
    `First Oceanside Savings Bank`,
    `images/Dowling.jpg`
  ),
  new Question(
    `What name does this dentist have for his blue Yamaha Pacifica guitar?`,
    [`Slow Hand`, `Betsy`, `Tina`, `Greta`],
    `Greta`,
    `images/Dr._Yap2.png`
  )
];

//class for character quiz

class CharQuestion {
  constructor(cQuestionAsked, cChoices, cAnswer, cImage) {
    this.cQuestionAsked = cQuestionAsked;
    this.cChoices = cChoices;
    this.cAnswer = cAnswer;
    this.cImage = cImage;
  }
}
// character quiz questions
const charQuestions = [
  new CharQuestion(
    `Who is this a picture of? Hint he's the school janitor.`,
    [`Mr. Frond`, `Mr. Branca`, `Mr. Green`, `Mr. Burger`],
    `Mr. Branca`,
    `images/Mr_Branca.jpg`
  ),
  new CharQuestion(
    `What is this characters name?`,
    [`Marshmallow`, `Sprinkles`, `Stretch`, `Cha-Cha`],
    `Marshmallow`,
    `images/Marshmellow.jpg`
  ),
  new CharQuestion(
    `Who voices this character? aka Mike the Mailman.`,
    [`Tim Robbins`, `Tim Meadows`, `James Earl Jones`, `Bill Bellamy`],
    `Tim Meadows`,
    `images/Mike.jpg`
  ),
  new CharQuestion(
    `Who is this a picture of? Who is Linda's sister?`,
    [`Gayle`, `Gloria`, `Linda`, `Gracie`],
    `Gayle`,
    `images/Gayle.png`
  ),
  new CharQuestion(
    `What is this characters name?`,
    [`Tina`, `Stacey`, `Millie`, `Louise`],
    `Louise`,
    `images/Louise.jpg`
  ),
  new CharQuestion(
    `Who is this a picture of? Hint he is one of Louise's classmates.`,
    [`Darryl`, `Zeke`, `Josh`, `Mr. Fischoeder`],
    `Darryl`,
    `images/Darryl-2.jpg`
  ),
  new CharQuestion(
    `What is this characters name? Hint he is the bartender at Pesto's`,
    [`James`, `Frank`, `Trev`, `Kevin`],
    `Trev`,
    `images/Trev.jpg`
  ),
  new CharQuestion(
    `Speaking of Pesto ... what is Jimmy Pesto's real name?`,
    [`James Pastafarian`, `Jim Johnston`, `Jim Parsons`, `James Poplopovich`],
    `James Poplopovich`,
    `images/Jimmy_Pesto.png`
  ),
  new CharQuestion(
    `Who provides the voice for the Moody Foodie? Hint he has also payed an animated rat and penguin in other movies/shows.`,
    [`Jim Parsons`, `Patton Oswalt`, `Jim Gaffigan`, `Sarah Silverman`],
    `Patton Oswalt`,
    `images/moodfood.jpeg`
  ),
  new CharQuestion(
    `Who is this a picture of? Hint who's the Belcher's Dentist?`,
    [`Dr. Hibbert`, `Doc Brown`, `Dr. Doom`, `Dr. Yap`],
    `Dr. Yap`,
    `images/Dr._Yap2.png`
  )
];

// initiate game - general q's
function startGame() {
  resetGame();
  game.style.display = "block";
  // hide irrelevant content
  instructions.style.display = "none";
  start.style.display = "none";
  go.style.display = "none";
  nextQuestion(); // run function to show first general question
}

start.addEventListener("click", startGame); // start button click

// initate characters quiz
function startCharGame() {
  resetGame();
  game.style.display = "block";
  // hide irrelevant content
  go.style.display = "none";
  instructions.style.display = "none";
  start.style.display = "none";
  nextCharQuestion(); // run function to show first character question
}

go.addEventListener("click", startCharGame); // go button click

// Render/append a question incrementally as the user selects "load next question" auto for general quiz
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

/// Render for the Characters quiz
function renderCharQuestion() {
  if (currentCharQuestionIndex < charQuestions.length) {
    currentCharQuestion = charQuestions[currentCharQuestionIndex];
    let renderedQuestion = document.createElement("div");
    let questionText = document.createElement("h2");
    let questionImage = document.createElement("IMG");
    let choices = document.createElement("div");
    questionText.innerHTML = currentCharQuestion.cQuestionAsked;
    renderedQuestion.className = "question";
    questionImage.setAttribute("src", `${currentCharQuestion.cImage}`);
    choices.className = "choices";
    quiz.appendChild(renderedQuestion);
    renderedQuestion.appendChild(questionText);
    renderedQuestion.appendChild(questionImage);
    renderedQuestion.appendChild(choices);
    renderCharAnswers();
  } else {
    endGame();
  }
}

// Render/append answers to the current question general quiz
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

// Render answers for Character quiz

function renderCharAnswers() {
  let eachChoice = charQuestions[currentCharQuestionIndex].cChoices;
  choices = document.querySelector(".choices");
  for (let q = 0; q < 4; q++) {
    choice = document.createElement("button");
    choice.className = "choice";
    choice.innerHTML = eachChoice[q];
    choices.appendChild(choice);
    choice.addEventListener("click", checkCharAnswer);
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

// next char question
function nextCharQuestion() {
  clearCurrentQuestion();
  renderCharQuestion();
  currentCharQuestionIndex++;
  currentCharQuestionNumber++;
  questionNumber.innerHTML = `Question ${currentCharQuestionNumber}`;
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

function checkCharAnswer(evt) {
  if (evt.target.innerHTML == currentCharQuestion.cAnswer) {
    incrementScore();
    nextCharQuestion();
  } else {
    nextCharQuestion();
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
}

// show the user how they did
function renderResults() {
  if (score < 1) {
    results.innerHTML = `You got ${10 -
      score} out of 10 wrong. Really? Zero none na-da zip zilch! Have you watched the show? You've made Tina stomping mad.`;
    endGif.setAttribute("src", "gifs/tinaStomp.gif");
  } else if (score < 4) {
    results.innerHTML = `You got ${10 -
      score} out of 10 wrong. Looks like you better watch more or Louise is gonna be mad.`;
    endGif.setAttribute("src", "gifs/louiseFire.gif");
  } else if (score < 7) {
    results.innerHTML = `You got ${score} out of 10 right. Not too bad, but you might end up sleeping next to Tina!`;
    endGif.setAttribute("src", "gifs/tinaThrash.gif");
  } else if (score < 10) {
    results.innerHTML = `You got ${score} out of 10 right. Very Nice that makes Tina want to dance!`;
    endGif.setAttribute("src", "gifs/tinaDance.gif");
  } else {
    results.innerHTML = `You got ${score} out of 10 right. Perfect Score! Enjoy a family dance!`;
    endGif.setAttribute("src", "gifs/famDance.gif");
  }
}
