const quizData = [
  { word: "Apple", correct: "Pomme", options: ["Banane", "Orange", "Pomme", "Chien"] },
  { word: "Cat", correct: "Chat", options: ["Chat", "Poisson", "Oiseau", "Chien"] },
  { word: "Thank you", correct: "Merci", options: ["Bonjour", "Merci", "Pardon", "Salut"] },
  { word: "Book", correct: "Livre", options: ["Livre", "Stylo", "Table", "Chaise"] },
  { word: "House", correct: "Maison", options: ["Voiture", "Maison", "Porte", "Fleur"] }
];

let current = 0;
let score = 0;

function loadQuestion() {
  const q = quizData[current];
  document.getElementById("question").innerText = `Translate to French: "${q.word}"`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("result").innerText = "";
}

function checkAnswer(selected) {
  const correct = quizData[current].correct;
  const resultDiv = document.getElementById("result");

  if (selected === correct) {
    resultDiv.innerText = "✅ Correct!";
    resultDiv.style.color = "green";
    score++;
  } else {
    resultDiv.innerText = `❌ Incorrect! Correct answer: ${correct}`;
    resultDiv.style.color = "red";
  }

  document.getElementById("score").innerText = `Score: ${score}`;
}

function nextQuestion() {
  current++;
  if (current < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("question").innerText = "🎉 Game Over!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("result").innerText = `Final Score: ${score}/${quizData.length}`;
    document.querySelector(".next-btn").disabled = true;
    document.querySelector(".next-btn").style.background = "#aaa";
  }
}

loadQuestion();
