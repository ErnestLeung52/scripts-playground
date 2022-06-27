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

/*------------------- 5. Count Paths for a Sum --------------------- Leetcode 437
Given a binary tree and a number ‘S’, find all paths in the tree such that the sum of all the node values of each path equals ‘S’. Please note that the paths can start or end at any node but all paths must follow direction from parent to child (top to bottom).
*/
const count_paths = function (root, S) {
	if (!root) return 0;
	let result = 0;

	const helper = (node, tempSum) => {
		if (!node) return;

		tempSum += node.value;
		if (tempSum === S) {
			result += 1;
		}
		console.log(tempSum);
		return helper(node.left, tempSum) || helper(node.right, tempSum);
	};

	const inOrderDfs = (node) => {
		if (!node) return;

		if (node.left) inOrderDfs(node.left);

		helper(node, 0);
		console.log(node.value);

		if (node.right) inOrderDfs(node.right);
	};

	inOrderDfs(root);
	return result;
};
// In-order traversal. From the most left leaf node, we will add the value to tempSum then check if it has child to add it to tempSum
// Thnk of it as two for loops, inOrderDfs to traverse all nodes, inner loop helper to find all potential sum going downward

/*------------------- 6. Tree Diameter ---------------------
Given a binary tree, find the length of its diameter. The diameter of a tree is the number of nodes on the longest path between any two leaf nodes. The diameter of a tree may or may not pass through the root.

Note: You can always assume that there are at least two leaf nodes in the given tree.
*/
function find_diameter(root) {
	let diameter = 0;

	function helper(node) {
		if (!node) return 0;
        console.log(node.value);
                                              // 4 2 5 6 3 1
		const leftPath = helper(node.left);   // 0 1 0 0 1 2
		const rightPath = helper(node.right); // 0 0 0 0 1 2
		
        diameter = Math.max(diameter, leftPath + rightPath);
		return Math.max(leftPath, rightPath) + 1;
	}
	helper(root);
	return diameter;
}
// const root = new TreeNode(1);
// root.left = new TreeNode(2);
// root.right = new TreeNode(3);
// root.left.left = new TreeNode(4);
// root.right.left = new TreeNode(5);
// root.right.right = new TreeNode(6);
// console.log(find_diameter(root));

/*------------------- 7. Path with Maximum Sum ---------------------

*/