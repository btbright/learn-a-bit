import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import MissingOperatorPrompt from "./components/MissingOperatorPrompt";
import MissingAnswerPrompt from "./components/MissingAnswerPrompt";
import AnswerInputs from "./components/AnswerInputs";
import { makeMissingOperatorProblem } from "./logic/missingOperatorProblem";
import { makeMissingAnswerProblem } from "./logic/missingAnswerProblem";
import { bitOperators} from "./logic/bitwiseMath";

function makeProblem() {
  return Math.random() > 0.5 ? makeMissingOperatorProblem() : makeMissingAnswerProblem();
}

export default function App() {
  const [problem, setProblem] = useState(makeProblem());
  const [userAnswer, setUserAnswer] = useState(
    new Array(problem.answer.length).fill("")
  );
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const hasResult = result !== null;

  const userActiveAnswerIndex = activeAnswer || 0;

  const answerOptions = problem.type === "missingAnswer" ? ["1", "0"] : bitOperators.binary;

  const hasPartialAnswer = userAnswer.findIndex(answer => answer !== "") !== -1;
  const hasCompleteAnswer =
    userAnswer.findIndex(answer => answer === "") === -1;

  const handleKeyDown = e => {
    const { key } = e;
    if (key === "Tab" && activeAnswer <= problem.answer.length - 1) {
      e.preventDefault();
    }
  };

  const handleKeyUp = e => {
    const { key, shiftKey } = e;
    if (answerOptions.indexOf(key) !== -1) {
      handleAnswerUpdate(userActiveAnswerIndex, key);
      if (!hasCompleteAnswer) {
        setActiveAnswer(activeAnswer + 1);
      }
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
    } else if (/^\d{1}$/.test(key)){
      const answerIndex = parseInt(key, 10) - 1;
      if (answerIndex > answerOptions.length - 1) return;
      handleAnswerUpdate(userActiveAnswerIndex, answerOptions[answerIndex]);
      if (!hasCompleteAnswer) {
        setActiveAnswer(activeAnswer + 1);
      }
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

  function handleSubmit() {
    const isCorrect = userAnswer.join("") === problem.answer.join("");
    setResult(isCorrect);
  }

  function handleNext() {
    const nextProblem = makeProblem();
    setProblem(nextProblem);
    setUserAnswer(new Array(nextProblem.answer.length).fill(""));
    setResult(null);
    setActiveAnswer(0);
    document.activeElement.blur();
  }

  function handleResetAnswer() {
    setUserAnswer(new Array(problem.answer.length).fill(""));
    setActiveAnswer(0);
    setResult(null);
    document.activeElement.blur();
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
    handleAnswerUpdate(userActiveAnswerIndex, answer);
    if (!hasCompleteAnswer) {
      setActiveAnswer(userActiveAnswerIndex + 1);
    }
    document.activeElement.blur();
  }

  const Prompt = problem.type === "missingAnswer" ? MissingAnswerPrompt : MissingOperatorPrompt;

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
    background-color: white;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  touch-action: manipulation; // prevent double touch to zoom on mobile
  background-color: ${props =>
    props.isCorrect
      ? "#e4ffe4"
      : "none"};
  transition: background-color 0.15s;

  ${({ hasResult, isCorrect }) =>
    hasResult &&
    !isCorrect &&
    css`animation: ${flashRed} 1s linear;`}
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