/*
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
*/

const twoSum = (nums, target) => {
	// Create an object and store the number as the key, and its corresponding index as value
	// Iterate through nums and check if the difference of target and number is in the obj and return it
	// save the key value pair
	const obj = {};

	for (let i = 0; i < nums.length; i++) {
		const potentialMatch = target - nums[i];

		if (potentialMatch in obj) {
			return [obj[potentialMatch], i];
		}
		obj[potentialMatch] = i;
	}

	return [];
};

// console.log(twoSum([2, 7, 11, 15], 9));

/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
Input: s = "()[]{}"
Output: true
*/

const validParen = (s) => {
	if (s.length === 0) return false;
	if (s.length % 2 !== 0) return false;
  // While iterating through s, if we see a left paren we will push the right paren in the stack
  // if we see a right paren, we will pop it off the stack

	const stack = [];

	const map = new Map();
	map.set('(', ')');
	map.set('[', ']');
	map.set('{', '}');

  for (let i = 0;)

};
