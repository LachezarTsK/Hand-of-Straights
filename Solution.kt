
import java.util.HashMap

class Solution {

    fun isNStraightHand(hand: IntArray, groupSize: Int): Boolean {
        val valueToFrequency = createMapValueToFrequency(hand)
        val sortedUniqueValues = createArraySortedUniqueValues(valueToFrequency)
        return allCardsCanBeRearrangedInConsequtiveValuesOfGivenGroupSize(
            valueToFrequency,
            sortedUniqueValues,
            groupSize
        )
    }

    private fun createMapValueToFrequency(hand: IntArray): HashMap<Int, Int> {
        val valueToFrequency = HashMap<Int, Int>()
        for (value in hand) {
            valueToFrequency[value] = valueToFrequency.getOrDefault(value, 0) + 1
        }
        return valueToFrequency
    }

    private fun createArraySortedUniqueValues(valueToFrequency: HashMap<Int, Int>): IntArray {
        val sortedUniqueValues = IntArray(valueToFrequency.size)
        var index = 0

        for (value in valueToFrequency.keys) {
            sortedUniqueValues[index] = value
            ++index
        }

        sortedUniqueValues.sort()
        return sortedUniqueValues
    }

    private fun allCardsCanBeRearrangedInConsequtiveValuesOfGivenGroupSize(
        valueToFrequency: HashMap<Int, Int>,
        sortedUniqueValues: IntArray,
        groupSize: Int
    ): Boolean {
        var startIndexSequence = 0

        while (valueToFrequency.size >= groupSize) {

            var minValue = sortedUniqueValues[startIndexSequence]
            if (!valueToFrequency.containsKey(minValue)) {
                return false
            }
            val frequencyMinValue = valueToFrequency[minValue]
            valueToFrequency.remove(minValue)
            ++startIndexSequence

            for (value in minValue + 1..<minValue + groupSize) {
                if (!valueToFrequency.containsKey(value)) {
                    return false
                }

                if (valueToFrequency[value]!! - frequencyMinValue!! == 0) {
                    valueToFrequency.remove(value)
                    ++startIndexSequence
                } else {
                    valueToFrequency[value] = valueToFrequency[value]!! - frequencyMinValue
                }
            }
        }

        return valueToFrequency.isEmpty()
    }
}
