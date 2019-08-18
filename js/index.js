'use strict';

let calcInputs = "";
let screenContents = [];
let operands = [];
let operators = [];

let display = document.getElementById('disp');

display.innerText = '0';





function prepInput(input) {
  if (input === 'deci') {
    if (calcInputs.includes('.')) return;
    if (calcInputs.length > 0) {
      handleInput('.');
    } else {
      handleInput('0.');
    }
  } else if (input.match(/[\/*+-]/) ) {
    console.log('operator matched');
    operands.push(calcInputs);
    operators.push(input);
    partialClear();
    console.log('operands', operands, '\operators', operators);
  } else {
    handleInput(input);
  }
}

function handleInput(input) {
  calcInputs += input;
  screenContents.push(input);
  display.innerText = screenContents.join('');
  console.log('input', calcInputs);
}

function fullClear() {
  calcInputs = "";
  screenContents = [];
  operands = [];
  operators = [];
  display.innerText = '0';
  console.log('operands', operands, '\operators', operators);
}

function partialClear() {
  calcInputs = "";
  screenContents = [];
  display.innerText = '0';
}

