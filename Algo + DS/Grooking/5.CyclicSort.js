/*---------------------------- 1. Cyclic Sort ------------------------
We are given an array containing n objects. Each object, when created, was assigned a unique number from the range 1 to n based on their creation sequence. This means that the object with sequence number 3 was created just before the object with sequence number 4.
Input: [3, 1, 5, 4, 2]
Output: [1, 2, 3, 4, 5]
*/
const cyclic_sort = function (nums) {
	let i = 0;
	while (i < nums.length) {
		// j is the index
		let index = nums[i] - 1;
		if (nums[i] !== nums[index]) {
			[nums[i], nums[index]] = [nums[index], nums[i]];
		} else {
			i += 1;
		}
	}
	return nums;
};

/*---------------------------- 2. Find the Missing Number ------------------------
We are given an array containing n distinct numbers taken from the range 0 to n. Since the array has only n numbers out of the total n+1 numbers, find the missing number.
Input: [4, 0, 3, 1]
Output: 2
*/
const find_missing_number = function (nums) {
	let i = 0;
	const n = nums.length;
	while (i < n) {
		j = nums[i];
		// make sure nums[i] is within nums.length
		if (nums[i] < n && nums[i] !== nums[j]) {
			[nums[i], nums[j]] = [nums[j], nums[i]]; // swap
		} else {
			i += 1;
		}
	}

	// find the first number missing from its index, that will be our required number
	for (i = 0; i < n; i++) {
		if (nums[i] !== i) {
			return i;
		}
	}

	return n;
};

/*------------------------ 3. Find all Missing Numbers ------------------------
We are given an unsorted array containing numbers taken from the range 1 to ‘n’. The array can have duplicates, which means some numbers will be missing. Find all those missing numbers.
Input: [2, 3, 1, 8, 2, 3, 5, 1]
Output: 4, 6, 7
*/
const find_missing_numbers = function (nums) {
	const result = [];
	// Create 2 pointers: one is current, one is the corresponding index
	let i = 0;
	// If current element is not at its position, we swap
	while (i < nums.length) {
		let index = nums[i] - 1;
		if (nums[i] !== nums[index]) {
			[nums[i], nums[index]] = [nums[index], nums[i]];
		} else {
			i++;
		}
	}
	// Check if current element is in its position
	for (let j = 0; j < nums.length; j++) {
		if (nums[j] !== j + 1) {
			result.push(j + 1);
		}
	}
	return result;
};
// console.log(find_missing_numbers([2, 3, 1, 8, 2, 3, 5, 1]));

/*------------------------ 4. Find the Duplicate Number ------------------------
We are given an unsorted array containing ‘n+1’ numbers taken from the range 1 to ‘n’. The array has only one duplicate but it can be repeated multiple times. Find that duplicate number without using any extra space. You are, however, allowed to modify the input array.
Input: [1, 4, 4, 3, 2]
Output: 4
*/
const find_duplicate = function (nums) {
	let i = 0;
	while (i < nums.length) {
		if (nums[i] !== i + 1) {
			let j = nums[i] - 1;
			if (nums[i] !== nums[j]) {
				[nums[i], nums[j]] = [nums[j], nums[i]]; // swap
			} else {
				// we have found the duplicate
				return nums[i];
			}
		} else {
			i += 1;
		}
	}
	return -1;
};
// function find_duplicate_without_modifying_input(arr) {
// 	let slow = arr[0];
// 	fast = arr[arr[0]];
// 	while (slow !== fast) {
// 		slow = arr[slow];
// 		fast = arr[arr[fast]];
// 	}
// 	// find cycle length
// 	let current = arr[arr[slow]];
// 	let cycleLength = 1;
// 	while (current !== arr[slow]) {
// 		current = arr[current];
// 		cycleLength += 1;
// 	}

