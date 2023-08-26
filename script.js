// Initialize calculator variables
let x = '';
let y = '';
let operator = '';
let displayValue = '';
let displayResult = '';


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
    }
}

// Update the calculator display
function populateDisplay(button) {
    if (displayValue.length >= 7) {
        return;
    }
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

equalsBtn.addEventListener('click', () => {;
    let result;
    // Check if x is being submitted by itself
    if (x !== '' && operator == '' && y == '') {
        result = x;
    }
    // Check if an operator is being submitted without x and/or y
    else if (operator !== '' && (x == '' || y == '')) {
        result = "Syntax Error"
    }
    else {
        result = operate(parseFloat(x), operator, parseFloat(y));
        // Check if output will be too long for screen display
        if (result.toString().length > 7) {
            result = "Overflow Error";
        }
    }
        
    calcScreen.textContent = result;
    x = result;
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