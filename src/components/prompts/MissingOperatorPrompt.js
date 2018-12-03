import React from "react";
import styled from "styled-components";
import {
  PromptInput,
  Prompt,
  EquationHalf,
  Operand,
  DeepEquality
} from "./CommonUI";

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
      <DeepEquality />
      <EquationHalf>
        <Output>{output}</Output>
      </EquationHalf>
    </Prompt>
  );
}

const Output = styled(Operand)``;