// 	return find_start(arr, cycleLength);
// }
// function find_start(arr, cycleLength) {
// 	let pointer1 = arr[0];
// 	let pointer2 = arr[0];
// 	// move pointer2 ahead 'cycleLength' steps
// 	while (cycleLength > 0) {
// 		pointer2 = arr[pointer2];
// 		cycleLength -= 1;
// 	}
// 	// increment both pointers until they meet at the start of the cycle
// 	while (pointer1 !== pointer2) {
// 		pointer1 = arr[pointer1];
// 		pointer2 = arr[pointer2];
// 	}
// 	return pointer1;
// }
// console.log(find_duplicate([2, 1, 3, 3, 5, 4]));

/*------------------------ 5. Find the Duplicate Numbers ------------------------
We are given an unsorted array containing n numbers taken from the range 1 to n. The array has some numbers appearing twice, find all these duplicate numbers using constant space.
Input: [3, 4, 4, 5, 5]
Output: [4, 5]
*/
function find_all_duplicates(nums) {
	let i = 0;
	// Duplicate numbers will be swap to the start
	while (i < nums.length) {
		j = nums[i] - 1;
		nums;
		if (nums[i] != nums[j]) {
			[nums[i], nums[j]] = [nums[j], nums[i]]; // swap
		} else {
			i++;
		}
	}

	const duplicateNumbers = [];
	for (i = 0; i < nums.length; i++) {
		if (nums[i] !== i + 1) {
			duplicateNumbers.push(nums[i]);
		}
	}
	return duplicateNumbers;
}
// console.log(find_all_duplicates([3, 4, 4, 5, 5]));

/*------------------------ 6. Find the Corrupt Pair (easy) ------------------------
We are given an unsorted array containing ‘n’ numbers taken from the range 1 to ‘n’. The array originally contained all the numbers from 1 to ‘n’, but due to a data error, one of the numbers got duplicated which also resulted in one number going missing. Find both these numbers.
Input: [3, 1, 2, 5, 2]
Output: [2, 4]
*/
function find_corrupt_numbers(nums) {
	let i = 0;
	while (i < nums.length) {
		let index = nums[i] - 1;

		if (nums[i] !== nums[index]) {
			[nums[i], nums[index]] = [nums[index], nums[i]];
		} else {
			i++;
		}
	}
	for (let j = 0; j < nums.length; j++) {
		if (nums[j] !== j + 1) {
			return [nums[j], j + 1];
		}
	}
	return [-1, -1];
}
// console.log(find_corrupt_numbers([3, 1, 2, 5, 2]));

/*------------------------ 6. Find the Smallest Missing Positive Number ------------------------
Given an unsorted array containing numbers, find the smallest missing positive number in it.
Input: [-3, 1, 5, 4, 2]
Output: 3
*/
const find_first_smallest_missing_positive = function (nums) {
	let i = 0;
	while (i < nums.length) {
		let index = nums[i] - 1;
		if (nums[i] !== nums[index]) {
			[nums[i], nums[index]] = [nums[index], nums[i]];
		} else {
			i++;
		}
	}
	for (let j = 0; j < nums.length; j++) {
		if (nums[j] !== j + 1) {
			return j + 1;
		}
	}
	return nums.length + 1;
};
// console.log(find_first_smallest_missing_positive([-3, 1, 5, 4, 2]));

/*------------------------ 7. Find the First K Missing Positive Numbers ------------------------
Given an unsorted array containing numbers and a number ‘k’, find the first ‘k’ missing positive numbers in the array.
Input: [3, -1, 4, 5, 5], k=3
Output: [1, 2, 6]
*/
function find_first_k_missing_positive(nums, k) {
	let i = 0;
	while (i < nums.length) {
		let index = nums[i] - 1;
		if (nums[i] !== nums[index]) {
			[nums[i], nums[index]] = [nums[index], nums[i]];
		} else {
			i++;
		}
	}

	const missingNumbes = [];
	let j = 0;
	while (missingNumbes.length < k) {
		if (nums[j] === undefined) {
			missingNumbes.push(j + 1);
		} else if (nums[j] !== j + 1) {
			missingNumbes.push(j + 1);
		}
		j++;
	}
	return missingNumbes;
}
// console.log(find_first_k_missing_positive([-2, -3, 4], 2));
