import React from "react";
import {
  PromptInput,
  Prompt,
  EquationHalf,
  ConversionOperand,
  DeepEquality,
  Label,
  AnswerSlots
} from "./CommonUI";

export default function ConvertToBase10Prompt(props) {
  const { userAnswer, userActiveAnswerIndex, problem, onPromptClick } = props;
  const { base2, promptLength } = problem;
  const slots = new Array(promptLength).fill("");
  return (
    <Prompt hasLabels={true}>
      <EquationHalf hasLabels={true}>
        <ConversionOperand>{base2}</ConversionOperand>
        <Label>base 2</Label>
      </EquationHalf>
      <DeepEquality shouldHaveTopMargin={true} />
      <EquationHalf hasLabels={true}>
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
