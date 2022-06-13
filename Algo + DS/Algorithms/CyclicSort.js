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
