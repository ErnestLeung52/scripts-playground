// ((()))

const checkParen = (s) => {
	const match = { '(': ')' };
	const stack = [];

	for (let i = 0; i < s.length; i++) {
		const paren = s[i];
		if (paren in match) {
			stack.push(match[paren]);
		} else if (paren !== stack.pop()) {
			return false;
		}
	}
	return stack.length === 0;
};

const maxProfit = (prices) => {
	let left = 0; // Buy
	let right = 1; // sell
	let max_profit = 0;
	while (right < prices.length) {
		if (prices[left] < prices[right]) {
			let profit = prices[right] - prices[left]; // our current profit

			max_profit = Math.max(max_profit, profit);
		} else {
			left = right;
		}
		right++;
	}
	return max_profit;
};

var maxDepth = function (root) {
	if (!root) return 0;
	const queue = [root];
	let depth = 0;
	while (queue.length !== 0) {
		depth++;
		const len = queue.length;
		for (let i = 0; i < len; i++) {
			if (queue[i].left) queue.push(queue[i].left);
			if (queue[i].right) queue.push(queue[i].right);
		}
		queue.splice(0, len);
	}
	return depth;
};

var isBalanced = function (root) {
	//handle case when root itself is null
	if (root === null) return true;
	//turns to false if unbalanced tree encountered
	let flag = true;
	//recursive function - it recursively returns the height of the tree
	function helper(root) {
		//base case of recursion - tree with no nodes return height 0
		if (root.left === null && root.right === null) {
			return 0;
		}
		let leftHeight = 0,
			rightHeight = 0;
		if (root.left !== null) {
			//height of left subtree is one plus the height of child sub tree
			leftHeight = 1 + helper(root.left);
		}
		if (root.right !== null) {
			//height of right subtree is one plus the height of child sub tree
			rightHeight = 1 + helper(root.right);
		}
		//height of tree is max between height of left and right subtree
		let actualHeight = Math.max(leftHeight, rightHeight);
		//if abs diff between leftHt and right Ht greater than one; turn flag to false
		if (Math.abs(leftHeight - rightHeight) > 1) flag = false;
		return actualHeight;
	}
	helper(root);
	return flag;
};

function palindrome(
	string,
	cleanString = string.replace(/\W/g, '').toLowerCase(),
	leftIndex = 0,
	rightIndex = cleanString.length - 1
) {
	// remove all symbols, punctuation, etc. from string
	// convert all characters in string to lowercase
	// declare two default variables: leftIndex, rightIndex
	// declare a base case: when leftIndex and rightIndex come together, return true
	if (leftIndex >= rightIndex) return true;
	// if leftIndex and rightIndex are not equal, return false
	if (cleanString[leftIndex] !== cleanString[rightIndex]) return false;
	// return palindrome, increase leftIndex + 1, decrement rightIndex - 1
	return palindrome(string, cleanString, leftIndex + 1, rightIndex - 1);
}

class Node {
	constructor(value, next = null) {
		this.value = value;
		this.next = next;
	}
}

function reverse(head) {
	let curr = head;
	let prev = null;
	let next;

	while (curr !== null) {
		next = curr.next;
		curr.next = prev;
		prev = curr;
		curr = next;
	}
	return prev;
}

// var head = new Node(1);
// head.next = new Node(2);
// head.next.next = new Node(3);

// console.log(reverse(head));

var isValid = function (s) {
	// when we see a leftP, we will push the rightP into a stack
	// when we see a rightP, we will check if rightP is equal to the top of stack
	if (s.length === 0) return true;
	if (s.length === 1) return false;
	if (s.length % 2 !== 0) return false;

	const map = new Map();
	map.set('(', ')');
	map.set('[', ']');
	map.set('{', '}');

	const stack = [];
	// const rightParen = Array.from(map.values())

	for (let i = 0; i < s.length; i++) {
		const paren = s[i];
		stack;
		if (map.has(paren)) {
			stack.push(map.get(paren));
		} else if (paren !== stack.pop()) {
			return false;
		}
	}

	return stack.length === 0;
};
// console.log(isValid('({[]})'));

