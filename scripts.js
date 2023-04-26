class Calculator {
  constructor(firstDisplayTextElement, secondDisplayTextElement) {
    this.firstDisplayTextElement = firstDisplayTextElement;
    this.secondDisplayTextElement = secondDisplayTextElement;
    this.clear();
  }

  clear() {
    this.firstDisplay = "";
    this.secondDisplay = "";
    this.operation = undefined;
  }

  delete() {
    this.secondDisplay = this.secondDisplay.toString().slice(0, -1);
  }

  appendNumber() {
    if (number === "." && this.secondDisplay.includes(".")) return;
    this.secondDisplay = this.secondDisplay.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.secondDisplay === "") return;
    if (this.firstDisplay !== "") {
      this.compute();
    }
    this.operation = operation;
    this.firstDisplay = this.secondDisplay;
    this.secondDisplay = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.firstDisplay);
    const curr = parseFloat(this.secondDisplay);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "/":
        computation = prev / curr;
        break;
      default:
        return;
    }
    this.secondDisplay = computation;
    this.operation = undefined;
    this.firstDisplay = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("pt", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    console.log("Passou?");

    this.secondDisplayTextElement.innerText = this.getDisplayNumber(
      this.secondDisplay
    );
    if (this.operation != null) {
      this.firstDisplayTextElement.innerText = `${this.getDisplayNumber(
        this.firstDisplay
      )} ${this.operation}`;
    } else {
      this.firstDisplayTextElement.innerText = "";
    }
  }
}

const buttonNumber = document.querySelectorAll("button#number");
const buttonEqual = document.getElementById("equals");
const firstDisplayTextElement = document.getElementById("display1");
const secondDisplayTextElement = document.getElementById("display2");
const btnOperators = document.querySelectorAll("button#operator");

const calculator = new Calculator(firstDisplayTextElement, secondDisplayTextElement);

buttonNumber.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

btnOperators.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

buttonEqual.addEventListener("click", (button) => {
  calculator.updateDisplay();
});
