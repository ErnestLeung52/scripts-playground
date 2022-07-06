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

/* -------------- 5. Search in a Sorted Infinite Array ------------------
Given an infinite sorted array (or an array with unknown size), find if a given number ‘key’ is present in the array. Write a function to return the index of the ‘key’ if it is present in the array, otherwise return -1.

Since it is not possible to define an array with infinite (unknown) size, you will be provided with an interface ArrayReader to read elements of the array. ArrayReader.get(index) will return the number at index; if the array’s size is smaller than the index, it will return Integer.MAX_VALUE.
*/

function search_in_infinite_array(arr, key) {
	// find the proper bounds first
	let start = 0,
		end = 1;
	while (arr[end] < key) {
		let newStart = end + 1;
		// increase to double the bounds size; (end- start + 1) -> range of start to end
		end += (end - start + 1) * 2;
		start = newStart;
	}
	return binary_search_infinite(arr, key, start, end);
}

function binary_search_infinite(arr, key, start, end) {
	while (start <= end) {
		mid = Math.floor(start + (end - start) / 2);

		if (key < arr[mid]) {
			end = mid - 1;
		} else if (key > arr[mid]) {
			start = mid + 1;
		} else {
			return mid;
		}
	}
	return -1;
}
// console.log(search_in_infinite_array([4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], 10));

/* -------------- 6. Minimum Difference Element  ------------------
Given an array of numbers sorted in ascending order, find the element in the array that has the minimum difference with the given ‘key’.
Input: [1, 3, 8, 10, 15], key = 12
Output: 10
*/
const search_min_diff_element = function (arr, key) {
	const n = arr.length - 1;
	if (key < arr[0]) return arr[0];
	if (key > arr[n]) return arr[n];

	let start = 0,
		end = n;

	while (start <= end) {
		let mid = Math.floor(start + (end - start) / 2);

		if (arr[mid] === key) {
			return arr[mid];
		} else if (key < arr[mid]) {
			end = mid - 1;
		} else {
			start = mid + 1;
		}
	}
	// at the end of the while loop, 'start === end+1'
	// we are not able to find the element in the given array
	// return the element which is closest to the 'key'

	if (arr[start] - key < key - arr[end]) {
		return arr[start];
	} else {
		return arr[end];
	}
};

/* -------------- 7. Bitonic Array Maximum  ------------------
Find the maximum value in a given Bitonic array. An array is considered bitonic if it is monotonically increasing and then monotonically decreasing. Monotonically increasing or decreasing means that for any index i in the array arr[i] != arr[i+1].
Input: [1, 3, 8, 9, 10, 12, 4, 2]
Output: 12
*/
function find_max_in_bitonic_array(arr) {
	let start = 0,
		end = arr.length - 1;

	while (start < end) {
		mid = Math.floor(start + (end - start) / 2);
		// 因为我们在找max, 所以, 当数字在减少时 (mid > mid+1), 当前的mid 肯定就是最大的, 所以缩小 end 的范围
		if (arr[mid] > arr[mid + 1]) {
			end = mid;
		} else {
			// 相反, 数字增加时, 当前最后一个数肯定是最大的, 所以start 往右砍一刀
			start = mid + 1;
		}
	}
	// at the end of the while loop, 'start === end'
	// start 是最接近最大的, 因为start 在不停地递增
	return arr[start];
}

/* -------------- 8. Search Bitonic Array  ------------------
Given a Bitonic array, find if a given ‘key’ is present in it.
Write a function to return the index of the ‘key’. If the ‘key’ is not present, return -1.
Input: [1, 3, 8, 4, 3], key=4
Output: 3
*/
function search_bitonic_array(arr, key) {
	const maxIndex = find_max(arr);
	const keyIndex = binary_search_agnostic(arr, key, 0, maxIndex);
	if (keyIndex !== -1) {
		return keyIndex;
	} else {
		return binary_search_agnostic(arr, key, maxIndex + 1, arr.length - 1);
	}
}

function find_max(arr) {
	let start = 0,
		end = arr.length - 1;

	while (start < end) {
		let mid = Math.floor(start + (end - start) / 2);

		if (arr[mid] > arr[mid + 1]) {
			end = mid;
		} else {
			start = mid + 1;
		}
	}
	return start;
}

function binary_search_agnostic(arr, key, start, end) {
	while (start <= end) {
		let mid = Math.floor(start + (end - start) / 2);

		if (arr[mid] === key) {
			return mid;
		}
		// Check if it's in ascending order
		if (arr[start] < arr[end]) {
			key < arr[mid] ? (end = mid - 1) : (start = mid + 1);
		} else {
			key < mid[mid] ? (start = mid + 1) : (end = mid - 1);
		}
	}
	return -1;
}

/* -------------- 9.1 Search in Rotated Array  ------------------
Given an array of numbers which is sorted in ascending order and also rotated by some arbitrary number, find if a given ‘key’ is present in it.
Write a function to return the index of the ‘key’ in the rotated array. If the ‘key’ is not present, return -1. You can assume that the given array does not have any duplicates.
Input: [4, 5, 7, 9, 10, -1, 2, 3], key = 10
Output: 4
*/
function search_rotated_array(arr, key) {
	let start = 0;
	let end = arr.length - 1;
	while (start <= end) {
		mid = Math.floor(start + (end - start) / 2);
		if (arr[mid] === key) {
			return mid;
		}

		// start --> middle are sorted in ascending order
		if (arr[start] <= arr[mid]) {
			// key is within the start-mid range
			if (key >= arr[start] && key < arr[mid]) {
				end = mid - 1;
			} else {
				// key > arr[mid]
				start = mid + 1;
			}
			// middle --> end are sorted in ascending order
		} else {
			// In the sorted part
			if (key > arr[mid] && key <= arr[end]) {
				start = mid + 1;
				// Not in sorted part so we cut out the sorted part
			} else {
				end = mid - 1;
			}
		}
	}
	// we are not able to find the element in the given array
	return -1;
}

/* -------------- 9.2 Search in Rotated Array  ------------------
How do we search in a sorted and rotated array that also has duplicates?
Input: [3, 7, 3, 3, 3], key = 7
Output: 1
*/
function search_rotated_with_duplicates(arr, key) {
	let start = 0;
	let end = arr.length - 1;
	while (start <= end) {
		mid = Math.floor(start + (end - start) / 2);
		if (arr[mid] === key) {
			return mid;
		}

		// the only difference from the previous solution,
		// if numbers at indexes start, mid, and end are same, we can't choose a side
		// the best we can do, is to skip one number from both ends as key !== arr[mid]
		if (arr[start] === arr[mid] && arr[end] === arr[mid]) {
			start += 1;
			end -= 1;
		} else if (arr[start] <= arr[mid]) {
			// left side is sorted in ascending order
			if (key >= arr[start] && key < arr[mid]) {
				end = mid - 1;
			} else {
				// key > arr[mid]
				start = mid + 1;
			}
		} else {
			// right side is sorted in ascending order
			if (key > arr[mid] && key <= arr[end]) {
				start = mid + 1;
			} else {
				end = mid - 1;
			}
		}
	}
	// we are not able to find the element in the given array
	return -1;
}
