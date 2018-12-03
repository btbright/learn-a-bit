import React from "react";
import styled from "styled-components";

export default function ConvertToBase10Prompt(props) {
  const { userAnswer, userActiveAnswerIndex, problem, onPromptClick } = props;
  const { base2, promptLength } = problem;
  const slots = new Array(promptLength).fill("");
  return (
    <Prompt>
      <EquationHalf>
        <Operand>{base2}</Operand>
        <Label>base 2</Label>
      </EquationHalf>
      <DeepEquality>===</DeepEquality>
      <EquationHalf>
        <AnswerSlots>
          {slots.map((_, i) => (
            <PromptInput
              key={i}
              isActive={i === userActiveAnswerIndex}
              hasAnswer={userAnswer[i] !== ""}
              onClick={_ => onPromptClick(i)}
            >
              {userAnswer[i]}
            </PromptInput>
          ))}
        </AnswerSlots>
        <Label>base 10</Label>
      </EquationHalf>
    </Prompt>
  );
}

const Prompt = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  p {
    color: rgba(0, 0, 0, 0.8);
    font-size: 2rem;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
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
  margin: 0;
`;

const DeepEquality = styled.div`
  color: rgba(0, 0, 0, 0.3);
  font-size: 1.4rem;
  margin: 6px 1rem 0;

  @media (max-width: 500px) {
    margin: 0 1rem 0;
  }
`;

const EquationHalf = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 500px) {
    margin: 1rem 0;
  }
`;

const Label = styled.small`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.2);
  margin-top: 14px;
`;

const AnswerSlots = styled.div`
  display: flex;
`;
