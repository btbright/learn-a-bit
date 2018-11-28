import {
  bitwiseNotOnesComplement,
  calculateBase10Answer,
  makeRandomOperator,
  makeMissingAnswerProblem
} from "./bitwiseMath";

it("calculates bitwise NOT - ones complement", () => {
  const testCases = [
    ["1", "0"],
    ["0", "1"],
    ["01", "10"],
    ["10", "01"],
    ["11", "00"],
    ["110011010", "001100101"]
  ];
  testCases.forEach(test =>
    expect(bitwiseNotOnesComplement(test[0])).toBe(test[1])
  );
});

it("calculates a base10 answer", () => {
  const testCases = [
    ["&", [2, 3], 2],
    ["&", [2, 1], 0],
    ["&", [3, 3], 3],
    ["&", [2, 7], 2],
    ["^", [2, 7], 5],
    ["^", [2, 1], 3],
    ["^", [100, 42], 78],
    ["|", [2, 4], 6],
    ["<<", [2, 4], 32],
    ["<<", [2, 1], 4],
    [">>", [2, 1], 1],
    [">>", [4, 2], 1]
  ];
  testCases.forEach(test =>
    expect(calculateBase10Answer(test[0], test[1])).toBe(test[2])
  );
});

it("chooses a valid, random operator and returns metadata", () => {
  for (let i = 0; i < 10; i++) {
    const { operator, operandCount, isOperatorBitShift } = makeRandomOperator();

    expect(["&", "|", "^", "<<", ">>", "~"].indexOf(operator) !== -1).toBe(
      true
    );
    expect(operandCount).toBe(operator === "~" ? 1 : 2);
    expect(isOperatorBitShift).toBe(operator === ">>" || operator === "<<");
  }
});

const stringLength = op => op.toString().length;

it("generates a valid, missing answer problem", () => {
  for (let i = 0; i < 20; i++) {
    const { isBinary, operator, operands, answer } = makeMissingAnswerProblem();

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
      console.log(operands, operator)
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
