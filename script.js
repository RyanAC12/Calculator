// Initialize calculator variables
let x = '';
let y = '';
let operator = '';
let displayValue = '';


// DOM element references
const calcScreen = document.querySelector('.screen');
const entryBtn = document.querySelectorAll('.entry');
const numberBtn = document.querySelectorAll('.num');
const equalsBtn = document.querySelector('#equals');
const operatorBtn = document.querySelectorAll('.op');
const nonOperatorBtn = document.querySelectorAll('.non-op');
const clearBtn = document.querySelector('#clear');


// Basic math operations
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

// Core function to determine which operation to perform
function operate(x, operator, y) {
    switch (operator) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '*':
            return multiply(x, y);
        case '/':
            if (y === 0) {
                return "Nice try"; // Preventing division by zero
            }
            return divide(x, y);
        default: 
            return "Error";
    }
}

// Update the calculator display
function populateDisplay(button) {
    displayValue += button;
    calcScreen.textContent = displayValue;
}

// Manage user input and math operations
function mathQueue(button) {
    btnText = button.textContent;
    if (button.classList.contains('num')) {
        if (operator) {
            y += btnText;
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
        displayValue = ''; // Clear display for next input
    }
}

// Allow for multiple operations to be strung together
function newCalculation() {
    x = operate(parseFloat(x), operator, parseFloat(y)).toString();
    y = '';
}

// Clear calculator's values and display
function clear() {
    displayValue = '';
    x = '';
    y = '';
    operator = '';
    calcScreen.textContent = '';
}

// Display the result of the current operation
function displayTempResult() {
    calcScreen.textContent = operate(parseFloat(x), operator, parseFloat(y));
    displayValue = '';
}

// Reset CSS change for operator buttons
function resetOperatorBackground() {
    operatorBtn.forEach(button => {
        button.classList.remove('btn-clicked');
    })
}

// Event listeners
entryBtn.forEach(button => {
    button.addEventListener('click', () => {
        resetOperatorBackground();
        mathQueue(button);
    });
});

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        populateDisplay(button.textContent);
    });
});

equalsBtn.addEventListener('click', () => {
    x = parseFloat(x);
    y = parseFloat(y);
    const result = operate(x, operator, y);
    calcScreen.textContent = result;
    x = result.toString();
    y = '';
    operator = '';
});

operatorBtn.forEach(button => {
    button.addEventListener('click', () => {
        resetOperatorBackground();
        button.classList.add('btn-clicked');
    });
});

clearBtn.addEventListener('click', clear);
clearBtn.addEventListener('click', resetOperatorBackground);