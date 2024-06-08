
#include <span>
#include <string>
#include <vector>
#include <ranges>
#include <unordered_map>
using namespace std;

class Solution {

public:
    bool isNStraightHand(const vector<int>& hand, int groupSize) const {
        unordered_map<int, int> valueToFrequency = createMapValueToFrequency(hand);
        vector<int> sortedUniqueValues = createVectorSortedUniqueValues(valueToFrequency);
        return allCardsCanBeRearrangedInConsequtiveValuesOfGivenGroupSize(valueToFrequency, sortedUniqueValues, groupSize);
    }

private:
    unordered_map<int, int> createMapValueToFrequency(span<const int> hand) const {
        unordered_map<int, int> valueToFrequency;
        for (const auto& value : hand) {
            ++valueToFrequency[value];
        }
        return valueToFrequency;
    }

    vector<int> createVectorSortedUniqueValues(const unordered_map<int, int>& valueToFrequency) const {
        vector<int> sortedUniqueValues(valueToFrequency.size());
        int index = 0;

        for (const auto [value, frequency] : valueToFrequency) {
            sortedUniqueValues[index] = value;
            ++index;
        }

        ranges::sort(sortedUniqueValues);
        return sortedUniqueValues;
    }

    bool allCardsCanBeRearrangedInConsequtiveValuesOfGivenGroupSize
        (unordered_map<int, int>& valueToFrequency, span<const int> sortedUniqueValues, int groupSize) const {
        int startIndexSequence = 0;

        while (valueToFrequency.size() >= groupSize) {

            int minValue = sortedUniqueValues[startIndexSequence];
            if (!valueToFrequency.contains(minValue)) {
                return false;
            }
            int frequencyMinValue = valueToFrequency[minValue];
            valueToFrequency.erase(minValue);
            ++startIndexSequence;

            for (int value = minValue + 1; value < minValue + groupSize; ++value) {
                if (!valueToFrequency.contains(value)) {
                    return false;
                }

                if (valueToFrequency[value] - frequencyMinValue == 0) {
                    valueToFrequency.erase(value);
                    ++startIndexSequence;
                }
                else {
                    valueToFrequency[value] -= frequencyMinValue;
                }
            }
        }

        return valueToFrequency.empty();
    }
};
