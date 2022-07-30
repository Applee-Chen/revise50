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

function showQuestion(maxId, nextQuestionEvent) {
  const numberId = Math.floor(Math.random() * (maxId + 1));
  fetch(`/question/${numberId}`)
    .then((e) => e.json())
    .then((question) => {
      const description = question.description;
      setQuestionDesciption(description);
      const options = shuffle(question.options);
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
          if (option.isCorrect) {
            // TODO animation
          } else {
            // TODO animation
          }
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
    });
}

function cleanUp() {
  const questionDescription = getQuestionDescription();
  const buttonGroup = getButtonGroup();
  questionDescription.innerText = "";
  buttonGroup.innerHTML = "";
}

toggleTheme();
const nextQuestionEvent = new Event("nextQuestion");
document.addEventListener("nextQuestion", () => {
  cleanUp();
  showQuestion(maxId, nextQuestionEvent);
});
document.dispatchEvent(nextQuestionEvent);