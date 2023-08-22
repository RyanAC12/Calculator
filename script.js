let x;
let y;
let operator;

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
            return "Divide by 0 Error";
        }
        return divide(x, y);
    }
    else {
        return "Please provide a valid operator";
    }
}