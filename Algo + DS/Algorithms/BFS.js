class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

/*------------------- 1. Binary Tree Level Order Traversal ---------------------
Given a binary tree, populate an array to represent its level-by-level traversal. You should populate the values of all nodes of each level from left to right in separate sub-arrays.
*/
const BFS = function (root) {
	result = [];
	if (root === null) {
		return result;
	}

	const queue = [];
	queue.push(root);

	while (queue.length > 0) {
		const levelSize = queue.length;
		const currentLevel = [];
		for (i = 0; i < levelSize; i++) {
			currentNode = queue.shift();
			// add the node to the current level
			currentLevel.push(currentNode.val);
			// insert the children of current node in the queue
			if (currentNode.left !== null) {
				queue.push(currentNode.left);
			}
			if (currentNode.right !== null) {
				queue.push(currentNode.right);
			}
		}
		result.push(currentLevel);
	}

	return result;
};

/*------------------- 2. Reverse Level Order Traversal ---------------------
Given a binary tree, populate an array to represent its level-by-level traversal in reverse order, i.e., the lowest level comes first. You should populate the values of all nodes in each level from left to right in separate sub-arrays.
*/
const BFSreverse = function (root) {
	const result = [];

	const queue = [];
	queue.push(root);

	while (queue.length > 0) {
		const levelSize = queue.length;
		const currentLevel = [];

		for (let i = 0; i < levelSize; i++) {
			let currentNode = queue.shift();

			if (currentNode.left) {
				queue.push(currentNode.left);
			}
			if (currentNode.right) {
				queue.push(currentNode.right);
			}
			currentLevel.push(currentNode.val);
		}
		result.unshift(currentLevel);
	}
    return result;
};

const root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(BFSreverse(root));