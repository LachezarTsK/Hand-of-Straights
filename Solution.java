
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public boolean isNStraightHand(int[] hand, int groupSize) {
        Map<Integer, Integer> valueToFrequency = createMapValueToFrequency(hand);
        int[] sortedUniqueValues = createArraySortedUniqueValues(valueToFrequency);
        return allCardsCanBeRearrangedInConsequtiveValuesOfGivenGroupSize(valueToFrequency, sortedUniqueValues, groupSize);
    }

    private Map<Integer, Integer> createMapValueToFrequency(int[] hand) {
        Map<Integer, Integer> valueToFrequency = new HashMap<>();
        for (int value : hand) {
            valueToFrequency.put(value, valueToFrequency.getOrDefault(value, 0) + 1);
        }
        return valueToFrequency;
    }

    private int[] createArraySortedUniqueValues(Map<Integer, Integer> valueToFrequency) {
        int[] sortedUniqueValues = new int[valueToFrequency.size()];
        int index = 0;

        for (int value : valueToFrequency.keySet()) {
            sortedUniqueValues[index] = value;
            ++index;
        }

        Arrays.sort(sortedUniqueValues);
        return sortedUniqueValues;
    }

    private boolean allCardsCanBeRearrangedInConsequtiveValuesOfGivenGroupSize(Map<Integer, Integer> valueToFrequency, int[] sortedUniqueValues, int groupSize) {
        int startIndexSequence = 0;

        while (valueToFrequency.size() >= groupSize) {

            int minValue = sortedUniqueValues[startIndexSequence];
            if (!valueToFrequency.containsKey(minValue)) {
                return false;
            }
            int frequencyMinValue = valueToFrequency.remove(minValue);
            ++startIndexSequence;

            for (int value = minValue + 1; value < minValue + groupSize; ++value) {
                if (!valueToFrequency.containsKey(value)) {
                    return false;
                }

                if (valueToFrequency.get(value) - frequencyMinValue == 0) {
                    valueToFrequency.remove(value);
                    ++startIndexSequence;
                } else {
                    valueToFrequency.put(value, valueToFrequency.get(value) - frequencyMinValue);
                }
            }
        }

        return valueToFrequency.isEmpty();
    }
}
