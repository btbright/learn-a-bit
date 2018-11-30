export const bitOperators = {
  binary: ["&", "|", "^", "<<", ">>"],
  unary: ["~"]
};

export function makeRandomOperator(shouldIncludeUnary = true) {
  const operatorClass = shouldIncludeUnary
    ? Math.random() < bitOperators.unary.length / bitOperators.binary.length
      ? "unary"
      : "binary"
    : "binary";
  const isBinary = operatorClass === "binary";
  const classOperations = bitOperators[operatorClass];
  const operator =
    classOperations[Math.floor(Math.random() * classOperations.length)];
  const operandCount = isBinary ? 2 : 1;
  const isOperatorBitShift = operator === "<<" || operator === ">>";

  return {
    operator,
    operandCount,
    isOperatorBitShift,
    isBinary
  };
}

export function leftPadString(strToPad, desiredLength, padCharacter = "0") {
  const padLength =
    desiredLength > strToPad.length ? desiredLength - strToPad.length : 0;
  const pad = new Array(padLength).fill(padCharacter).join("");
  return `${pad}${strToPad}`;
}

export function calculateOutput(operator, operands) {
  const base10Answer = calculateBase10Output(operator, operands);
  return base10Answer.toString(2);
}

export function calculateBase10Output(operator, operands) {
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

export function bitwiseNotOnesComplement(num) {
  const binaryString = num.toString(2);
  return binaryString
    .split("")
    .map(bit => (bit === "0" ? "1" : "0"))
    .join("");
}
