import {
  makeRandomOperator,
  calculateOutput,
  leftPadString
} from "./bitwiseMath";
import { missingComponentOperandCeiling, bitShiftCeiling } from "./constants";

export function makeMissingAnswerProblem() {
  const {
    operator,
    operandCount,
    isOperatorBitShift,
    isBinary
  } = makeRandomOperator();

  // generate the operands
  let operands = [];
  if (!isOperatorBitShift) {
    for (let i = 0; i < operandCount; i++) {
      const base10Random = Math.floor(
        Math.random() * missingComponentOperandCeiling
      );
      operands.push(base10Random);
    }
  } else {
    const base10Random = Math.floor(
      Math.random() * missingComponentOperandCeiling
    );
    operands.push(base10Random);
    operands.push(Math.floor(Math.random() * bitShiftCeiling));
  }

  // generate the answer
  const unPaddedAnswer = calculateOutput(operator, operands);

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
  const answer = leftPadString(unPaddedAnswer, maxOperandLength).split("");
  operands = operands.map(operand =>
    isOperatorBitShift ? operand : leftPadString(operand, maxOperandLength)
  );

  return {
    isBinary,
    operator,
    operands,
    answers: [answer],
    promptLength: answer.length,
    type: "missingAnswer"
  };
}
