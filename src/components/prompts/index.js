import MissingOperatorPrompt from "./MissingOperatorPrompt";
import MissingAnswerPrompt from "./MissingAnswerPrompt";
import ConvertToBase10Prompt from "./ConvertToBase10Prompt";
import ConvertToBase2Prompt from "./ConvertToBase2Prompt";

const promptForType = {
  missingAnswer: MissingAnswerPrompt,
  missingOperator: MissingOperatorPrompt,
  convertToBase10: ConvertToBase10Prompt,
  convertToBase2: ConvertToBase2Prompt
};

export const getPromptForType = promptType => promptForType[promptType];
