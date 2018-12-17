import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import ExternalResources from "./components/ExternalResources";
import AnswerInputs from "./components/AnswerInputs";
import { getPromptForType } from "./components/prompts";
import {
  makeRandomProblem,
  getAnswerOptionsForType,
  getShouldShowInputHintsForType
} from "./logic";

export default function App() {
  // setup problem state
  const [problem, setProblem] = useState(makeRandomProblem());
  const answerOptions = getAnswerOptionsForType(problem.type);

  // setup user answer state
  const [userAnswer, setUserAnswer] = useState(
    new Array(problem.promptLength).fill("")
  );
  const hasPartialAnswer = userAnswer.findIndex(answer => answer !== "") !== -1;
  const hasCompleteAnswer =
    userAnswer.findIndex(answer => answer === "") === -1;

  // setup active answer slot state
  const [activeAnswer, setActiveAnswer] = useState(null);
  const userActiveAnswerIndex = activeAnswer || 0;

  // setup results state
  const [isResultCorrect, setIsResultCorrect] = useState(null);
  const hasResult = isResultCorrect !== null;

  // setup event handlers
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
      if (hasResult && isResultCorrect === true) {
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
      !isResultCorrect &&
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
    setIsResultCorrect(isCorrect);
  }

  function handleNext() {
    const nextProblem = makeRandomProblem();
    setProblem(nextProblem);
    setUserAnswer(new Array(nextProblem.promptLength).fill(""));
    setIsResultCorrect(null);
    setActiveAnswer(0);
    document.activeElement.blur();
  }

  function handleResetAnswer() {
    setUserAnswer(new Array(problem.promptLength).fill(""));
    setActiveAnswer(0);
    setIsResultCorrect(null);
    document.activeElement.blur();
  }

  function resetAnswerValue(key) {
    const newUserAnswer = new Array(problem.promptLength).fill("");
    newUserAnswer[0] = key;
    setUserAnswer(newUserAnswer);
    setActiveAnswer(1);
    setIsResultCorrect(null);
  }

  function handleAnswerUpdate(i, answer) {
    setIsResultCorrect(null);
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
      !isResultCorrect &&
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

  // prepare for rendering

  const Prompt = getPromptForType(problem.type);

  const promptProps = {
    problem,
    userActiveAnswerIndex,
    userAnswer
  };

  const inputsProps = {
    answerOptions,
    hasCorrectAnswer: hasResult && isResultCorrect,
    shouldShowReset: hasPartialAnswer,
    shouldShowHints: getShouldShowInputHintsForType(problem.type),
    isBackspaceDisabled: userActiveAnswerIndex === 0
  };

  return (
    <AppWrapper hasResult={hasResult} isCorrect={hasResult && isResultCorrect}>
      <Logo>learn a bit</Logo>
      <ExternalResources />
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

const Logo = styled.h1`
  font-family: "Chakra Petch", sans-serif;
  text-align: center;
  position: absolute;
  margin: 0 auto;
  top: 70px;
  letter-spacing: 0.1rem;
  color: #333;
  font-size: 2.5rem;

  @media (max-width: 500px), (max-height: 750px) {
    top: 7px;
    left: 10px;
    font-size: 1.5rem;
    letter-spacing: 0.05rem;
  }
`;

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
