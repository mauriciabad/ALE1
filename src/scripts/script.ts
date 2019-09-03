const inputElement = <HTMLInputElement>document.getElementById('input-prefix-proposition');
const outputElement = <HTMLInputElement>document.getElementById('output');

var input = inputElement.value;

try {
  var proposition = Gate.parse(input);
  inputElement.classList.remove('invalid')
  var variables:objectOfBooleans = proposition.variablesObj
  console.log(variables);
  console.log(proposition);
  outputElement.checked = proposition.evaluate(variables);
} catch (error) {
  inputElement.classList.add('invalid')
}


function updateProposition(rawData:string) {
  try{
    proposition = Gate.parse(rawData);
    inputElement.classList.remove('invalid')
    variables = proposition.variablesObj
    outputElement.checked = proposition.evaluate(variables);
  }catch(error){
    inputElement.classList.add('invalid')
  }
}