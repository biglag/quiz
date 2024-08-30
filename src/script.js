const quizData = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript",
  },
  {
    question: "Что означает CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: "Cascading Style Sheets",
  },
  {
    question: "Что означает HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: "Hypertext Markup Language",
  },
  {
    question: "В каком году был выпущен JavaScript?",
    answers: ["1996", "1995", "1994", "1993"],
    correct: "1995",
  },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers-container");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart-button");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.classList.add("hidden");
  nextButton.disabled = true;
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-button");
    button.addEventListener("click", () =>
      selectAnswer(button, currentQuestion.correct)
    );
    answersContainer.appendChild(button);
  });
}

function resetState() {
  nextButton.disabled = true;
  while (answersContainer.firstChild) {
    answersContainer.removeChild(answersContainer.firstChild);
  }
}

function selectAnswer(selectedButton, correctAnswer) {
  if (selectedButton.textContent === correctAnswer) {
    score++;
    selectedButton.style.backgroundColor = "green";
  } else {
    selectedButton.style.backgroundColor = "red";
  }
  Array.from(answersContainer.children).forEach((button) => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.style.backgroundColor = "green";
    }
  });
  nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

restartButton.addEventListener("click", startQuiz);

function showResult() {
  resultElement.textContent = `Ваш результат: ${score} из ${quizData.length}`;
  resultContainer.classList.remove("hidden");
  nextButton.classList.add("hidden");
}

startQuiz();
