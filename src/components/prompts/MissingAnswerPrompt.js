import React from "react";
import styled from "styled-components";
import {
  PromptInput,
  Prompt,
  EquationHalf,
  Operand,
  DeepEquality
} from "./CommonUI";

export default function MissingAnswerPrompt(props) {
  const { userAnswer, userActiveAnswerIndex, problem, onPromptClick } = props;
  const { isBinary, operands, operator, promptLength } = problem;
  const slots = new Array(promptLength).fill("");
  return (
    <Prompt>
      <EquationHalf>
        {isBinary && <Operand>{operands[0]}</Operand>}{" "}
        <Operator>{operator}</Operator>
        {isBinary && " "}
        <Operand>{operands[isBinary ? 1 : 0]}</Operand>{" "}
      </EquationHalf>
      <DeepEquality />
      <EquationHalf>
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
      </EquationHalf>
    </Prompt>
  );
}

const Operator = styled.span`
  color: rgba(0, 0, 0, 0.6);
  font-size: 2rem;
`;
