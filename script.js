const questions = [
  {
    question: "💻 O que significa 'HTML'?",
    options: ["HyperText Markup Language", "HighText Machine Language", "Hyperlink and Text Markup Language"],
    answer: 0,
    explanation: "HTML significa HyperText Markup Language e é usado para estruturar páginas web."
  },
  {
    question: "🔢 Qual é um tipo de dado em JavaScript?",
    options: ["real", "integer", "boolean"],
    answer: 2,
    explanation: "Boolean representa verdadeiro ou falso em JavaScript."
  },
  {
    question: "🧠 Como se declara uma função em JavaScript?",
    options: ["function minhaFunc()", "def minhaFunc()", "fun minhaFunc()"],
    answer: 0,
    explanation: "A palavra-chave correta em JavaScript é 'function'."
  },
  {
    question: "⚛️ Qual biblioteca é usada para criar interfaces em React?",
    options: ["Angular", "Vue", "React"],
    answer: 2,
    explanation: "React é a biblioteca JavaScript desenvolvida pelo Facebook para interfaces de usuário."
  },
  {
    question: "🔍 O que o operador '===' faz em JavaScript?",
    options: ["Compara valores", "Compara valores e tipos", "Atribui valores"],
    answer: 1,
    explanation: "'===' verifica valor e tipo (comparação estrita)."
  },
  {
    question: "💬 Como fazer comentário de uma linha em JavaScript?",
    options: ["<!-- comentário -->", "/* comentário */", "// comentário"],
    answer: 2,
    explanation: "Comentários de uma linha em JS usam //"
  },
  {
    question: "🧾 O que é uma variável?",
    options: ["Texto fixo", "Um espaço para armazenar dados", "Um bug no código"],
    answer: 1,
    explanation: "Variáveis armazenam dados em memória."
  },
  {
    question: "🎨 Para que serve o CSS?",
    options: ["Programar funções", "Estilizar páginas", "Conectar ao banco de dados"],
    answer: 1,
    explanation: "CSS é usado para dar estilo visual às páginas HTML."
  },
  {
    question: "📢 Como imprimir no console em JS?",
    options: ["print()", "console.log()", "echo()"],
    answer: 1,
    explanation: "console.log() imprime mensagens no console."
  },
  {
    question: "🧑‍💻 Qual dessas é linguagem backend?",
    options: ["HTML", "Python", "CSS"],
    answer: 1,
    explanation: "Python é uma linguagem popular para backend."
  }
];

let current = 0;
let score = 0;
let username = "";
let wrongAnswers = [];
let timer;
let timeLeft = 300;

function startQuiz() {
  username = document.getElementById("username").value.trim();
  if (!username) return alert("Digite seu nome para começar!");

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";

  loadQuestion();
  startTimer();
}

function loadQuestion() {
  if (current >= questions.length) return showResult();

  const q = questions[current];
  document.getElementById("question").innerText = q.question;
  document.getElementById("answers").innerHTML = "";
  document.getElementById("feedback").innerText = "";
  document.getElementById("next-btn").style.display = "none";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(i, btn);
    document.getElementById("answers").appendChild(btn);
  });

  timeLeft = 300;
  document.getElementById("timer").innerText = `⏱️ Tempo restante: ${timeLeft}s`;
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `⏱️ Tempo restante: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(-1);
    }
  }, 1000);
}

function selectAnswer(index, btnClicked = null) {
  clearInterval(timer);
  const q = questions[current];
  const buttons = document.querySelectorAll("#answers button");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("correct");
    else if (i === index) btn.classList.add("wrong");
  });

  if (index === q.answer) {
    score++;
    document.getElementById("feedback").innerText = "✅ Acertou! Muito bem!";
  } else {
    document.getElementById("feedback").innerText = "❌ Eita! Resposta incorreta.";
    wrongAnswers.push({
      question: q.question,
      selected: index !== -1 ? q.options[index] : "Não respondeu",
      correct: q.options[q.answer],
      explanation: q.explanation
    });
  }

  document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
  current++;
  loadQuestion();
  startTimer();
}

function showResult() {
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  document.getElementById("result-text").innerText =
    `${username}, você acertou ${score} de ${questions.length} perguntas! 🎉`;

  const exp = document.getElementById("explanations");
  exp.innerHTML = "<h3>Explicações das questões erradas:</h3>";
  wrongAnswers.forEach(item => {
    exp.innerHTML += `
      <p><strong>${item.question}</strong><br>
      Sua resposta: ${item.selected}<br>
      Resposta correta: ${item.correct}<br>
      Explicação: ${item.explanation}</p>
      <hr>
    `;
  });
}
