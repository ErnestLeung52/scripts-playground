/* -------------- 1. Order-agnostic Binary Search ------------------ logN -> reducing search range by half
Given a sorted array of numbers, find if a given number ‘key’ is present in the array. Though we know that the array is sorted, we don’t know if it’s sorted in ascending or descending order. You should assume that the array can have duplicates.

Write a function to return the index of the ‘key’ if it is present in the array, otherwise return -1.
*/
const binary_search = function (arr, key) {
	let start = 0,
		end = arr.length - 1;
	const isAscending = arr[start] < arr[end];

	while (start <= end) {
		let mid = Math.floor((start + end) / 2);

		if (arr[mid] === key) {
			return mid;
		}
		if (isAscending) {
			if (arr[mid] < key) {
				start = mid + 1;
			} else {
				end = mid - 1;
			}
		} else {
			if (arr[mid] < key) {
				end = mid - 1;
			} else {
				start = mid + 1;
			}
		}
	}
	return -1;
};

/* -------------- 2. Ceiling of a Number ------------------
Given an array of numbers sorted in an ascending order, find the ceiling of a given number ‘key’. The ceiling of the ‘key’ will be the smallest element in the given array greater than or equal to the ‘key’.
Write a function to return the index of the ceiling of the ‘key’. If there isn’t any ceiling return -1.
Input: [1, 3, 8, 10, 15, 16, 17], key = 14
Output: 4
*/
function search_ceiling_of_a_number(arr, key) {
	if (key < arr[0]) {
		// if the 'key' is smaller than the smallest element
		return -1;
	}

	let start = 0;
	let end = arr.length - 1;
	while (start <= end) {
		mid = Math.floor(start + (end - start) / 2);
		if (key < arr[mid]) {
			end = mid - 1;
		} else if (key > arr[mid]) {
			start = mid + 1;
		} else {
			// found the key
			return mid;
		}
	}

	// since the loop is running until 'start <= end', so at the end of the while loop, 'start === end+1'
	// we are not able to find the element in the given array, so the next smaller number will be arr[end]
	return end;
}

/* -------------- 3. Next Letter ------------------
Given an array of lowercase letters sorted in ascending order, find the smallest letter in the given array greater than a given ‘key’.
Assume the given array is a circular list, which means that the last letter is assumed to be connected with the first letter. This also means that the smallest letter in the given array is greater than the last letter of the array and is also the first letter of the array.
Write a function to return the next letter of the given ‘key’.
Input: ['a', 'c', 'f', 'h'], key = 'f'
Output: 'h'
 */

function search_next_letter(letters, key) {
	if (letters[0] > key || key >= letters[letters.length - 1]) {
		return letters[0];
	}

	let start = 0;
	let end = letters.length - 1;

	while (start <= end) {
		mid = Math.floor(start + (end - start) / 2);
		if (key < letters[mid]) {
			end = mid - 1;
		} else {
			// key >= letters[mid]:
			start = mid + 1;
		}
	}
	// since the loop is running until 'start <= end', so at the end of the while loop, 'start === end+1'
	return letters[start % letters.length];
}

/* -------------- 4. Number Range ------------------ leetcode 34
Given an array of numbers sorted in ascending order, find the range of a given number ‘key’. The range of the ‘key’ will be the first and last position of the ‘key’ in the array.
Write a function to return the range of the ‘key’. If the ‘key’ is not present return [-1, -1].
Input: [4, 6, 6, 6, 9], key = 6
Output: [1, 3]
*/
function find_range(arr, key) {
	const result = [-1, -1];
	result[0] = binary_search_range(arr, key, false);
	if (result[0] !== -1) {
		// no need to search, if 'key' is not present in the input array
		result[1] = binary_search_range(arr, key, true);
	}

	return result;
}

// modified Binary Search
function binary_search_range(arr, key, findMaxIndex) {
	let keyIndex = -1;
	let start = 0;
	let end = arr.length - 1;
	while (start <= end) {
		mid = Math.floor(start + (end - start) / 2);
		if (key < arr[mid]) {
			end = mid - 1;
		} else if (key > arr[mid]) {
			start = mid + 1;
		} else {
			// key === arr[mid]
			keyIndex = mid;
			if (findMaxIndex) {
				start = mid + 1; // search ahead to find the last index of 'key'
			} else {
				end = mid - 1; // search behind to find the first index of 'key'
			}
		}
	}
	return keyIndex;
}
// console.log(find_range([4, 6, 6, 6, 9], 6));
