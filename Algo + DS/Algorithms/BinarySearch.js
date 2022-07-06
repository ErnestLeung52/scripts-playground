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
                end = mid - 1
            } else {
                start = mid + 1;
            }
        }
	}
    return - 1;
};

/* -------------- 2. Ceiling of a Number ------------------
*/