import { makeMissingAnswerProblem } from "./missingAnswerProblem";

const stringLength = op => op.toString().length;

it("generates a valid, missing answer problem", () => {
  for (let i = 0; i < 20; i++) {
    const { isBinary, operator, operands, answers, promptLength, type } = makeMissingAnswerProblem();
    const answer = answers[0];

    expect(type).toBe("missingAnswer");

    expect(typeof promptLength).toBe("number");

    // make sure there are the right number of operands
    expect(isBinary).toBe(operands.length === 2);

    // check answer was padded appropriately
    const maxOperandLength = Math.max(...operands.map(stringLength));
    if (operator !== ">>" && operator !== "<<") {
      expect(answer.length === maxOperandLength).toBeTruthy();
    } else {
      expect(answer.length >= maxOperandLength).toBeTruthy();
    }

    // check operands were padded appropriately
    if (operator !== ">>" && operator !== "<<" && operator !== "~") {
      // should be equal length
      expect(Math.max(...operands.map(stringLength))).toBe(
        Math.min(...operands.map(stringLength))
      );
    } else if (operator !== "~") {
      // is a small base-10 number
      expect(operands[1].toString().length).toBe(1);
    }
  }
});
