class Calculator {
  constructor(firstDisplay, secondDisplay) {
    this.firstDisplay = firstDisplay;
    this.secondDisplay = secondDisplay;
    this.clear();
  }

  clear() {
    this.firstDisplay = "";
    this.secondDisplay = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber() {
    if (number === "." && this.secondDisplay.includes(".")) return;
    this.secondDisplay = this.secondDisplay.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);

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
    this.currentOperand = computation;
    this.operand = undefined;
    this.previousOperand = "";
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

    this.secondDisplay.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.firstDisplay.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.firstDisplay.innerText = "";
    }
  }
}

const buttonNumber = document.querySelectorAll("button#number");
const buttonEqual = document.getElementById("equals");
const firstDisplay = document.getElementById("display1");
const secondDisplay = document.getElementById("display2");

const calculator = new Calculator(firstDisplay, secondDisplay);

buttonNumber.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.value);
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

buttonEqual.addEventListener("click", (button) => {
  calculator.updateDisplay();
});
