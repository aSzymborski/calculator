const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");

keys.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return;

  const key = event.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;
  const { type } = key.dataset;
  const { previousKeyType } = calculator.dataset;

  if (type === "number") {
    if (displayValue === "0" || previousKeyType === "operator") {
      display.textContent = keyValue;
    } else if (previousKeyType === "operator") {
      display.textContent = keyValue;
    } else {
      display.textContent = displayValue + keyValue;
    }
  }

  if (type === "operator") {
    const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach((el) => (el.dataset.state = ""));
    key.dataset.state = "selected";

    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  if (type === "equal") {
    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = displayValue;

    if (firstNumber === undefined) return;

    display.textContent = calculate(firstNumber, operator, secondNumber);
  }

  if (type === "clear") {
    display.textContent = 0;
  }

  calculator.dataset.previousKeyType = type;
});

const calculate = (firstNumber, operator, secondNumber) => {
  let result = "";
  if (operator === "plus") result = Number(firstNumber) + Number(secondNumber);
  if (operator === "minus") result = firstNumber - secondNumber;
  if (operator === "times") result = firstNumber * secondNumber;
  if (operator === "divide") result = firstNumber / secondNumber;

  return result.toFixed(2);
};