/*
 * accepts an object and returns an object with key and values switched
 * ex: reverseObject({a:1,b:"c","d":4}); -> {1:a,c:"b",4:"d"}
 */

const reverseObj = (obj) => {
	const output = {};

	for (let key in obj) {
		output[obj[key]] = key;
	}

	return output;
};

// console.log(reverseObj({ a: 1, b: 'c', d: 4 }));

/////////////////

function BinarySearchTree(value) {
	this.value = value; // 8
	this.right = null;
	this.left = null;
	// console.log(value);
}

BinarySearchTree.prototype.add = function (value) {
	// console.log(value);
	const leaf = new BinarySearchTree(value);
	if (value > this.value) {
		if (this.right === null) {
			this.right = leaf;
		} else {
			this.right.add(value);
		}
	} else if (value < this.value) {
		if (this.left === null) {
			this.left = leaf;
		} else {
			this.left.add(value);
		}
	}
};

// BinarySearchTree(8);

BinarySearchTree.prototype.contains = function (value) {
	// When node is equal to value
	// if (this.left === undefined || this.right === undefined) return false;

	if (this.value === value) {
		return true;
	}

	// When node is less than value
	if (value < this.value && this.left) {
		return this.left.contains(value);

		// When node is greater than value
	} else if (value > this.value && this.right) {
		return this.right.contains(value);
	}

	return false;
};

// const tree = new BinarySearchTree(8);
// tree.add(5);
// tree.add(10);
// tree.add(20);

// console.log(tree.contains(10));

/*
Extension:

Given an arbitrarily nested array of numbers (integers), return the mode, that
is, the number that appears most often. If there are multiple modes, use the max
of the modes.

Assume that at least one number is present in the nested array structure,
although some of the nested arrays may be empty.

e.g.
mode([[3], [2, [4]], 3]) -> 3
mode([7, [[5, [8], 8], 2, 5]]) -> 8
mode([4, []]) -> 4
*/

const nestedMode = (input) => {
	const freq = {};

	const compare = (arr) => {
		for (let i = 0; i < arr.length; i++) {
			const el = arr[i];
			if (Array.isArray(el)) {
				compare(el);
			} else {
				// flatten.push(el);
				freq[el] = freq[el] ? freq[el] + 1 : 1;
			}
		}
	};
	compare(input);

	let maxKey = -Infinity;
	let maxVal = -Infinity;

	for (const key in freq) {
		const val = freq[key];

		if (val >= maxVal && Number(key) >= maxKey) {
			maxKey = Number(key);
			maxVal = val;
		}
	}

	return maxKey;
};

// console.log(nestedMode([7, [[5, [8], 8], 2, 5]]));

//**
// const array = [{id: 'a', data: '1'}, {id: 'b', data: '2'}]
// const arrayMap = new Map();

// array.forEach((item) => {
// 	if (!arrayMap.get(item.id)) {
// 		arrayMap.set(item.id, item.data)
// 	}
// })

// const renameOutputFile = (fileName, i = 1) => {
// 	if (i === 20) return;

// 	const fileNameWithoutExt = fileName.replace(/.json/g, '');
// 	const fileNameLetters = fileNameWithoutExt.replace(/[^a-z]/gi, '');
// 	const newDigits = Number(fileNameWithoutExt.replace(/\D/g, '')) + 1;
// 	const newFileName = fileNameLetters + newDigits + '.json';

// 	console.log(newFileName);

// 	return renameOutputFile(newFileName, (i += 1));
// };

// renameOutputFile('output.json');

const string = `{
	hello  1
	user {  
		username  1.5
		firstLetterOfUsername {
			firstLetterOfUsername   1.5*2
		}
		dsairstLetterOfUsername {
			firstLetterOfUsername {   
			 second                  1.5*2*2
			}
			firstLetterOfUsername { 
					name                 1.5*2*2 
					second {
							dsadas {
									dsadsa       1.5*2*2*2*2
							}
					}
				 }
		}
	}
}`;

const timestamp = new Date().getTime();
console.log(timestamp);
// 1668682959
const jwt = 1668683784 * 1000;

const diff = jwt - timestamp;

let minute = Math.floor(diff / 1000 / 60);

console.log(minute);
