const inputElement = <HTMLInputElement>document.getElementById('input-prefix-proposition');
const outputElement = document.getElementById('output')!;
const variablesElement = document.getElementById('variables')!;

var input = inputElement.value;

try {
  var proposition = Gate.parse(input);
  inputElement.classList.remove('invalid')
  var variables:objectOfBooleans = proposition.variablesObj
  variablesElement.textContent = JSON.stringify(variables,null,2)
  console.log(variables);
  console.log(proposition);
  outputElement.textContent = proposition.evaluate(variables).toString();
} catch (error) {
  inputElement.classList.add('invalid')
}


function updateProposition(rawData:string) {
  try{
    proposition = Gate.parse(rawData);
    inputElement.classList.remove('invalid')
    variables = proposition.variablesObj
    variablesElement.textContent = JSON.stringify(variables,null,2)
    outputElement.textContent = proposition.evaluate(variables).toString();
  }catch(error){
    inputElement.classList.add('invalid')
  }
}