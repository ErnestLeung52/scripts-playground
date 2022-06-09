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

/* -------------- 4. Triplet Sum to Zero  ------------------ LeetCode 15
Given an array of unsorted numbers, find all unique triplets in it that add up to zero.
Input: [-3, 0, 1, 2, -1, 1, -2]
Output: [-3, 1, 2], [-2, 0, 2], [-2, 1, 1], [-1, 0, 1]
*/
const threeSum = function (nums) {
	nums.sort((a, b) => a - b);
	const result = [];

	for (let i = 0; i < nums.length; i++) {
		// We can stop once we hit positive values, because no three positive values can be added to reach 0
		if (nums[i] > 0) break;
		// we want to make sure we skip duplicates
		if (i > 0 && nums[i - 1] === nums[i]) {
			continue;
		}

		let left = i + 1;
		let right = nums.length - 1;

		while (left < right) {
			const sum = nums[i] + nums[left] + nums[right];

			if (sum === 0) {
				result.push([nums[i], nums[left], nums[right]]);
				left += 1;
				right -= 1;
				// Also make sure we increment the left pointer past any possible duplicates
				while (left < right && nums[left] === nums[left - 1]) {
					left += 1;
				}
			} else if (sum < 0) {
				left += 1;
			} else {
				right -= 1;
			}
		}
	}
	return result;
};
// console.log(threeSum([-3, 0, 1, 0, 2, 1, -1, 1, 1, 2, -2]));
// [ -3, -2, -1, 0, 0, 1, 1, 1, 1, 2, 2 ]

/* -------------- 5. Triplet Sum Close to Target  ------------------ 
Given an array of unsorted numbers and a target number, find a triplet in the array whose sum is as close to the target number as possible, return the sum of the triplet. If there are more than one such triplet, return the sum of the triplet with the smallest sum.
Input: [-2, 0, 1, 2], target=2
Output: 1
*/
const triplet_sum_close_to_target = function (arr, targetSum) {
	arr.sort((a, b) => a - b);

	let closestSum = Infinity;

	for (let i = 0; i < arr.length - 2; i++) {
		let left = i + 1,
			right = arr.length - 1;

		while (left < right) {
			let sum = arr[left] + arr[right] + arr[i];

			if (Math.abs(sum - targetSum) < Math.abs(closestSum - targetSum)) {
				closestSum = sum;
			}

			if (sum === targetSum) {
				return targetSum;
			} else if (sum < targetSum) {
				left += 1;
			} else {
				right -= 1;
			}
		}
	}
	return closestSum;
};
// console.log(triplet_sum_close_to_target([-2, 0, 1, 2], 2));

/* -------------- 6.1 Triplets with Smaller Sum  ------------------ Leetcode 259
Given an array arr of unsorted numbers and a target sum, count all triplets in it such that arr[i] + arr[j] + arr[k] < target where i, j, and k are three different indices. Write a function to return the count of such triplets.
Input: [-1, 0, 2, 3], target=3 
Output: 2
*/
const triplet_with_smaller_sum = function (arr, target) {
	arr.sort((a, b) => a - b);
	let result = 0;

	for (let i = 0; i < arr.length; i++) {
		let left = i + 1,
			right = arr.length - 1;

		while (left < right) {
			const sum = arr[i] + arr[left] + arr[right];

			if (sum < target) {
				// If sum < target, that means all nums between left & right would also be less than target
				result += right - left;
				left += 1;
				while (left < right && arr[left] === arr[left - 1]) {
					left += 1;
				}
			} else {
				right -= 1;
			}
		}
	}
	return result;
};
// console.log(triplet_with_smaller_sum([-1, 0, 2, 2, 3], 3));

/* -------------- 6.2 Triplets with Smaller Sum  ------------------ Leetcode 259
Return an array instead
*/
const triplet_with_smaller_sum2 = function (arr, target) {
	arr.sort((a, b) => a - b);
	const result = [];

	for (let i = 0; i < arr.length; i++) {
		let left = i + 1,
			right = arr.length - 1;

		while (left < right) {
			const sum = arr[i] + arr[left] + arr[right];

			if (sum < target) {
				// If sum < target, that means all nums between left & right would also be less than target
				for (let k = right; k > left; k--) {
					result.push([arr[i], arr[left], arr[k]]);
				}
				left += 1;
			} else {
				right -= 1;
			}
		}
	}
	return result;
};
// console.log(triplet_with_smaller_sum2([-1, 0, 2, 3], 3));

/* -------------- 7. Subarrays with Product Less than a Target  ------------------
Given an array with positive numbers and a positive target number, find all of its contiguous subarrays whose product is less than the target number.
Input: [2, 5, 3, 10], target=30 
Output: [2], [5], [2, 5], [3], [5, 3], [10]
 */

const find_subarrays = function (arr, target) {
	const result = [];
	let product = 1,
		left = 0;
	for (let right = 0; right < arr.length; right++) {
		const subArr = [];

		product *= arr[right];

		while (product >= target && left <= right) {
			product /= arr[left];
			left += 1;
		}

		for (let i = right; i > left - 1; i--) {
			subArr.unshift(arr[i]);
			result.push(subArr);
		}
	}
	return result;
};
// console.log(find_subarrays([2, 5, 3, 10], 30));

/* -------------- 8. Subarrays with Product Less than a Target  ------------------
Given an array containing 0s, 1s and 2s, sort the array in-place. You should treat numbers of the array as objects, hence, we can’t count 0s, 1s, and 2s to recreate the array.
Input: [1, 0, 2, 1, 0]
Output: [0, 0, 1, 1, 2]
*/

function dutch_flag_sort(arr) {
	// all elements < low are 0, and all elements > high are 2
	// all elements from >= low < i are 1
	let low = 0,
		high = arr.length - 1,
		i = 0;

	while (i <= high) {
		if (arr[i] === 0) {
			[arr[i], arr[low]] = [arr[low], arr[i]];
			low += 1;
			i += 1;
		} else if (arr[i] === 1) {
			i += 1;
		} else {
			[arr[i], arr[high]] = [arr[high], arr[i]];
			high -= 1;
		}
	}
	return arr;
}
// console.log(dutch_flag_sort([1, 0, 2, 1, 0]));
