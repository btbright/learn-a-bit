import { makeMissingOperatorProblem } from "./missingOperatorProblem";

const stringLength = op => op.toString().length;

it("generates a valid, missing operator problem", () => {
  for (let i = 0; i < 20; i++) {
    const {
      output,
      operands,
      answers,
      promptLength,
      type,
      __isOriginalOperatorBitShift
    } = makeMissingOperatorProblem();
    const parsedAnswers = answers.map(answer => answer[0]);

    expect(type).toBe("missingOperator");

    expect(typeof promptLength).toBe("number");

    // check output was padded appropriately
    const maxOperandLength = Math.max(...operands.map(stringLength));
    parsedAnswers.forEach(parsedAnswer => {
      if (parsedAnswer !== ">>" && parsedAnswer !== "<<") {
        expect(output.length === maxOperandLength).toBeTruthy();
      } else {
        expect(output.length >= maxOperandLength).toBeTruthy();
      }

      // check operands were padded appropriately
      if (parsedAnswer !== "~" && !__isOriginalOperatorBitShift) {
        // should be equal length
        expect(Math.max(...operands.map(stringLength))).toBe(
          Math.min(...operands.map(stringLength))
        );
      }
    });
  }
});
