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
	const charFreq = {};
	let maxLength = 0,
		winLength = 0,
		winStart = 0;

	for (let winEnd = 0; winEnd < str; winEnd += 1) {
		const rightChar = str[winEnd];
		if (!(rightChar in charFreq)) charFreq[rightChar] = 0;
		charFreq[rightChar] += 1;

		while (Object.keys(charFreq).length > k) {
			const leftChar = str[winStart];
			charFreq[leftChar] -= 1;
			if (charFreq[leftChar] === 0) {
				delete charFreq[leftChar];
			}
			winStart += 1;
		}
		maxLength = Math.max(maxLength, winEnd - winStart + 1);
	}
	return maxLength;
};
