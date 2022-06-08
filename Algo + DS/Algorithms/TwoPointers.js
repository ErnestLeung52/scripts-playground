/* -------------- 1. Pair with Target Sum ------------------
Given an array of sorted numbers and a target sum, find a pair in the array whose sum is equal to the given target.
Write a function to return the indices of the two numbers (i.e. the pair) such that they add up to the given target.
Input: [1, 2, 3, 4, 6], target=6
Output: [1, 3]
*/
const pair_with_targetsum = function (arr, target_sum) {
	let left = 0,
		right = arr.length - 1;

	while (left < right) {
		if (arr[left] + arr[right] === target_sum) {
			return [left, right];
		} else if (arr[left] + arr[right] > target_sum) {
			right -= 1;
		} else {
			left += 1;
		}
	}
	return [-1, -1];
};
// console.log(pair_with_targetsum([1, 2, 3, 4, 6], 6));

/* -------------- 2.1 Remove Duplicates ------------------
Given an array of sorted numbers, separate all duplicates from it in-place. You should not use any extra space; move all duplicates at the end of the array and after moving return the length of the subarray that has no duplicate in it.
Input: [2, 3, 3, 3, 6, 9, 9]
Output: 4
*/
const remove_duplicates = function (arr) {
	// fast index to traverse through the array. compare slow with fast
	// We can use slow not slow + 1 to compare because slow is already the most recent unique number
	// if not equal, reassign slow + 1 to fast because slow + 1 is a repeated number
	let slow = 0,
		fast = 0; // traverse
	while (fast < arr.length) {
		if (arr[slow] !== arr[fast]) {
			slow += 1;
			arr[slow] = arr[fast];
		}
		fast += 1;
	}
	return slow + 1;
};
// console.log(remove_duplicates([2, 3, 3, 3, 6, 9, 9]));

/* -------------- 2.2 Remove Duplicates ------------------
Given an unsorted array of numbers and a target ‘key’, remove all instances of ‘key’ in-place and return the new length of the array.
Input: [3, 2, 3, 6, 3, 10, 9, 3], Key=3
Output: 4
*/
const remove_duplicates2 = function (arr, key) {
	let slow = 0,
		fast = 0;
	while (fast < arr.length) {
		if (arr[fast] !== key) {
			arr[slow] = arr[fast];
			slow += 1;
		}
		fast += 1;
	}
	return slow;
};
// console.log(remove_duplicates2([2, 11, 2, 2, 1], 2));

/* -------------- 3. Squaring a Sorted Array  ------------------
Given a sorted array, create a new array containing squares of all the numbers of the input array in the sorted order.
Input: [-2, -1, 0, 2, 3]
Output: [0, 1, 4, 4, 9]
*/
const make_squares = function (arr) {
	/* Method 1: start from the middle */
	// squares = []
	// let firstPositive = 0;
	// // Use while loop -> handle no-positive num
	// while (arr[firstPositive] < 0) firstPositive += 1

	// let left = firstPositive - 1,
	//     right = firstPositive;

	// while (left >= 0 || right < arr.length) {
	//   // if right becomes undefined, left will automatically pushed into squares
	//   if (right >= arr.length || -arr[left] <= arr[right]) {
	//     squares.push(arr[left] ** 2)
	//     left -= 1;
	//   } else {
	//     squares.push(arr[right] ** 2)
	//     right += 1;
	//   }
	// }

	/* Method 2: start from both side*/
	const squares = Array(arr.length).fill();
	let left = 0,
		right = arr.length - 1,
		end = arr.length - 1;
	while (left <= right) {
		if (arr[left] ** 2 < arr[right] ** 2) {
			squares[end--] = arr[right--] ** 2;
		} else {
			squares[end--] = arr[left++] ** 2;
		}
	}

	return squares;
};
// console.log(make_squares([-2, -1, 0, 2, 3]));
