
package main

import (
	"fmt"
	"slices"
)

func isNStraightHand(hand []int, groupSize int) bool {
	var valueToFrequency = createMapValueToFrequency(hand)
	var sortedUniqueValues = createSliceSortedUniqueValues(valueToFrequency)
	return allCardsCanBeRearrangedInConsequtiveValuesOfGivenGroupSize(valueToFrequency, sortedUniqueValues, groupSize)
}

func createMapValueToFrequency(hand []int) map[int]int {
	var valueToFrequency = map[int]int{}
	for _, value := range hand {
		valueToFrequency[value]++
	}
	return valueToFrequency
}

func createSliceSortedUniqueValues(valueToFrequency map[int]int) []int {
	var sortedUniqueValues = make([]int, len(valueToFrequency))
	var index = 0

	for value := range valueToFrequency {
		sortedUniqueValues[index] = value
		index++
	}

	slices.Sort(sortedUniqueValues)
	return sortedUniqueValues
}

func allCardsCanBeRearrangedInConsequtiveValuesOfGivenGroupSize(valueToFrequency map[int]int, sortedUniqueValues []int, groupSize int) bool {
	var startIndexSequence = 0

	for len(valueToFrequency) >= groupSize {

		var minValue = sortedUniqueValues[startIndexSequence]
		if _, contains := valueToFrequency[minValue]; !contains {
			return false
		}
		var frequencyMinValue = valueToFrequency[minValue]
		delete(valueToFrequency, minValue)

		startIndexSequence++

		for value := minValue + 1; value < minValue+groupSize; value++ {
			if _, contains := valueToFrequency[value]; !contains {
				return false
			}

			if valueToFrequency[value]-frequencyMinValue == 0 {
				delete(valueToFrequency, value)
				startIndexSequence++
			} else {
				valueToFrequency[value] = valueToFrequency[value] - frequencyMinValue
			}
		}
	}

	return len(valueToFrequency) == 0
}
