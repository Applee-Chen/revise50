let questionQueue = [];
let unseenQuestionIds = [];
/**
 * Return a random number uniformly chosen from 0...n - 1
 * @param {*} n
 */
function uniform(n) {
  return Math.floor(Math.random() * n);
}

function toggleTheme() {
  const button = document.querySelector(".setting-button.theme");
  const icon = button.querySelector("span");
  const body = document.querySelector("body");
  button.addEventListener("click", () => {
    if (icon.innerText === "dark_mode") {
      icon.innerText = "light_mode";
    } else {
      icon.innerText = "dark_mode";
    }
    body.classList.toggle("dark-theme");
  });
}
function getButtonGroup() {
  return document.querySelector(".option-button-group");
}
function getQuestionDescription() {
  return document.querySelector("#question-description");
}

function createCorrectIcon() {
  const icon = document.createElement("span");
  icon.classList.add("material-icons-outlined");
  icon.classList.add("result-icon");
  icon.innerText = "done";
  icon.style.display = "none";
  return icon;
}

function createIncorrectIcon() {
  const icon = document.createElement("span");
  icon.classList.add("material-icons-outlined");
  icon.classList.add("result-icon");
  icon.innerText = "close";
  icon.style.display = "none";
  return icon;
}

function createButton(content, isCorrect) {
  const buttonGroup = getButtonGroup();
  const button = document.createElement("button");
  button.innerText = content;
  const icon = isCorrect ? createCorrectIcon() : createIncorrectIcon();
  button.appendChild(icon);
  buttonGroup.appendChild(button);
  return button;
}

function setQuestionDesciption(content) {
  const questionDescription = getQuestionDescription();
  questionDescription.innerText = content;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function seeQuestion(id) {
  let index = unseenQuestionIds.indexOf(id);
  if (index !== -1) {
    unseenQuestionIds.splice(index, 1);
  }
}

function showQuestion(nextQuestionEvent) {
  // pop the first question
  if (questionQueue.length === 0) {
    alert('you have finished all questions')
    return
  }
  let question = questionQueue.shift();

  // display the question
  const description = question.description;
  setQuestionDesciption(description);

  // shuffle the options
  const options = shuffle(question.options);

  // setup option buttons
  const disableButton = new Event("disableButton");
  const questionDescription = getQuestionDescription();
  const buttonGroup = getButtonGroup();
  questionDescription.style.transition =
    "var(--move-animation-duration) ease-in";
  buttonGroup.style.transition = "var(--move-animation-duration) ease-in";
  questionDescription.style.right = "0px";
  buttonGroup.style.right = "0px";

  options.forEach((option) => {
    const button = createButton(
      option.description,
      option.isCorrect === true ? true : false
    );
    document.addEventListener("disableButton", () => {
      button.disabled = true;
      const icon = button.querySelector(".result-icon");
      icon.style.display = "inline";
    });
    button.addEventListener("click", () => {
      button.classList.add("selected");
      document.dispatchEvent(disableButton);
      // if (option.isCorrect) {
      //   // TODO animation
      // } else {
      //   // TODO animation
      // }
      const questionDescription = getQuestionDescription();
      const optionButtonGroup = getButtonGroup();
      setTimeout(() => {
        questionDescription.style.right = "100%";
        optionButtonGroup.style.right = "100%";
      }, 1400);

      setTimeout(() => {
        questionDescription.style.transition = "none";
        optionButtonGroup.style.transition = "none";
        questionDescription.style.right = "-100%";
        optionButtonGroup.style.right = "-100%";
        document.dispatchEvent(nextQuestionEvent);
      }, 2000);
    });
  });
}

function fetchQuestion(num) {
  if (unseenQuestionIds.length === 0) return
  let urlsList = [];
  for (let i = 0; i < num; i++) {
    if (unseenQuestionIds.length === 0) break
    let questionId = unseenQuestionIds[uniform(unseenQuestionIds.length)];
    urlsList.push(`/question/${questionId}`);
    seeQuestion(questionId)
  }
  Promise.all(urlsList.map((u) => fetch(u)))
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then((questions) => {
      questions.forEach((question) => {
        questionQueue.push(question);
      })
    });
}

function cleanUp() {
  const questionDescription = getQuestionDescription();
  const buttonGroup = getButtonGroup();
  questionDescription.innerText = "";
  buttonGroup.innerHTML = "";
}

// set up color theme
toggleTheme();

for (let i = 0; i <= maxId; i++) unseenQuestionIds.push(i);

window.initialQuestions.forEach((question) => {
  seeQuestion(question.id)
  questionQueue.push(question)
})

const nextQuestionEvent = new Event("nextQuestion");
document.addEventListener("nextQuestion", () => {
  cleanUp();
  console.log(unseenQuestionIds.length)
  // always keep more than 5 question in the questionQueue
  if (questionQueue.length <= 5) {
    fetchQuestion(10);
  }
  showQuestion(nextQuestionEvent);
});
document.dispatchEvent(nextQuestionEvent);
