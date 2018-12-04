import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTwitter } from "@fortawesome/fontawesome-free-brands";

export default () => (
  <Resources>
    <a
      href="https://github.com/btbright/learn-a-bit/blob/master/README.md"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faQuestionCircle} />
    </a>
    <a
      href="https://github.com/btbright/learn-a-bit"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faGithub} />
    </a>
    <a
      href="https://twitter.com/btbright"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faTwitter} />
    </a>
  </Resources>
);

const Resources = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;

  a {
    font-size: 1.35rem;
    color: rgba(0, 0, 0, 0.1);
    margin: 0 3px;
  }
`;
