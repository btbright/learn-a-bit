import { makeMissingOperatorProblem } from "./missingOperatorProblem";

const stringLength = op => op.toString().length;

it("generates a valid, missing operator problem", () => {
  for (let i = 0; i < 20; i++) {
    const { output, operands, answer, type } = makeMissingOperatorProblem();
    const parsedAnswer = answer[0];

    expect(type).toBe("missingOperator");

    // check output was padded appropriately
    const maxOperandLength = Math.max(...operands.map(stringLength));
    if (parsedAnswer !== ">>" && parsedAnswer !== "<<") {
      expect(output.length === maxOperandLength).toBeTruthy();
    } else {
      expect(output.length >= maxOperandLength).toBeTruthy();
    }

    // check operands were padded appropriately
    if (parsedAnswer !== ">>" && parsedAnswer !== "<<" && parsedAnswer !== "~") {
      // should be equal length
      expect(Math.max(...operands.map(stringLength))).toBe(
        Math.min(...operands.map(stringLength))
      );
    }
  }
});
