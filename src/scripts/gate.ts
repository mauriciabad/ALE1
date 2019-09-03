type operator = '¬' | '|' | '&' | '=' | '>'
type objectOfBooleans = {[s: string]: boolean}

class Gate {
  operator:operator
  operands:(Gate|Value)[]

  constructor(operator:operator, operands:(Gate|Value)[]) {
    this.operator = operator
    this.operands = operands
  }

  evaluate(values:objectOfBooleans):boolean {
    switch (this.operator) {
      case '¬': return !this.operands[0].evaluate(values)    
      case '|': return this.operands[0].evaluate(values) || this.operands[1].evaluate(values)
      case '&': return this.operands[0].evaluate(values) && this.operands[1].evaluate(values)
      case '=': return this.operands[0].evaluate(values) && this.operands[1].evaluate(values) // TODO: this is a stub, use the actual function
      case '>': return this.operands[0].evaluate(values) && this.operands[1].evaluate(values) // TODO: this is a stub, use the actual function
    }
  }

  static parse(rawData:string): Gate|Value{
    rawData = rawData.replace(/\s/g, '');
    if('¬|&=>'.indexOf(rawData[0]) > -1){
      let operator:operator = rawData[0] as operator
      let operands:string[] = []
      let level = 0;
      let operandBegining = 2
      for (let i = 2; i < rawData.length - 1; i++) {
        switch (rawData[i]) {
          case '(': ++level; break;
          case ')': --level; break;
          case ',': 
            if(level === 0) {
              operands.push(rawData.slice(operandBegining,i))
              operandBegining = i + 1;
            }
            break;
        }
      }
      if(level !== 0) throw "Error parsing Gate, parenthesis are wrong.";
      return new Gate(operator, operands.map((operand) => Gate.parse(operand)))
    }else{
      return new Value(rawData)
    }
  }
  
  get variables():string[]{
    let variables:string[] = []
    this.getVariablesRecursive(variables)
    return variables
  }
  
  getVariablesRecursive(variables:string[]) {
    for (const operand of this.operands) {
      operand.getVariablesRecursive(variables)
    }
  }
}

class Value{
  name:string

  constructor(name:string) {
    this.name = name
  }

  evaluate(values:objectOfBooleans) {
    return values[this.name]
  }
  getVariablesRecursive(variables:string[]) {
    if(!variables.includes(this.name)) variables.push(this.name)
  }

}
