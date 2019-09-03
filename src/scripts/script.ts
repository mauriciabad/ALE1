const inputElement = document.getElementById('input-prefix-proposition');
const outputElement = document.getElementById('output');

var input = inputElement.value;
var output = '';

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
var variables = proposition.variables.reduce(function(result, variableName, i) {
  result[i] = variableName;
  return result;
}, {})
console.log(variables);
output = proposition.evaluate();

outputElement.textContent = output;