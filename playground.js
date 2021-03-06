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

var head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);

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
