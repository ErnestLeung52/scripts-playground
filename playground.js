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
