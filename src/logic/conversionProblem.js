import { conversionNumberCeiling } from "./constants"

export function makeConvertToBase10Problem() {
    const answerNumber = Math.floor(Math.random() * conversionNumberCeiling);
    const base2 = answerNumber.toString(2);
    const answer = answerNumber.toString().split("")

    return {
        base2,
        answers: [answer],
        promptLength: answer.length,
        type: "convertToBase10"
    }
}
export function makeConvertToBase2Problem() {
    const base10 = Math.floor(Math.random() * conversionNumberCeiling);
    const answer = base10.toString(2).split("");

    return {
        base10: base10.toString(),
        answers: [answer],
        promptLength: answer.length,
        type: "convertToBase2"
    }
}