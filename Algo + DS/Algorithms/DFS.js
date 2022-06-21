class TreeNode {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

/*------------------- 1. Binary Tree Path Sum  ---------------------
Given a binary tree and a number ‘S’, find if the tree has a path from root-to-leaf such that the sum of all the node values of that path equals ‘S’.
*/
function hasPath(root, sum) {
	if (root === null) {
		return false;
	}

	// if the current node is a leaf and its value is equal to the sum, we've found a path
	if (root.value === sum && root.left === null && root.right === null) {
		return true;
	}

	// recursively call to traverse the left and right sub-tree
	// return true if any of the two recursive call return true
	return (
		hasPath(root.left, sum - root.value) ||
		hasPath(root.right, sum - root.value)
	);
}

/*------------------- 2. All Paths for a Sum ---------------------
Given a binary tree and a number ‘S’, find all paths from root-to-leaf such that the sum of all the node values of each path equals ‘S’.
*/

function find_paths(root, sum) {
	if (!root) return [];
	const result = [];

	const dfs = (node, tempSum = 0, path = []) => {
		path.push(node.value);
		tempSum += node.value;

		if (!node.left && !node.right && tempSum === sum) {
			result.push(path);
		}

		if (node.left) dfs(node.left, tempSum, [...path]);
		if (node.right) dfs(node.right, tempSum, [...path]);
	};

	dfs(root);
	return result;
}

/*------------------- 3. Sum of Path Numbers ---------------------
Given a binary tree where each node can only have a digit (0-9) value, each root-to-leaf path will represent a number. Find the total sum of all the numbers represented by all paths.
*/
const find_sum_of_path_numbers = function (root) {
	if (!root) return 0;
	let total = 0;

	const dfs = (node, tempSum = 0) => {
		tempSum = tempSum * 10 + node.value;

		if (!node.left && !node.right) {
			total += tempSum;
		}

		if (node.left) dfs(node.left, tempSum);
		if (node.right) dfs(node.right, tempSum);
	};
	dfs(root);
	return total;
};

/*------------------- 4. Path With Given Sequence ---------------------
Given a binary tree and a number sequence, find if the sequence is present as a root-to-leaf path in the given tree.
*/
const find_path = function (root, sequence) {
	if (!root) return sequence.length === 0;

	const seqLength = sequence.length;

	const dfs = (node, index = 0) => {
		if (!node) return false;

		if (index >= seqLength || node.value !== sequence[index]) {
			return false;
		}

		if (!node.left && !node.right && index === seqLength - 1) {
			return true;
		}

		return dfs(node.left, index + 1) || dfs(node.right, index + 1);
	};
	return dfs(root);
};

