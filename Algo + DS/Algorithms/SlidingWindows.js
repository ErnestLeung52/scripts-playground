/* ------ 1. Maximum Sum Subarray of Size K -----
Given an array of positive numbers and a positive number ‘k,’ find the maximum sum of any contiguous subarray of size ‘k’.
Input: [2, 1, 5, 1, 3, 2], k=3 
Output: 9
- Have a start and end index to keep track of the size of sliding window
*/
const max_sub_array_of_size_k = function (k, arr) {
	let max = -Infinity;
	let winSum = 0;
	let winStart = 0;

	for (let winEnd = 0; winEnd < arr.length; winEnd += 1) {
		winSum += arr[winEnd];
		// ** if index >= k -1, then we know we have summed the subArray
		if (winEnd >= k - 1) {
			max = Math.max(max, winSum);
			winSum -= arr[winStart];
			winStart += 1;
		}
	}
	return max;
};
// console.log(max_sub_array_of_size_k(3, [2, 1, 5, 1, 3, 2]));

/* ------ 2. Smallest Subarray With a Greater Sum -----
Given an array of positive integers and a number ‘S,’ find the length of the smallest contiguous subarray whose sum is greater than or equal to ‘S’. Return 0 if no such subarray exists.
Input: [2, 1, 5, 2, 3, 2], S=7
Output: 2
*/
const smallest_subarray_sum = function (s, arr) {
	let minLength = Infinity,
		winLength = 0,
		winStart = 0,
		winSum = 0;

	for (let winEnd = 0; winEnd < arr.length; winEnd += 1) {
		winLength += 1;
		winSum += arr[winEnd];

		while (winSum >= s && winStart <= winEnd) {
			minLength = Math.min(minLength, winLength);
			winSum -= arr[winStart];
			winStart += 1;
			winLength -= 1;
		}
	}

	if (minLength === Infinity) return 0;

	return minLength;
};

// console.log(smallest_subarray_sum(7, [2, 1, 5, 2, 3, 2]));

/* ------ 3. Longest Substring with maximum K Distinct Characters -----
Given a string, find the length of the longest substring in it with no more than K distinct characters.
Input: String="araaci", K=2
Output: 4
*/
const longest_substring_with_k_distinct = function (str, k) {
	let windowStart = 0,
		maxLength = 0,
		charFrequency = {};

	// in the following loop we'll try to extend the range [window_start, window_end]
	for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
		const rightChar = str[windowEnd];
		if (!(rightChar in charFrequency)) {
			charFrequency[rightChar] = 0;
		}
		charFrequency[rightChar] += 1;
		// shrink the sliding window, until we are left with 'k' distinct characters in the char_frequency
		console.log(charFrequency);
		while (Object.keys(charFrequency).length > k) {
			// console.log(Object.keys(charFrequency));
			const leftChar = str[windowStart];
			charFrequency[leftChar] -= 1;
			if (charFrequency[leftChar] === 0) {
				delete charFrequency[leftChar];
			}
			windowStart += 1; // shrink the window
		}
		// remember the maximum length so far
		maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
	}

	return maxLength;
};
// console.log(longest_substring_with_k_distinct('araaci', 2));

/* ------ 4. Fruits into Baskets -----
Input: Fruit=['A', 'B', 'C', 'B', 'B', 'C']
Output: 5
*/
const fruits_into_baskets = function (fruits) {
	const charFreq = {}; // keep track of unique fruits
	let maxLength = 0,
		winStart = 0;

	// Iterate fruits, store each fruit into charFreq with value 1 (limit only 2 fruits in obj)
	// while charFreq has more than 2 fruits, we will delete the oldest fruit, only keeping two unique items in charFreq

	for (let winEnd = 0; winEnd < fruits.length; winEnd += 1) {
		const right = fruits[winEnd];
		charFreq[right] = charFreq[right] ? charFreq[right] + 1 : 1;

		while (Object.keys(charFreq).length > 2) {
			const left = fruits[winStart];
			charFreq[left] -= 1;
			if (charFreq[left] === 0) delete charFreq[left];
			winStart += 1;
		}
		maxLength = Math.max(maxLength, winEnd - winStart + 1);
	}

	return maxLength;
};

/* ------ 5. Longest Substring with Distinct Characters -----
Given a string, find the length of the longest substring, which has all distinct characters.
Input: String="abccde"
Output: 3
*/
const non_repeat_substring = function (str) {
	// Keep track of Index instead of count
	// Growth condition: add str into the hashmap with its index as value
	// shrink condition: shrink the index, no need to worry about keys in hashmap
	const strIndexMap = {};
	let winStart = 0, // 3
		maxLength = 0;

	for (let winEnd = 0; winEnd < str.length; winEnd += 1) {
		const rightChar = str[winEnd];
		// if the map already contains the 'rightChar', shrink the window from the beginning so that
		// we have only one occurrence of 'rightChar'
		if (rightChar in strIndexMap) {
			// this is tricky; in the current window, we will not have any 'rightChar' after its previous index
			// and if 'windowStart' is already ahead of the last index of 'rightChar', we'll keep 'windowStart'
			winStart = Math.max(winStart, strIndexMap[rightChar] + 1);
		}
		// insert the 'rightChar' into the map
		strIndexMap[rightChar] = winEnd;
		// remember the maximum length so far
		maxLength = Math.max(maxLength, winEnd - winStart + 1);
	}
	return maxLength;
};
// console.log(non_repeat_substring('abccdef'));

/* ------ 6. Longest Substring with Same Letters after Replacement ----- Leetcode 424
Given a string with lowercase letters only, if you are allowed to replace no more than k letters with any letter, find the length of the longest substring having the same letters after replacement.
Input: String="aabccbb", k=2
Output: 5
*/
const length_of_longest_substring = function (str, k) {
	// Grow:
	// Shrink:
	const freqMap = {};
	let winStart = 0,
		maxLength = 0,
		maxRepeatCount = 0;

	for (let winEnd = 0; winEnd < str.length; winEnd += 1) {
		const rightChar = str[winEnd];
		freqMap[rightChar] = freqMap[rightChar] ? freqMap[rightChar] + 1 : 1;
		// We want to find the most frequent char in the window, and then calculate winLength - mostFreqChar to get the number we can replace with, and if this value is less than K, our window is valid => this value is the number we can replace
		maxRepeatCount = Math.max(maxRepeatCount, freqMap[rightChar]);
		// Invalid window -> shrink
		if (winEnd - winStart + 1 - maxRepeatCount > k) {
			leftChar = str[winStart];
			freqMap[leftChar] -= 1;
			winStart += 1;
		}
		maxLength = Math.max(maxLength, winEnd - winStart + 1);
	}
	return maxLength;
};
// console.log(length_of_longest_substring('aabccbb', 2));


/* ------ 7. Longest Subarray with Ones after Replacement ----- 
Given an array containing 0s and 1s, if you are allowed to replace no more than ‘k’ 0s with 1s, find the length of the longest contiguous subarray having all 1s.

*/