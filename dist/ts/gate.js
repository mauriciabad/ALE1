"use strict";
var Gate = /** @class */ (function () {
    function Gate(operator, operands) {
        this.operator = operator;
        this.operands = operands;
    }
    Gate.prototype.evaluate = function (values) {
        switch (this.operator) {
            case '¬': return !this.operands[0].evaluate(values);
            case '|': return this.operands[0].evaluate(values) || this.operands[1].evaluate(values);
            case '&': return this.operands[0].evaluate(values) && this.operands[1].evaluate(values);
            case '=': return this.operands[0].evaluate(values) && this.operands[1].evaluate(values); // TODO: this is a stub, use the actual function
            case '>': return this.operands[0].evaluate(values) && this.operands[1].evaluate(values); // TODO: this is a stub, use the actual function
        }
    };
    Gate.parse = function (rawData) {
        rawData = rawData.replace(/\s/g, '');
        if ('¬|&=>'.indexOf(rawData[0]) > -1) {
            var operator = rawData[0];
            var operands = [];
            var level = 0;
            var operandBegining = 2;
            for (var i = 2; i < rawData.length - 1; i++) {
                switch (rawData[i]) {
                    case '(':
                        ++level;
                        break;
                    case ')':
                        --level;
                        break;
                    case ',':
                        if (level === 0) {
                            operands.push(rawData.slice(operandBegining, i));
                            operandBegining = i + 1;
                        }
                        break;
                }
            }
            if (level !== 0)
                throw "Error parsing Gate, parenthesis are wrong.";
            return new Gate(operator, operands.map(function (operand) { return Gate.parse(operand); }));
        }
        else {
            return new Value(rawData);
        }
    };
    Object.defineProperty(Gate.prototype, "variables", {
        get: function () {
            var variables = [];
            this.getVariablesRecursive(variables);
            return variables;
        },
        enumerable: true,
        configurable: true
    });
    Gate.prototype.getVariablesRecursive = function (variables) {
        for (var _i = 0, _a = this.operands; _i < _a.length; _i++) {
            var operand = _a[_i];
            operand.getVariablesRecursive(variables);
        }
    };
    return Gate;
}());
var Value = /** @class */ (function () {
    function Value(name) {
        this.name = name;
    }
    Value.prototype.evaluate = function (values) {
        return values[this.name];
    };
    Value.prototype.getVariablesRecursive = function (variables) {
        if (!variables.includes(this.name))
            variables.push(this.name);
    };
    return Value;
}());
