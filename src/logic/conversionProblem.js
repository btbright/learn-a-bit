
const numberCeiling = 16;

export function makeConvertToBase10Problem() {
    const answerNumber = Math.floor(Math.random() * numberCeiling);
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
    const base10 = Math.floor(Math.random() * numberCeiling);
    const answer = base10.toString(2).split("");

    return {
        base10: base10.toString(),
        answers: [answer],
        promptLength: answer.length,
        type: "convertToBase2"
    }
}