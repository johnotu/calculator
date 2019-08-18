'use strict';

let calcInput = "";
let screenContents = [];
let operands = [];
let operators = [];

const calcOperators = {
  "+": function (a, b) { return a + b },
  "-": function (a, b) { return a - b },
  "*": function (a, b) { return a * b },
  "/": function (a, b) { return a / b }
};

let display = document.getElementById('disp');

display.innerText = '0';

function prepInput(input) {
  if (input === 'deci') {
    if (calcInput.includes('.')) return;
    if (calcInput.length > 0) {
      handleInput('.');
    } else {
      handleInput('0.');
    }
  } else if (input.match(/[\/*+-]/) ) {
    // console.log('operator matched', 'calcinput', calcInput.length);
    if (calcInput.length <= 0) return;
    operands.push(calcInput);
    operators.push(input);
    partialClear();
    console.log('operands', operands, '\operators', operators);
  } else {
    handleInput(input);
  }
}

function handleInput(input) {
  // display.innerText = '0';
  calcInput += input;
  screenContents.push(input);
  display.innerText = screenContents.join('');
  console.log('input', calcInput);
}

function fullClear() {
  calcInput = "";
  screenContents = [];
  operands = [];
  operators = [];
  display.innerText = '0';
  console.log('operands', operands, '\operators', operators);
}

function partialClear() {
  calcInput = "";
  screenContents = [];
}

function compute() {
  operands.push(calcInput);
  console.log('operands', operands);

  if (operands.length <= 2) {
    const result = roundCompute(operands[0], operands[1], operators[0]);
    console.log('result', result);
    display.innerText = String(result);
    partialClear();
    operands = [];
    operators = [];
    return;
  }

  let result = operands[0];
  console.log('result2', result);
  for (let i = 0; i < operands.length - 1; i++){
    result = roundCompute(Number(result), Number(operands[i + 1]), operators[i]);
  }
  display.innerText = String(result);
  partialClear();
  operands = [];
  operators = [];
}

function roundCompute(operandA, operandB, operator) {
  console.log('opA', operandA, '\nopB', operandB, '\noperator', operator)
  return calcOperators[operator](Number(operandA), Number(operandB));
}
