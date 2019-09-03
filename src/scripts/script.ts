const inputElement = <HTMLInputElement>document.getElementById('input-prefix-proposition');
const outputElement = <HTMLInputElement>document.getElementById('output');

var input = inputElement.value;
var output = false;

const values = {
  A: true,
  B: false,
  C: false,
  D: false,
  E: false,
  F: false,
  G: false,
  H: false,
}

var proposition = Gate.parse(input);
var variables:objectOfBooleans = proposition.variables.reduce((result:objectOfBooleans, variableName) => {
  result[variableName] = false;
  return result;
}, {})
console.log(variables);
console.log(proposition);
output = proposition.evaluate(variables);

outputElement.checked = output;