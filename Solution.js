
/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
var isNStraightHand = function (hand, groupSize) {
    const valueToFrequency = createMapValueToFrequency(hand);
    const sortedUniqueValues = createArraySortedUniqueValues(valueToFrequency);
    return allCardsCanBeRearrangedInConsequtiveValuesOfGivenGroupSize(valueToFrequency, sortedUniqueValues, groupSize);
};

/**
 * @param {number[]} hand
 * @return {Map<number, number>}
 */
function createMapValueToFrequency(hand) {
    const valueToFrequency = new Map();
    for (let value of hand) {
        let frequency = (valueToFrequency.get(value) || 0) + 1;
        valueToFrequency.set(value, frequency);
    }
    return valueToFrequency;
}

/**
 * @param {Map<number, number>} valueToFrequency
 * @return {number[]}
 */
function  createArraySortedUniqueValues(valueToFrequency) {
    const sortedUniqueValues = new Array(valueToFrequency.size);
    let index = 0;

    for (let [value, frequency] of valueToFrequency) {
        sortedUniqueValues[index] = value;
        ++index;
    }

    sortedUniqueValues.sort((x, y) => x - y);
    return sortedUniqueValues;
}

/**
 * @param {Map<number, number>} valueToFrequency
 * @param {number[]} sortedUniqueValues
 * @param {number} groupSize
 * @return {boolean}
 */
function allCardsCanBeRearrangedInConsequtiveValuesOfGivenGroupSize(valueToFrequency, sortedUniqueValues, groupSize) {
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
