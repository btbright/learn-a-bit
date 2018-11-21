
const bitOperations = {
    binary: ["&", "|", "^", "<<", ">>"],
    unary: ["~"]
  };
  
  const operandCeiling = 16;
  
  export function makeMissingAnswerProblem() {
    const operatorClass =
      Math.random() < bitOperations.unary.length / bitOperations.binary.length
        ? "unary"
        : "binary";
    const isBinary = operatorClass === "binary";
    const classOperations = bitOperations[operatorClass];
    const operator =
      classOperations[Math.floor(Math.random() * classOperations.length)];
    const operandCount = isBinary ? 2 : 1;
    let operands = [];
    for (let i = 0; i < operandCount; i++) {
      const base10Random = Math.floor(Math.random() * operandCeiling);
      operands.push(base10Random);
    }
    const answer = calculateAnswer(operator, operands);
    operands = operands.map(op => op.toString(2));
    const maxOperandLength = Math.max(...operands.map(operand => operand.length));
  
    const paddedOperands = operands.map(operand => {
      const padLength = maxOperandLength - operand.length;
      const pad = new Array(padLength).fill("0").join("");
      return `${pad}${operand}`;
    });
  
    return {
      isBinary,
      operator,
      operands: paddedOperands,
      answer
    };
  }
  
  function calculateAnswer(operator, operands) {
    const base10Answer = calculateBase10Answer(operator, operands);
    return base10Answer.toString(2).split("");
  }
  
  function calculateBase10Answer(operator, operands) {
    switch (operator) {
      case "&":
        return operands[0] & operands[1];
      case "|":
        return operands[0] | operands[1];
      case "^":
        return operands[0] ^ operands[1];
      case "~":
        // javascript uses 32 bit signed ints in two's complement format
        // which returns a different result for bitwise not. one's complement
        // is easier to learn
        return bitwiseNotOnesComplement(operands[0]);
      case "<<":
        return operands[0] << operands[1];
      case ">>":
        return operands[0] >> operands[1];
      default:
        return;
    }
  }

  
  function bitwiseNotOnesComplement(num) {
    const binaryString = num.toString(2);
    return binaryString
      .split("")
      .map(bit => (bit === "0" ? "1" : "0"))
      .join("");
  }