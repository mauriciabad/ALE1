const inputElement = <HTMLInputElement>document.getElementById('input-prefix-proposition');
const outputElement = document.getElementById('output')!;
const variablesElement = document.getElementById('variables')!;

var proposition
var variables:objectOfBooleans

updateProposition(inputElement.value)

function updateProposition(rawData:string) {
  try{
    proposition = Gate.parse(rawData);
    inputElement.classList.remove('invalid')
    variables = proposition.variablesObj
    variablesElement.textContent = JSON.stringify(variables,null,2)
    outputElement.textContent = proposition.evaluate(variables).toString();
    console.log(variables);
    console.log(proposition);
  }catch(error){
    inputElement.classList.add('invalid')
    outputElement.textContent = 'undefined'
    variablesElement.textContent = ''
  }
}