const calculator = {
    displayValue: "",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

const updateDisplay = () => {
    const display = document.querySelector(".screen");
    display.textContent = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelectorAll(".keys");

keys.forEach((key) => {    
    key.addEventListener(("click"), (event) => {
        const { target } = event;
        if(!target.matches("button")) {
            return;
        }
        
        if (target.classList.contains("operator")) {
            handleOperator(target.value);
            updateDisplay();
            return;
        }
        
        if(target.classList.contains("decimal")) {
            inputDecimal(target.value);
            updateDisplay();
            console.log(target.value)
            return;
        }
        
        if(target.classList.contains("clear")) {
            resetCalculator();
            updateDisplay();
            return;
        }
        
        inputDigit(target.value);
        updateDisplay();
    })
})

const inputDigit = (digit) => {
    const { displayValue, waitingForSecondOperand } = calculator;

    if(waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
    }
};

const inputDecimal = (dot) => {
    if(calculator.waitingForSecondOperand === true) {
        calculator.displayValue = "0.";
        calculator.waitingForSecondOperand = false;
        return;
    }
    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
};

const handleOperator = (nextOperator) => {
    const {firstOperand, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue)

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }
    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator)

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
};

const calculate = (firstOperand, secondOperand, operator) => {
    if(operator === "+") {
        return firstOperand + secondOperand;
    } else if (operator === "-") {
        return firstOperand - secondOperand;
    } else if (operator === "*") {
        return firstOperand * secondOperand;
    } else if (operator === "/") {
        return firstOperand / secondOperand;
    }
    return secondOperand;
}

const resetCalculator = () => {
    calculator.displayValue = "";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}