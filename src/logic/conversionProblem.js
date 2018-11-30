
const numberCeiling = 16;

export function makeConvertToBase10Problem() {
    const answer = Math.floor(Math.random() * numberCeiling);
    const base2 = answer.toString(2);

    return {
        base2,
        answer: answer.toString().split(""),
        type: "convertToBase10"
    }
}
export function makeConvertToBase2Problem() {
    const base10 = Math.floor(Math.random() * numberCeiling);
    const answer = base10.toString(2).split("");

    return {
        base10: base10.toString(),
        answer,
        type: "convertToBase2"
    }
}