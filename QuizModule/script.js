// buttons definition
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const countdowntimer = document.getElementById('countdonwnvalue')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


var isTimerStarted = false;
var timer = new easytimer.Timer();
var isReturnHome = false;




let shuffledQuestions, currentQuestionIndex
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})


function startGame() {
  if(isReturnHome){
    window.location.replace("../index.html");
  }
    

  if(!isTimerStarted){
    
    timer.start({countdown: true, startValues: {seconds: 30}});
    
    $('#countdonwnvalue').html(timer.getTimeValues().toString());
    
    timer.addEventListener('secondsUpdated', function (e) {
        $('#countdonwnvalue').html(timer.getTimeValues().toString());
    });
    
    isTimerStarted = true;
  
  }
  
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  countdowntimer.classList.remove('hide')
  setNextQuestion()


}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

var counter = 0;
var points = 0;
function showQuestion(question) {
 
  counter++;
  
  
  
  //Set image
  if(!Boolean(question.image)){
    $('#question_image').hide();
  }
  else{
    $('#question_image').show();
    $('#question_image').attr('src', question.image);
  }


  points += getPoints(question.difficulty);


  //Set Question Number
  $('#question-title').text(`Question # ${counter} | ( ${getPoints(question.difficulty)} points)`);

  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function getPoints(d){
  if(d === "Easy")
    return 1;
  if(d === "Medium")
    return 3;
  if(d === "Hard")
    return 5;  
  
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  //setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  console.log(shuffledQuestions.length);
  console.log(currentQuestionIndex);
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {

   
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    isReturnHome = true;
    timer.stop();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Is this website secure ?',
    image:'https://i.ibb.co/K0KP7HF/quiz-1.png',
    difficulty : "Easy",
    category : "Internet",
    answers: [
      { text: 'Yes !', correct: false },
      { text: 'No !', correct: true }
    ]
  },
  {
    question: 'Is this webstie safe to secure to give data ?',
    image:'https://i.ibb.co/tP5TR8V/quiz-2.png',
    difficulty : "Easy",
    category : "Internet",
    answers: [
      { text: 'Yes !', correct: true },
      { text: 'No !', correct: false }
    ]
  },
  {

    question: 'A dialog says that it is from an unknown person, should we click on run ?',
    image:'https://i.ibb.co/YjWVG4f/quiz-5.png',
    difficulty : "Hard",
    category : "Virus",
    answers: [
      { text: 'Yes !', correct: false },
      { text: 'No !', correct: true }
    ]
  },
  {
    question: 'An email says that you have won a big amount of money, shall we believe it ?',
    image:'https://i.ibb.co/YjWVG4f/quiz-5.png',
    difficulty : "Easy",
    category : "Phishing",
    answers: [
      { text: 'Yes !', correct: false },
      { text: 'No !', correct: true }
    ]
  },
  {
    question: 'Should we share our password with a friend?',
    image:'',
    difficulty : "Medium",
    category : "Privacy",
    answers: [
      { text: 'Yes !', correct: false },
      { text: 'No !', correct: true }
    ]
  }

  
]