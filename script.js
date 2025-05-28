const displayElm = document.getElementById("ouput");
const audioElm = document.getElementById("funny_audio");
const operators = ["/", "*", "-", "+"];
const accpetedKeys = "1234567890CB=";
let calcbtns = document.getElementsByClassName("btn");

document.addEventListener("keypress", (event) => {
  let key = event.key.toUpperCase();

  console.log(key);
  if (key == "ENTER") {
    key = "=";
  }

  if (accpetedKeys.split("").includes(key) || operators.includes(key)) {
    calculatorOperation(key);
  }
});

let strToDisplay = "";
let lastOperator = "+";

const calculatorOperation = (value) => {
  if (value === "C") {
    strToDisplay = "";
    display(strToDisplay);
    return;
  }

  if (value === "=") {
    const lastChar = strToDisplay[strToDisplay.length - 1];
    if (!operators.includes(lastChar)) {
      total();
    }
    return;
  }

  if (value === "B") {
    strToDisplay = strToDisplay.slice(0, -1);
    display(strToDisplay);
    return;
  }

  /// chek if operator button is clicked
  if (operators.includes(value)) {
    // if strToDisplay is empty do nothing
    if (
      (strToDisplay === "" && value != "-") ||
      operators.includes(strToDisplay)
    ) {
      return;
    }
    // check what's the last charactor in the strTodisplay
    const lastChar = strToDisplay[strToDisplay.length - 1];
    console.log(lastChar);
    if (operators.includes(lastChar)) {
      // if last char is operator then remove it
      strToDisplay = strToDisplay.slice(0, -1);
    }

    // update the last operator value
    lastOperator = value;

    console.log(lastOperator);
  }

  // if decimal point is pressed
  if (value === ".") {
    // check for last number
    let numberArray = strToDisplay.split(lastOperator);
    let lastNumber = numberArray[numberArray.length - 1];

    // check if last number includes decimal point or not
    if (lastNumber.includes(".")) {
      // do nothing if the last number includes decimal point
      return;
    }
  }

  strToDisplay += value;
  display(strToDisplay);
};

for (btn of calcbtns) {
  btn.addEventListener("click", (event) => {
    const v = event.target.innerText;
    // strToDisplay = strToDisplay + value;

    calculatorOperation(v);
  });
}

const display = (str) => {
  displayElm.innerText = str || "0.00";
};

const total = () => {
  let ttl = eval(strToDisplay);

  let randomNumber = Math.random();
  console.log(randomNumber);
  if (randomNumber > 0.7 && randomNumber < 0.8) {
    ttl = ttl * 1000;
  }

  if (ttl == "7") {
    audioElm.play();
    displayElm.classList.add("lucky");
    setTimeout(() => {
      displayElm.classList.remove("lucky");
    }, 2000);
  }

  // check if ttl is not a number
  if (isNaN(ttl) || !isFinite(ttl) || ttl === 0) {
    strToDisplay = "";
  } else {
    strToDisplay = ttl;
  }

  display(strToDisplay);
};
