import React from "react";
import styled from "styled-components";

export default function MissingOperatorPrompt(props) {
  const { userAnswer, userActiveAnswerIndex, problem, onPromptClick } = props;
  const { operands, output } = problem;
  return (
    <Prompt>
      <EquationHalf>
        <Operand>{operands[0]}</Operand>{" "}
        <PromptInput
            isActive={0 === userActiveAnswerIndex}
            hasAnswer={userAnswer[0] !== ""}
            onClick={_ => onPromptClick(0)}
          >
            {userAnswer[0]}
          </PromptInput>
        <Operand>{operands[1]}</Operand>{" "}
      </EquationHalf>
      <DeepEquality>===</DeepEquality>
      <EquationHalf>
        <Output>{output}</Output>
      </EquationHalf>
    </Prompt>
  );
}

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

const PromptInput = styled.div`
  border: none;
  margin: 0 4px;
  font-size: 2rem;
  width: 2.5rem;
  height: 2.5rem;
  outline: none;
  text-align: center;
  transition: border-color 0.05s, background-color 0.05;
  color: rgba(0, 0, 0, 0.8);
  background-color: ${props =>
    props.isActive
      ? "rgba(0, 0, 0, 0.075)"
      : props.hasAnswer
      ? "rgba(0, 0, 0, 0.0)"
      : "rgba(0, 0, 0, 0.02)"};
  border-radius: 0.2rem;
  cursor: pointer;
`;

const Operand = styled.span`
  color: rgba(0, 0, 0, 0.8);
  font-size: 2rem;
  margin: 0 1rem;
`;

const Output = styled(Operand)``;

const DeepEquality = styled.div`
  color: rgba(0, 0, 0, 0.3);
  font-size: 1.4rem;
  margin: 0 1rem;
`;

const EquationHalf = styled.div`
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
  display: flex;
`;
