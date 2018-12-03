import React from "react";
import styled, { css } from "styled-components";

export const Prompt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 29px;

  p {
    color: rgba(0, 0, 0, 0.8);
    font-size: 2rem;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    margin-bottom: 58px;
  }

  ${({ hasLabels }) =>
    hasLabels &&
    css`
      align-items: flex-start;
    `}
`;

export const PromptInput = styled.div`
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

export const Operator = styled.span`
  color: rgba(0, 0, 0, 0.6);
  font-size: 2rem;
`;

export const Operand = styled.span`
  color: rgba(0, 0, 0, 0.8);
  font-size: 2rem;
  margin: 0 1rem;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

export const ConversionOperand = styled(Operand)`
  margin: 0;
`;

const Equality = styled.div`
  color: rgba(0, 0, 0, 0.3);
  font-size: 1.4rem;
  margin: 0 1rem;

  ${({ shouldHaveTopMargin }) =>
    shouldHaveTopMargin &&
    css`
      margin-top: 5px;
    `}
`;

export const DeepEquality = props => <Equality {...props}>===</Equality>;

export const EquationHalf = styled.div`
  display: flex;

  ${({ hasLabels }) =>
    hasLabels &&
    css`
      flex-direction: column;
      align-items: center;
    `}

  @media (max-width: 500px) {
    margin: 1rem 0;
  }
`;

export const Label = styled.small`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.2);
  margin-top: 14px;
`;

export const AnswerSlots = styled.div`
  display: flex;
`;
