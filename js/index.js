'use strict';

// Initialize variables
let calcInput = "";
let screenContents = [];
let operands = [];
let operators = [];

// Parser to hold operator functions. This is necessary because it strongly advised to NOT USE eval() due to security vulnerabilities
const calcOperators = {
  "+": function (a, b) { return a + b },
  "-": function (a, b) { return a - b },
  "*": function (a, b) { return a * b },
  "/": function (a, b) { return a / b }
};

// Hold calculator display in a variable
let display = document.getElementById('disp');

// Set display to zero '0'
display.innerText = '0';

/**
 * Prepare input when key is pressed
 * @param {*} input 
 */
function prepInput(input) {
  // Treat input differently whe it is decimal or an operator
  if (input === 'deci') {
    if (calcInput.includes('.')) return;
    if (calcInput.length > 0) {
      handleInput('.');
    } else {
      handleInput('0.');
    }
  } else if (input.match(/[\/*+-]/) ) { // RegEx matches all operators
    if (calcInput.length <= 0) return;
    operands.push(calcInput);
    operators.push(input);
    partialClear();
  } else {
    // Handle every other input
    handleInput(input);
  }
}

/**
 * Handle input after they've been prepared
 * @param {*} input 
 */
function handleInput(input) {
  calcInput += input;
  screenContents.push(input);
  display.innerText = screenContents.join('');
}

/**
 * Clear all placeholders
 */
function fullClear() {
  calcInput = "";
  screenContents = [];
  operands = [];
  operators = [];
  display.innerText = '0';
}

/**
 * Clear only some placeholders
 */
function partialClear() {
  calcInput = "";
  screenContents = [];
}

/**
 * Compute keyed arithmetric
 */
function compute() {
  // Include last operand in array
  operands.push(calcInput);

  // Loop through operands and compute with operators using Parser
  let result = operands[0];
  for (let i = 0; i < operands.length - 1; i++){
    result = roundCompute(Number(result), Number(operands[i + 1]), operators[i]);
  }

  // Display results and claer placeholders for the next input and computation
  display.innerText = String(result);
  partialClear();
  operands = [];
  operators = [];
}

/**
 * Compute given operations in pairs of operands 
 * @param {*} operandA 
 * @param {*} operandB 
 * @param {*} operator 
 */
function roundCompute(operandA, operandB, operator) {
  return calcOperators[operator](Number(operandA), Number(operandB));
}
