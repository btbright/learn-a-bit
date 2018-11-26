const bitOperations = {
  binary: ["&", "|", "^", "<<", ">>"],
  unary: ["~"]
};

const operandCeiling = 16;
const bitShiftCeiling = 4;

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
  const isOperatorBitShift = operator === "<<" || operator === ">>";
  let operands = [];
  if (!isOperatorBitShift) {
    for (let i = 0; i < operandCount; i++) {
      const base10Random = Math.floor(Math.random() * operandCeiling);
      operands.push(base10Random);
    }
  } else {
    const base10Random = Math.floor(Math.random() * operandCeiling);
    operands.push(base10Random);
    operands.push(Math.floor(Math.random() * bitShiftCeiling));
  }

  const answer = calculateAnswer(operator, operands);
  if (isOperatorBitShift) {
    operands = [operands[0].toString(2), operands[1]];
  } else {
    operands = operands.map(op => op.toString(2));
  }

  const maxOperandLength = Math.max(...operands.map(operand => operand.toString().length));

  if (isOperatorBitShift) {
    return {
      isBinary,
      operator,
      operands,
      answer: leftPadString(answer, maxOperandLength).split("")
    };
  }

  const paddedOperands = operands.map(operand => leftPadString(operand, maxOperandLength))

  return {
    isBinary,
    operator,
    operands: paddedOperands,
    answer: leftPadString(answer, maxOperandLength).split("")
  };
}

function leftPadString(strToPad, desiredLength, padCharacter = "0") {
  const padLength = desiredLength > strToPad.length ? desiredLength - strToPad.length : 0;
  const pad = new Array(padLength).fill(padCharacter).join("");
  return `${pad}${strToPad}`;
}

function calculateAnswer(operator, operands) {
  const base10Answer = calculateBase10Answer(operator, operands);
  return base10Answer.toString(2);
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
