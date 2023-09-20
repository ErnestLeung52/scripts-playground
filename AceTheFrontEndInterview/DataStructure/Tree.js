const heightBalancedTree = (root) => {
	/* 1. Start from the leaf nodes and move towards the root
  2. Along with traversing the tree, compute the heights of left-subtree and right-subtree of each node. The height of a leaf node is always 0
  3. At each node, check if the difference between the height of the ​left and right sub-tree is more than 1. If so, then it means that the tree is not balanced.
  4. If you have completely traversed the tree and haven’t caught the above condition, then the tree is balanced.
  * This solution will continue to traverse the rest of the tree even if it finds it unbalanced because of the flag.
  */
	if (!root) return true;
	let isBalanced = true;

	const helper = (node, height) => {
		if (!node) return 0;

		const hleftTree = helper(node.left, height + 1);
		const hRightTree = helper(node.right, height + 1);

		if (Math.abs(hleftTree - hRightTree) > 1) {
			isBalanced = false;
		}

		return Math.max(hleftTree, hRightTree) + 1;
	};

	helper(root, 0);

	return isBalanced;
};

const heightBalancedTree_1 = (root) => {
	if (!root) return true;

	const dfs = (node, height) => {
		if (!node) return 0;

		const leftHeight = dfs(node.left);
		const rightHeight = dfs(node.right);

		if (Math.abs(leftHeight - rightHeight) > 1) {
			return -1;
		}

		return Math.max(leftHeight, rightHeight) + 1;
	};
};
