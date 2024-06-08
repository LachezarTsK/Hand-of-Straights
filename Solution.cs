
using System;
using System.Collections.Generic;

public class Solution
{
    public bool IsNStraightHand(int[] hand, int groupSize)
    {
        Dictionary<int, int> valueToFrequency = CreateMapValueToFrequency(hand);
        int[] sortedUniqueValues = CreateArraySortedUniqueValues(valueToFrequency);
        return AllCardsCanBeRearrangedInConsequtiveValuesOfGivenGroupSize(valueToFrequency, sortedUniqueValues, groupSize);
    }

    private Dictionary<int, int> CreateMapValueToFrequency(int[] hand)
    {
        var valueToFrequency = new Dictionary<int, int>();
        foreach (int value in hand)
        {
            valueToFrequency.TryAdd(value, 0);
            ++valueToFrequency[value];
        }
        return valueToFrequency;
    }

    private int[] CreateArraySortedUniqueValues(Dictionary<int, int> valueToFrequency)
    {
        int[] sortedUniqueValues = new int[valueToFrequency.Count];
        int index = 0;

        foreach (int value in valueToFrequency.Keys)
        {
            sortedUniqueValues[index] = value;
            ++index;
        }

        Array.Sort(sortedUniqueValues);
        return sortedUniqueValues;
    }

    private bool AllCardsCanBeRearrangedInConsequtiveValuesOfGivenGroupSize(Dictionary<int, int> valueToFrequency, int[] sortedUniqueValues, int groupSize)
    {
        int startIndexSequence = 0;

        while (valueToFrequency.Count >= groupSize)
        {
            int minValue = sortedUniqueValues[startIndexSequence];
            if (!valueToFrequency.ContainsKey(minValue))
            {
                return false;
            }
            int frequencyMinValue = valueToFrequency[minValue];
            valueToFrequency.Remove(minValue);
            ++startIndexSequence;

            for (int value = minValue + 1; value < minValue + groupSize; ++value)
            {
                if (!valueToFrequency.ContainsKey(value))
                {
                    return false;
                }

                if (valueToFrequency[value] - frequencyMinValue == 0)
                {
                    valueToFrequency.Remove(value);
                    ++startIndexSequence;
                }
                else
                {
                    valueToFrequency[value] -= frequencyMinValue;
                }
            }
        }

        return valueToFrequency.Count == 0;
    }
}
