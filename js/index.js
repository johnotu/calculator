'use strict';

let calcInputs = "";
const screenContents = [];

const display = document.getElementById('disp');

display.innerText = '0';





function prepInput(input) {
  if (input === 'deci') {
    if (calcInputs.includes('.')){
      return;
    }
    if (calcInputs.length > 0) {
      handleInput('.');
    } else {
      handleInput('0.');
    }
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