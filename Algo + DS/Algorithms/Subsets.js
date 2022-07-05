/*------------------- P1. Subsets  --------------------- N * 2^N
Given a set with distinct elements, find all of its distinct subsets.
*/
const find_subsets = function (nums) {
	const subsets = [];
	// start by adding the empty subset
	subsets.push([]);
	// 1st loop: iterate through nums
	for (i = 0; i < nums.length; i++) {
		currentNumber = nums[i];
		// we will take all existing subsets and insert the current number in them to create new subsets
		const n = subsets.length;
		// 2nd loop: iterate through all the combination in subsets so we can add a new element to each of subArr
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
      1    2    3
   123    213    312
123 132 213 231 312 321
*/
const find_permutations_dfs = function (nums) {
	const result = [];

	const dfs = (i, nums) => {
		// Base level: reach leaf level make a copy and push
		if (i === nums.length) {
			result.push(nums.slice());
			return;
		}
		// Need to increase j even after every dfs call
		for (let j = i; j < nums.length; j++) {
			// Swapping number
			[nums[j], nums[i]] = [nums[i], nums[j]]; // j = 1 i= 0
			dfs(i + 1, nums); // dfs(0 + 1) j = 2 i = 1
			// Revert back the number
			[nums[i], nums[j]] = [nums[j], nums[i]];
		}
	};

	dfs(0, nums);
	return result;
};
// console.log(find_permutations_dfs([1, 2, 3]));

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
			// 把没有建造完成的permu 从queue 提取出来当做一个copy
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
Tips: tree structure, copy from first level add modified to second level + previous level
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
			// Loop through all case sets from permutations, for each of them, convert to arr and check for the corresponding character from the set to see whether it is upper/lower
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

/*------------------- P5. Balanced Parentheses --------------------- Leetcode 22
For a given number ‘N’, write a function to generate all combination of ‘N’ pairs of balanced parentheses.
*/
class ValidParenthesis {
	constructor(string, openCounts, closeCounts) {
		(this.string = string),
			(this.openCounts = openCounts),
			(this.closeCounts = closeCounts);
	}
}
// As long as open count < n, we add '(';
// As long as close count < open count, we add ')';
const generateParenthesis_bfs = function (n) {
	const result = [];
	const queue = [];
	queue.push(new ValidParenthesis('', 0, 0));

	while (queue.length > 0) {
		//console.log('queue', queue)
		const currentSub = queue.shift();
		if (currentSub.openCounts === n && currentSub.closeCounts === n) {
			result.push(currentSub.string);
		}
		if (currentSub.openCounts < n) {
			queue.push(
				new ValidParenthesis(
					`${currentSub.string}(`,
					currentSub.openCounts + 1,
					currentSub.closeCounts
				)
			);
		}
		if (currentSub.closeCounts < currentSub.openCounts) {
			queue.push(
				new ValidParenthesis(
					`${currentSub.string})`,
					currentSub.openCounts,
					currentSub.closeCounts + 1
				)
			);
		}
	}
	return result;
};

// N * 2^N
const generateParenthesis_dfs = function (n) {
	const result = [];

	const dfs = (str, open, close) => {
		// Backtracking case: number of ')' can't be more than number of '('
		if (open < close) return;

		// Base case: there are n number of open and close parenthesis
		if (open === n && close === n) {
			result.push(str);
			return;
		}

		// DFS traversal
		if (open < n) dfs(str + '(', open + 1, close);
		if (close < n) dfs(str + ')', open, close + 1);
	};

	dfs('', 0, 0);
	return result;
};
// console.log(generateParenthesis_dfs(2));

/*------------------- P6. Unique Generalized Abbreviations ---------------------
Given a word, write a function to generate all of its unique generalized abbreviations.
Input: "BAT"
Output: "BAT", "BA1", "B1T", "B2", "1AT", "1A1", "2T", "3"
*/
class AbbreviatedWord {
	constructor(str, start, count) {
		this.str = str;
		this.start = start;
		this.count = count;
	}
}
function generate_generalized_abbreviation(word) {
	let wordLen = word.length,
		result = [];
	const queue = [];
	queue.push(new AbbreviatedWord('', 0, 0));
	while (queue.length > 0) {
		const abWord = queue.shift();
		if (abWord.start === wordLen) {
			if (abWord.count !== 0) {
				abWord.str += abWord.count;
			}
			result.push(abWord.str);
		} else {
			// continue abbreviating by incrementing the current abbreviation count
			queue.push(
				new AbbreviatedWord(
					abWord.str,
					abWord.start + 1,
					abWord.count + 1
				)
			);

			// restart abbreviating, append the count and the current character to the string
			if (abWord.count !== 0) {
				abWord.str += abWord.count;
			}

			let newWord = abWord.str + word[abWord.start];
			queue.push(new AbbreviatedWord(newWord, abWord.start + 1, 0));
		}
	}
	return result;
}

/*------------------- P7. Evaluate Expression ---------------------
Given an expression containing digits and operations (+, -, *), find all possible ways in which the expression can be evaluated by grouping the numbers and operators using parentheses.
*/

/*------------------- P8. Unique Binary Search Trees ---------------------
Given a number ‘n’, write a function to return all structurally unique Binary Search Trees (BST) that can store values 1 to ‘n’?
*/
class TreeNode {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}
function find_unique_trees(n) {
	if (n <= 0) {
		return [];
	}
	return findUnique_trees_recursive(1, n);
}
function findUnique_trees_recursive(start, end) {
	const result = [];
	// base condition, return 'null' for an empty sub-tree
	// consider n = 1, in this case we will have start = end = 1, this means we should have only one tree
	// we will have two recursive calls, findUniqueTreesRecursive(1, 0) & (2, 1)
	// both of these should return 'null' for the left and the right child
	if (start > end) {
		result.push(null);
		return result;
	}

	for (let i = start; i < end + 1; i++) {
		// making 'i' the root of the tree
		const leftSubtrees = findUnique_trees_recursive(start, i - 1);
		const rightSubtrees = findUnique_trees_recursive(i + 1, end);
		for (let p = 0; p < leftSubtrees.length; p++) {
			for (let q = 0; q < rightSubtrees.length; q++) {
				const root = new TreeNode(i, leftSubtrees[p], rightSubtrees[q]);
				result.push(root);
			}
		}
	}

	return result;
}
// console.log(find_unique_trees(3));
