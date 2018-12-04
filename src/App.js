import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import MissingOperatorPrompt from "./components/prompts/MissingOperatorPrompt";
import MissingAnswerPrompt from "./components/prompts/MissingAnswerPrompt";
import ConvertToBase10Prompt from "./components/prompts/ConvertToBase10Prompt";
import ConvertToBase2Prompt from "./components/prompts/ConvertToBase2Prompt";
import AnswerInputs from "./components/AnswerInputs";
import { makeMissingOperatorProblem } from "./logic/missingOperatorProblem";
import { makeMissingAnswerProblem } from "./logic/missingAnswerProblem";
import {
  makeConvertToBase10Problem,
  makeConvertToBase2Problem
} from "./logic/conversionProblem";
import { bitOperators } from "./logic/bitwiseMath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faTwitter
} from "@fortawesome/fontawesome-free-brands"

const problemGenerators = [
  makeMissingAnswerProblem,
  makeMissingOperatorProblem,
  makeConvertToBase10Problem,
  makeConvertToBase2Problem
];

function makeProblem() {
  const randomIndex = Math.floor(Math.random() * problemGenerators.length);
  return problemGenerators[randomIndex]();
}

const answerOptionsForType = {
  missingAnswer: ["1", "0"],
  missingOperator: bitOperators.binary,
  convertToBase10: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  convertToBase2: ["1", "0"]
};

const promptForType = {
  missingAnswer: MissingAnswerPrompt,
  missingOperator: MissingOperatorPrompt,
  convertToBase10: ConvertToBase10Prompt,
  convertToBase2: ConvertToBase2Prompt
};

export default function App() {
  const [problem, setProblem] = useState(makeProblem());

  const [userAnswer, setUserAnswer] = useState(
    new Array(problem.promptLength).fill("")
  );

  const [activeAnswer, setActiveAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const hasResult = result !== null;

  const userActiveAnswerIndex = activeAnswer || 0;

  const answerOptions = answerOptionsForType[problem.type];

  const hasPartialAnswer = userAnswer.findIndex(answer => answer !== "") !== -1;
  const hasCompleteAnswer =
    userAnswer.findIndex(answer => answer === "") === -1;

  const handleKeyDown = e => {
    const { key } = e;
    if (key === "Tab" && activeAnswer <= problem.promptLength - 1) {
      e.preventDefault();
    }
  };

  const handleKeyUp = e => {
    const { key, shiftKey } = e;
    if (answerOptions.indexOf(key) !== -1) {
      handleKeyboardAnswerUpdate(key);
    } else if (/^\d{1}$/.test(key)) {
      const answerIndex = parseInt(key, 10) - 1;
      if (answerIndex > answerOptions.length - 1) return;
      handleKeyboardAnswerUpdate(answerOptions[answerIndex]);
    } else if (key === "Enter") {
      if (hasResult && result === true) {
        handleNext();
      } else {
        handleSubmit();
      }
    } else if (key === "n") {
      handleNext();
    } else if (key === "r" || key === "c") {
      handleResetAnswer();
    } else if (key === "Tab") {
      setActiveAnswer(activeAnswer + (shiftKey ? -1 : 1));
      e.preventDefault();
    } else if (key === "Backspace") {
      handleBackspace();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp, true);
    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keyup", handleKeyUp, true);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  });

  function handleKeyboardAnswerUpdate(key) {
    if (
      hasResult &&
      !result &&
      hasCompleteAnswer &&
      userActiveAnswerIndex === problem.promptLength
    ) {
      resetAnswerValue(key);
      return;
    }

    handleAnswerUpdate(userActiveAnswerIndex, key);
    if (!hasCompleteAnswer) {
      setActiveAnswer(activeAnswer + 1);
    }
  }

  function handleSubmit() {
    const isCorrect = !!problem.answers.find(
      answer => userAnswer.join("") === answer.join("")
    );
    setResult(isCorrect);
  }

  function handleNext() {
    const nextProblem = makeProblem();
    setProblem(nextProblem);
    setUserAnswer(new Array(nextProblem.promptLength).fill(""));
    setResult(null);
    setActiveAnswer(0);
    document.activeElement.blur();
  }

  function handleResetAnswer() {
    setUserAnswer(new Array(problem.promptLength).fill(""));
    setActiveAnswer(0);
    setResult(null);
    document.activeElement.blur();
  }

  function resetAnswerValue(key) {
    const newUserAnswer = new Array(problem.promptLength).fill("");
    newUserAnswer[0] = key;
    setUserAnswer(newUserAnswer);
    setActiveAnswer(1);
    setResult(null);
  }

  function handleAnswerUpdate(i, answer) {
    setResult(null);
    if (i > userAnswer.length - 1) return;
    const currentAnswerCopy = userAnswer.slice(0);
    currentAnswerCopy[i] = answer;
    setUserAnswer(currentAnswerCopy);
    document.activeElement.blur();
  }

  function handleBackspace() {
    if (activeAnswer === 0) return;
    const currentAnswerCopy = userAnswer.slice(0);
    currentAnswerCopy[activeAnswer - 1] = "";
    setUserAnswer(currentAnswerCopy);
    setActiveAnswer(activeAnswer - 1);
  }

  function handleAnswerClick(answer) {
    if (
      hasResult &&
      !result &&
      hasCompleteAnswer &&
      userActiveAnswerIndex === problem.promptLength
    ) {
      resetAnswerValue(answer);
      return;
    }
    handleAnswerUpdate(userActiveAnswerIndex, answer);
    if (!hasCompleteAnswer) {
      setActiveAnswer(userActiveAnswerIndex + 1);
    }
    document.activeElement.blur();
  }

  const Prompt = promptForType[problem.type];

  const promptProps = {
    problem,
    userActiveAnswerIndex,
    userAnswer
  };

  const inputsProps = {
    answerOptions,
    hasCorrectAnswer: hasResult && result,
    shouldShowReset: hasPartialAnswer,
    shouldShowHints: problem.type === "missingOperator",
    isBackspaceDisabled: userActiveAnswerIndex === 0
  };

  return (
    <AppWrapper hasResult={hasResult} isCorrect={hasResult && result}>
      <Resources>
        <a href="https://github.com/btbright/learn-a-bit/blob/master/README.md" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </a>
        <a href="https://github.com/btbright/learn-a-bit" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://twitter.com/btbright" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </Resources>
      <PracticeProblem>
        <Prompt onPromptClick={setActiveAnswer} {...promptProps} />
        <AnswerInputs
          onAnswerClick={handleAnswerClick}
          onSubmitClick={handleSubmit}
          onResetClick={handleResetAnswer}
          onNextClick={handleNext}
          onBackspaceClick={handleBackspace}
          {...inputsProps}
        />
      </PracticeProblem>
    </AppWrapper>
  );
}

const flashRed = keyframes`
  from {
    background-color: rgba(150,0,0,0.2);
  }

  to {
    background-color: #fff;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  touch-action: manipulation; // prevent double touch to zoom on mobile
  background-color: ${props => (props.isCorrect ? "#e4ffe4" : "none")};
  transition: background-color 0.15s;

  ${({ hasResult, isCorrect }) =>
    hasResult &&
    !isCorrect &&
    css`
      animation: ${flashRed} 1s linear;
    `}
`;

const PracticeProblem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1.5rem 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 600px;
  min-height: 400px;
  border-radius: 10px;
`;

const Resources = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;

  a {
    font-size: 1.35rem;
    color: rgba(0,0,0,0.1);
    margin: 0 3px;
  }
`;