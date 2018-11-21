import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { makeMissingAnswerProblem } from "./bitwiseMath";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PracticeProblem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 1.5rem 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 600px;
  min-height: 400px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  max-height: 200px;
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
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.2rem;
  transition: background-color 0.2s;
  cursor: pointer;
  outline: none;
  margin: 0 4px;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.03);
    border-color: rgba(0, 0, 0, 0.15);
  }
`;

const SubmitButton = styled(Button)`
  color: #12b712;
  width: 100%;
`;

const BackspaceButton = styled(Button)`
  color: rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
  width: 40px;
`;

const Prompt = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  p {
    color: rgba(0, 0, 0, 0.8);
    font-size: 2rem;
  }
`;

const AnswerInputs = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const PromptInput = styled.input`
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  margin: 0 4px;
  font-size: 2rem;
  width: 2rem;
  outline: none;
  text-align: center;
  transition: border-color 0.05s;
  color: #333;

  &:focus {
    border-color: rgba(0, 0, 0, 0.55);
  }
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

const DeepEquality = styled.span`
  color: #bbb;
  font-size: 1.4rem;
  margin: 0 1rem;
`;

export default function App() {
  const [problem, setProblem] = useState(makeMissingAnswerProblem());
  const [userAnswer, setUserAnswer] = useState(
    new Array(problem.answer.length).fill("")
  );
  const [result, setResult] = useState(null);
  const hasResult = result !== null;
  const userAnswerFieldRefs = userAnswer.map(_ => useRef(null));
  const submitAnswerButtonRef = useRef(null);
  console.log(problem, userAnswer);

  const firstEmptyAnswerIndex = userAnswer.findIndex(answer => answer === "");

  useEffect(() => {
    if (hasResult) return;
    if (firstEmptyAnswerIndex !== -1) return;
    submitAnswerButtonRef &&
      submitAnswerButtonRef.current &&
      submitAnswerButtonRef.current.focus();
  }, [firstEmptyAnswerIndex, submitAnswerButtonRef]);

  useEffect(() => {
    if (hasResult) return;
    if (firstEmptyAnswerIndex === -1) return;
    userAnswerFieldRefs[firstEmptyAnswerIndex].current.focus();
  }, [firstEmptyAnswerIndex, userAnswerFieldRefs]);

  function handleSubmit() {
    const isCorrect = userAnswer.join("") === problem.answer.join("");
    setResult(isCorrect);
  }

  function handleNext() {
    const nextProblem = makeMissingAnswerProblem();
    setProblem(nextProblem);
    setUserAnswer(new Array(nextProblem.answer.length).fill(""));
    setResult(null);
  }

  function handleResetAnswer() {
    setUserAnswer(new Array(problem.answer.length).fill(""));
  }

  function handleAnswerUpdate(i, currentAnswer) {
    return e => {
      const currentAnswerCopy = currentAnswer.slice(0);
      currentAnswerCopy[i] = e.target.value;
      setUserAnswer(currentAnswerCopy);
    };
  }

  return (
    <AppWrapper>
      <PracticeProblem>
        <Result shouldShow={hasResult}>
          {result ? "correct" : "incorrect"}
        </Result>
        <Prompt>
          {problem.isBinary && <Operand>{problem.operands[0]}</Operand>}{" "}
          <Operator>{problem.operator}</Operator>
          {problem.isBinary && " "}
          <Operand>{problem.operands[problem.isBinary ? 1 : 0]}</Operand>{" "}
          <DeepEquality>===</DeepEquality>
          {problem.answer.map((answer, i) => (
            <PromptInput
              ref={userAnswerFieldRefs[i]}
              key={`${answer}-${i}`}
              onChange={handleAnswerUpdate(i, userAnswer, setUserAnswer)}
              value={userAnswer[i]}
            />
          ))}
        </Prompt>
        <Inputs>
          {(!hasResult || !result) && (
            <>
              <AnswerInputs>
                <Button>0</Button>
                <Button>1</Button>
              </AnswerInputs>
              <AnswerInputs>
                <SubmitButton
                  onClick={handleSubmit}
                  ref={submitAnswerButtonRef}
                >
                  ✓
                </SubmitButton>
                <BackspaceButton>⌫</BackspaceButton>
                <BackspaceButton onClick={handleResetAnswer}>↻</BackspaceButton>
              </AnswerInputs>
            </>
          )}
          {hasResult && result && <Button onClick={handleNext}>Next</Button>}
        </Inputs>
      </PracticeProblem>
    </AppWrapper>
  );
}
