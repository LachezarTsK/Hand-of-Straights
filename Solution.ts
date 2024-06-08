
function isNStraightHand(hand: number[], groupSize: number): boolean {
    const valueToFrequency = createMapValueToFrequency(hand);
    const sortedUniqueValues = createArraySortedUniqueValues(valueToFrequency);
    return allCardsCanBeRearrangedInConsequtiveValuesOfGivenGroupSize(valueToFrequency, sortedUniqueValues, groupSize);
};

function createMapValueToFrequency(hand: number[]): Map<number, number> {
    const valueToFrequency = new Map<number, number>();
    for (let value of hand) {
        let frequency = (valueToFrequency.get(value) || 0) + 1;
        valueToFrequency.set(value, frequency);
    }
    return valueToFrequency;
}

function createArraySortedUniqueValues(valueToFrequency: Map<number, number>): number[] {
    const sortedUniqueValues: number[] = new Array(valueToFrequency.size);
    let index = 0;

    for (let [value, frequency] of valueToFrequency) {
        sortedUniqueValues[index] = value;
        ++index;
    }

    sortedUniqueValues.sort((x, y) => x - y);
    return sortedUniqueValues;
}


function allCardsCanBeRearrangedInConsequtiveValuesOfGivenGroupSize
    (valueToFrequency: Map<number, number>, sortedUniqueValues: number[], groupSize: number): boolean {
    let startIndexSequence = 0;

    while (valueToFrequency.size >= groupSize) {

        let minValue = sortedUniqueValues[startIndexSequence];
        if (!valueToFrequency.has(minValue)) {
            return false;
        }
        let frequencyMinValue = valueToFrequency.get(minValue);
        valueToFrequency.delete(minValue);
        ++startIndexSequence;

        for (let value = minValue + 1; value < minValue + groupSize; ++value) {
            if (!valueToFrequency.has(value)) {
                return false;
            }

            if (valueToFrequency.get(value) - frequencyMinValue === 0) {
                valueToFrequency.delete(value);
                ++startIndexSequence;
            } else {
                valueToFrequency.set(value, valueToFrequency.get(value) - frequencyMinValue);
            }
        }
    }

    return valueToFrequency.size === 0;
}
