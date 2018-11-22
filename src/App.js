import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { makeMissingAnswerProblem } from "./bitwiseMath";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  touch-action: manipulation; // prevent double touch to zoom on mobile
  background-color: ${props => props.isCorrect ? "#e4ffe4" : "none"};
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

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  max-height: 200px;
  margin-top: 2rem;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  max-height: 200px;
  opacity: ${props => (props.shouldShow ? 1 : 0)};
`;

const Button = styled.button.attrs({ type: "button" })`
  height: 40px;
  width: 100%;
  border: none;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.2rem;
  transition: background-color 0.2s;
  cursor: pointer;
  outline: none;
  margin: 0 4px;
  background-color: ${props =>
    props.isActive ? "rgba(0, 0, 0, 0.03)" : "rgba(0, 0, 0, 0.02)"};
  border-color: ${props =>
    props.isActive ? "rgba(0, 0, 0, 0.15)" : "rgba(0, 0, 0, 0.12)"};

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.03);
    border-color: rgba(0, 0, 0, 0.15);
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.3);
`;

const ControlButton = styled(Button)`
  color: rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
  width: 40px;
  font-size: ${props => (props.isIcon ? "1.2rem" : "0.7rem")};
`;

const SuccessButton = styled(Button)`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Prompt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  p {
    color: rgba(0, 0, 0, 0.8);
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AnswerInputs = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const PromptInput = styled.div`
  border: none;
  margin: 0 4px;
  font-size: 2rem;
  width: 2.5rem;
  height: 2.5rem;
  outline: none;
  text-align: center;
  transition: border-color 0.05s, background-color 0.05;
  color: #333;
  background-color: ${props =>
    props.isActive ? "rgba(0, 0, 0, 0.075)" : props.hasAnswer ? "rgba(0, 0, 0, 0.0)" : "rgba(0, 0, 0, 0.02)"};
  border-radius: 0.2rem;
  cursor: pointer;
`;

const Operator = styled.span`
  color: #666;
  font-size: 2rem;
`;

const Operand = styled.span`
  color: #333;
  font-size: 2rem;
  margin: 0 1rem;
`;

const DeepEquality = styled.div`
  color: #bbb;
  font-size: 1.4rem;
  margin: 0 1rem;
`;

const EquationHalf = styled.div`
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
  display: flex;

`;

export default function App() {
  const [problem, setProblem] = useState(makeMissingAnswerProblem());
  const [userAnswer, setUserAnswer] = useState(
    new Array(problem.answer.length).fill("")
  );
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const hasResult = result !== null;

  const userActiveAnswer = activeAnswer || 0;
  const answerOptions = ["1", "0"];

  const handleKeyDown = e => {
    const { key } = e;
    if (key === "Tab" && activeAnswer <= problem.answer.length - 1) {
      e.preventDefault();
    }
  };

  const handleKeyUp = e => {
    const { key, shiftKey } = e;
    if (answerOptions.indexOf(key) !== -1) {
      handleAnswerUpdate(userActiveAnswer, key);
      setActiveAnswer(activeAnswer + 1);
    } else if (key === "Enter") {
      if (hasResult && result === true) {
        handleNext();
      } else {
        handleSubmit();
      }
    } else if (key === "n") {
      handleNext();
    } else if (key === "r") {
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

  function handleSubmit() {
    const isCorrect = userAnswer.join("") === problem.answer.join("");
    setResult(isCorrect);
  }

  function handleNext() {
    const nextProblem = makeMissingAnswerProblem();
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
    return _ => {
      handleAnswerUpdate(userActiveAnswer, answer);
      setActiveAnswer(userActiveAnswer + 1);
      document.activeElement.blur();
    };
  }

  return (
    <AppWrapper isCorrect={hasResult && result}>
      <PracticeProblem>
        <Result shouldShow={hasResult}>
          {result ? <span>&nbsp;</span> : "incorrect"}
        </Result>
        <Prompt>
          <EquationHalf>
            {problem.isBinary && <Operand>{problem.operands[0]}</Operand>}{" "}
            <Operator>{problem.operator}</Operator>
            {problem.isBinary && " "}
            <Operand>{problem.operands[problem.isBinary ? 1 : 0]}</Operand>{" "}
          </EquationHalf>
          <DeepEquality>===</DeepEquality>
          <EquationHalf>
            {problem.answer.map((answer, i) => (
              <PromptInput
                key={`${answer}-${i}`}
                isActive={i === userActiveAnswer}
                hasAnswer={userAnswer[i] !== ""}
                onClick={e => setActiveAnswer(i)}
              >
                {userAnswer[i]}
              </PromptInput>
            ))}
          </EquationHalf>
        </Prompt>
        <Inputs>
          {(!hasResult || !result) && (
            <>
              <AnswerInputs>
                {answerOptions.map(answer => (
                  <Button key={answer} onClick={handleAnswerClick(answer)}>
                    {answer}
                  </Button>
                ))}
              </AnswerInputs>
              <AnswerInputs>
                <SubmitButton onClick={handleSubmit}>Submit ✓</SubmitButton>
                <ControlButton isIcon={true} onClick={handleBackspace}>
                  ⌫
                </ControlButton>
                <ControlButton isIcon={true} onClick={handleResetAnswer}>
                  ↻
                </ControlButton>
                <ControlButton onClick={handleNext}>New</ControlButton>
              </AnswerInputs>
            </>
          )}
          {hasResult && result && (
            <SuccessButton onClick={handleNext} isActive={true}>
              <span role="img" aria-label="Hooray!">🎉</span> Continue
            </SuccessButton>
          )}
        </Inputs>
      </PracticeProblem>
    </AppWrapper>
  );
}
