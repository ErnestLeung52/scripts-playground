/* 
------ Maximum Sum Subarray of Size K -----
Given an array of positive numbers and a positive number ‘k,’ find the maximum sum of any contiguous subarray of size ‘k’.
Input: [2, 1, 5, 1, 3, 2], k=3 
Output: 9
- Have a start and end index to keep track of the size of sliding window
*/
const max_sub_array_of_size_k = function (k, arr) {
	let max = -Infinity;
	let windowSum = 0;
	let windowStart = 0;

	for (let windowEnd = 0; windowEnd < arr.length; windowEnd += 1) {
		windowSum += arr[windowEnd];
		// ** if index >= k -1, then we know we have summed the subArray
		if (windowEnd >= k - 1) {
			max = Math.max(max, windowSum);
			windowSum -= arr[windowStart];
			windowStart += 1;
		}
	}
	return max;
};

// console.log(max_sub_array_of_size_k(3, [2, 1, 5, 1, 3, 2]));

function find_averages_of_subarrays(K, arr) {
  
}

// const result = find_averages_of_subarrays(5, [1, 3, 2, 6, -1, 4, 1, 8, 2]);
//   console.log(`Averages of subarrays of size K: ${result}`);
