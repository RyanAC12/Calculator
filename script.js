let x = '';
let y = '';
let operator = '';
let displayValue = '';
let decimalCounter = 0;

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, operator, y) {
    if (decimalCounter > 1) {
        return "Decimal error";
    }
    if (operator == '+') {
        return add(x, y);
    }
    else if (operator == '-') {
        return subtract(x, y);
    }
    else if (operator == '*') {
        return multiply(x, y);
    }
    else if (operator == '/') {
        if (y === 0) {
            return "Nice try";
        }
        return divide(x, y);
    }
    else {
        return "Please provide a valid operator";
    }
}

const calcScreen = document.querySelector('.screen');

function populateDisplay(button) {
    displayValue += button;
    calcScreen.textContent = displayValue;
}

function mathQueue(button) {
    btnText = button.textContent;
    if (button.classList.contains('decimal')) {
        decimalCounter++;
    }
    if (button.classList.contains('num')) {
        if (operator) {
            y += btnText;
            decimalCounter = 0;
        } else {
            x+= btnText;
        }
    } 
    else if (button.classList.contains('op')) {
        if (operator && y !== '') {
            displayTempResult();
            newCalculation();
        }
        operator = btnText;
        displayValue = '';
        decimalcounter = 0;
    }
}

function newCalculation() {
    x = operate(parseFloat(x), operator, parseFloat(y)).toString();
    y = '';
    decimalCounter = 0;
}

function clear() {
    displayValue = '';
    x = '';
    y = '';
    operator = '';
    calcScreen.textContent = '';
}

function displayTempResult() {
    calcScreen.textContent = operate(parseFloat(x), operator, parseFloat(y));
    displayValue = '';
}
function resetOperatorBackground() {
    operatorBtn.forEach(button => {
        button.style.backgroundColor = '';
    })
}

const entryBtn = document.querySelectorAll('.entry');
    entryBtn.forEach(button => {
        button.addEventListener('click', () => {
            resetOperatorBackground();
            mathQueue(button);
        });
    });

const numberBtn = document.querySelectorAll('.num');
    numberBtn.forEach(button => {
        button.addEventListener('click', () => {
            populateDisplay(button.textContent);
        });
    });

const equalsBtn = document.querySelector('#equals');
    equalsBtn.addEventListener('click', () => {
        x = parseFloat(x);
        y = parseFloat(y);
        const result = operate(x, operator, y);
        calcScreen.textContent = result;
        x = result.toString();
        y = '';
        operator = '';
        decimalCounter = 0;
    });

const operatorBtn = document.querySelectorAll('.op');
    operatorBtn.forEach(button => {
        button.addEventListener('click', () => {
            resetOperatorBackground();
            button.style.backgroundColor = 'rgb(68, 64, 64)';
        });
    });

const clearBtn = document.querySelector('#clear');
    clearBtn.addEventListener('click', clear);
    clearBtn.addEventListener('click', resetOperatorBackground);