import { makeMissingOperatorProblem } from "./missingOperatorProblem";
import { makeMissingAnswerProblem } from "./missingAnswerProblem";
import {
  makeConvertToBase10Problem,
  makeConvertToBase2Problem
} from "./conversionProblem";
import { bitOperators } from "./constants";

const problemGenerators = [
  makeMissingAnswerProblem,
  makeMissingOperatorProblem,
  makeConvertToBase10Problem,
  makeConvertToBase2Problem
];

export const makeRandomProblem = _ => {
  const randomIndex = Math.floor(Math.random() * problemGenerators.length);
  return problemGenerators[randomIndex]();
};

const answerOptionsForType = {
  missingAnswer: ["1", "0"],
  missingOperator: bitOperators.binary,
  convertToBase10: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  convertToBase2: ["1", "0"]
};

export const getAnswerOptionsForType = type => answerOptionsForType[type];

const answerInputsTypesWithHints = ["missingOperator"];

export const getShouldShowInputHintsForType = type =>
  answerInputsTypesWithHints.indexOf(type) !== -1;
