/*------------------- P1. Subsets  --------------------- N * 2^N
Given a set with distinct elements, find all of its distinct subsets.
*/
const find_subsets = function (nums) {
	const subsets = [];
	// start by adding the empty subset
	subsets.push([]);
	for (i = 0; i < nums.length; i++) {
		currentNumber = nums[i];
		// we will take all existing subsets and insert the current number in them to create new subsets
		const n = subsets.length;
		for (j = 0; j < n; j++) {
			// create a new subset from the existing subset and insert the current element to it
			const set1 = subsets[j].slice(); // clone the permutation
			set1.push(currentNumber);
			subsets.push(set1);
		}
	}

	return subsets;
};
// console.log(find_subsets([1, 5, 3]));

/*------------------- P2. Subsets With Duplicates  --------------------- Leetcode 90
Given a set of numbers that might contain duplicates, find all of its distinct subsets.
*/
const find_subsets_dup = function (nums) {
	// sort the numbers to handle duplicates
	nums.sort((a, b) => a - b);
	const subsets = [];
	subsets.push([]);
	let startIndex = 0,
		endIndex = 0;
	for (i = 0; i < nums.length; i++) {
		startIndex = 0;
		// if current and the previous elements are same, create new subsets only from the subsets added in the previous step
		// endIndex at this step is the last index of previous subset, adding 1 to it means this will be the beginning index of the newly created subset
		if (i > 0 && nums[i] === nums[i - 1]) {
			startIndex = endIndex + 1;
		}
		// current last index in the subset -> with start & end now, we know what the newly created subset interval will be
		endIndex = subsets.length - 1;

		for (j = startIndex; j < endIndex + 1; j++) {
			// create a new subset from the existing subset and add the current element to it
			const set1 = subsets[j].slice(0);
			set1.push(nums[i]);
			subsets.push(set1);
		}
	}
	return subsets;
};

const find_subsets_dup_2 = function (nums) {
	let prevIndex = 0;
	nums.sort((a, b) => a - b);

	const subsets = [[]];

	for (let i = 0; i < nums.length; i++) {
		const setLength = subsets.length;

		for (let j = prevIndex; j < setLength; j++) {
			subsets.push([...subsets[j], nums[i]]);
		}

		if (nums[i] === nums[i + 1]) {
			prevIndex = setLength;
		} else {
			prevIndex = 0;
		}
	}
	return subsets;
};
// console.log(find_subsets_dup_2([1, 5, 3, 3]));

/*------------------- P3. Permutations  --------------------- N * N!
Given a set of distinct numbers, find all of its permutations.
*/
const find_permutations_dfs = function (nums) {
	const result = [];

	const dfs = (i, nums) => {
		if (i === nums.length) {
			result.push(nums.slice());
			return;
		}

		for (let j = i; j < nums.length; j++) {
			[nums[i], nums[j]] = [nums[j], nums[i]];
			dfs(i + 1, nums);
			[nums[i], nums[j]] = [nums[j], nums[i]];
		}
	};

	dfs(0, nums);
	return result;
};
// console.log(find_permutations_dfs([1,2,3]));

const find_permutations_bfs = function (nums) {
	let numsLength = nums.length,
		result = [],
		permutations = [[]];

	// 1st loop to iterate through nums arr
	for (let i = 0; i < nums.length; i++) {
		const currentNumber = nums[i];
		// we will take all existing permutations and add the current number to create new permutations
		const n = permutations.length;
		// 2nd loop to construct permutation options
		for (let p = 0; p < n; p++) {
			const oldPermutation = permutations.shift();
			// 3rd loop to insert element in permutation options
			// create a new permutation by adding the current number at every position
			// length + 1 because we are inserting new element, we can place element in an extra position
			for (let j = 0; j < oldPermutation.length + 1; j++) {
				const newPermutation = oldPermutation.slice(0); // clone the permutation
				newPermutation.splice(j, 0, currentNumber); // insert currentNumber at index 'j'
				if (newPermutation.length === numsLength) {
					result.push(newPermutation);
				} else {
					// if length does not match, push to permutations to continously add numbers to it
					permutations.push(newPermutation);
				}
			}
		}
	}
	return result;
};
// console.log(find_permutations_bfs([1, 3, 5]));

/*------------------- P4. String Permutations by changing case  --------------------- N * 2^N
Given a string, find all of its permutations preserving the character sequence but changing case
*/
function find_letter_case_string_permutations(str) {
	const permutations = [];
	permutations.push(str);

	// Process every character of the string one by one
	for (let i = 0; i < str.length; i++) {
		// Process only characters, skip digits
		if (isNaN(parseInt(str[i], 10))) {
			// Take all existing permutations and change the letter case appropriately
			const n = permutations.length;
			for (let j = 0; j < n; j++) {
				const chs = permutations[j].split(''); // string to Arr
				// if the current char is in upper case, change to lower or vice versa
				if (chs[i] === chs[i].toLowerCase()) {
					chs[i] = chs[i].toUpperCase();
				} else {
					chs[i] = chs[i].toLowerCase();
				}
				permutations.push(chs.join(''));
			}
		}
	}
	return permutations;
}
// console.log(find_letter_case_string_permutations('ab7c'));
