import {
  makeRandomOperator,
  calculateOutput,
  leftPadString,
  bitOperators
} from "./bitwiseMath";

const operandCeiling = 16;
const bitShiftCeiling = 3;

export function makeMissingOperatorProblem() {
  const { operator, operandCount, isOperatorBitShift } = makeRandomOperator(
    false
  );

  // generate the operands
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

  // generate the answer
  const unPaddedOutput = calculateOutput(operator, operands);
  const answers = findAllCorrectOperators(unPaddedOutput, operands).map(op => [op]);

  // convert operands to base-2
  if (isOperatorBitShift) {
    operands = [operands[0].toString(2), operands[1]];
  } else {
    operands = operands.map(op => op.toString(2));
  }

  // pad elements appropriately so base-2 operands
  // and the answer will be of equal length
  const maxOperandLength = Math.max(
    ...operands.map(operand => operand.toString().length)
  );
  const output = leftPadString(unPaddedOutput, maxOperandLength).split("");
  operands = operands.map(operand =>
    isOperatorBitShift ? operand : leftPadString(operand, maxOperandLength)
  );

  return {
    answers,
    promptLength: 1,
    operands,
    output,
    type: "missingOperator",
    __isOriginalOperatorBitShift: isOperatorBitShift // included just for tests
  };
}

function findAllCorrectOperators(result, operands) {
  return bitOperators.binary.filter(operator => result === calculateOutput(operator, operands));
}
