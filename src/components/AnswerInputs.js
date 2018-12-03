import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackspace,
  faUndo,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

export default function AnswerInputs(props) {
  const {
    answerOptions,
    hasCorrectAnswer,
    shouldShowReset,
    shouldShowHints,
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
          <AnswerInputSection>
            {answerOptions.map((answer, i) => (
              <ButtonWrapper key={answer}>
                <Button onClick={_ => onAnswerClick(answer)}>{answer}</Button>
                {shouldShowHints && <InputHint> {i + 1}</InputHint>}
              </ButtonWrapper>
            ))}
          </AnswerInputSection>
          <InputSection>
            <SubmitButton onClick={onSubmitClick}>
              Submit&nbsp;
              <FontAwesomeIcon icon={faCheck} />
            </SubmitButton>
            {shouldShowReset ? (
              <ControlButton isIcon={true} onClick={onResetClick}>
                <FontAwesomeIcon icon={faUndo} />
              </ControlButton>
            ) : (
              <ControlButton onClick={onNextClick}>New</ControlButton>
            )}
            <ControlButton
              isDisabled={isBackspaceDisabled}
              isIcon={true}
              onClick={onBackspaceClick}
            >
              <FontAwesomeIcon icon={faBackspace} />
            </ControlButton>
          </InputSection>
        </>
      )}
      {hasCorrectAnswer && (
        <SuccessButton onClick={onNextClick} isActive={true}>
          Continue&nbsp;&nbsp;
          <span role="img" aria-label="Hooray!">
            🎉
          </span>
        </SuccessButton>
      )}
    </Inputs>
  );
}

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 40%;
  max-height: 200px;
  min-height: 120px;
  margin-top: 4rem;

  @media (max-width: 500px) {
    width: 90%;
  }
  @media (max-width: 500px) {
    position: absolute;
    bottom: 50px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 4px;

  @media (max-width: 500px) {
    width: auto;
    margin: 4px;
  }
`;

const InputHint = styled.p`
  font-size: 0.5rem;
  color: rgba(0, 0, 0, 0.3);
  margin: 5px 0 0px;
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
  margin-top: 90px;
`;

const InputSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 4px;
`;

const AnswerInputSection = styled(InputSection)`
  min-height: 130px;

  @media (max-width: 500px) {
    flex-wrap: wrap;
  }
`;
