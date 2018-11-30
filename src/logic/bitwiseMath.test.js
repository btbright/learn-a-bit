import {
  bitwiseNotOnesComplement,
  calculateBase10Output,
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
    expect(calculateBase10Output(test[0], test[1])).toBe(test[2])
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
