import React from "react";
import styled from "styled-components";

export default function AnswerInputs(props) {
  const {
    answerOptions,
    hasCorrectAnswer,
    shouldShowReset,
    isBackspaceDisabled
  } = props;

  const {
    onAnswerClick,
    onSubmitClick,
    onResetClick,
    onNextClick,
    onBackspaceClick
  } = props;

  return (
    <Inputs>
      {!hasCorrectAnswer && (
        <>
          <InputSection>
            {answerOptions.map(answer => (
              <Button key={answer} onClick={_ => onAnswerClick(answer)}>
                {answer}
              </Button>
            ))}
          </InputSection>
          <InputSection>
            <SubmitButton onClick={onSubmitClick}>Submit ✓</SubmitButton>
            {shouldShowReset ? (
              <ControlButton isIcon={true} onClick={onResetClick}>
                ↻
              </ControlButton>
            ) : (
              <ControlButton onClick={onNextClick}>New</ControlButton>
            )}
            <ControlButton
              isDisabled={isBackspaceDisabled}
              isIcon={true}
              onClick={onBackspaceClick}
            >
              ⌫
            </ControlButton>
          </InputSection>
        </>
      )}
      {hasCorrectAnswer && (
        <SuccessButton onClick={onNextClick} isActive={true}>
          <span role="img" aria-label="Hooray!">
            🎉
          </span>{" "}
          Continue
        </SuccessButton>
      )}
    </Inputs>
  );
}


const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  max-height: 200px;
  min-height: 120px;
  margin-top: 2rem;
`;

const Button = styled.button.attrs({ type: "button" })`
  height: 40px;
  width: 100%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
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
  opacity: ${props => (props.isDisabled ? 0.2 : 1)};
  font-size: ${props => (props.isIcon ? "1.2rem" : "0.7rem")};
`;

const SuccessButton = styled(Button)`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;