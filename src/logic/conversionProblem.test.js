import {
  makeConvertToBase10Problem,
  makeConvertToBase2Problem
} from "./conversionProblem";

it("generates a valid convert to base10 problem", () => {
  for (let i = 0; i < 20; i++) {
    const { base2, answer, type } = makeConvertToBase10Problem();

    // correct type
    expect(type).toBe("convertToBase10");

    // generates correct test numbers
    expect(/^[01]+$/.test(base2)).toBeTruthy();
    expect(/^[0-9]+$/.test(answer.join(""))).toBeTruthy();

    // numbers are equivalent
    expect(parseInt(base2, 2)).toBe(parseInt(answer.join(""), 10));
  }
});

it("generates a valid convert to base2 problem", () => {
  for (let i = 0; i < 20; i++) {
    const { base10, answer, type } = makeConvertToBase2Problem();

    // correct type
    expect(type).toBe("convertToBase2");

    // generates correct test numbers
    expect(/^[0-9]+$/.test(base10)).toBeTruthy();
    expect(/^[01]+$/.test(answer.join(""))).toBeTruthy();

    // numbers are equivalent
    expect(parseInt(base10, 10)).toBe(parseInt(answer.join(""), 2));
  }
});
