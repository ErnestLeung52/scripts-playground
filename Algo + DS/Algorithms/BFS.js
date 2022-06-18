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

/*------------------- 3. Zigzag Traversal  ---------------------
Given a binary tree, populate an array to represent its zigzag level order traversal. You should populate the values of all nodes of the first level from left to right, then right to left for the next level and keep alternating in the same manner for the following levels.
*/
const zigzag = function (root) {
	const result = [];

	if (root === null) return result;

	const queue = [];
	queue.push(root);
	leftToRight = true;

	while (queue.length > 0) {
		const levelSize = queue.length;
		const level = [];

		for (let i = 0; i < levelSize; i++) {
			const currentNode = queue.shift();
			if (leftToRight) {
				level.push(currentNode.val);
			} else {
				level.unshift(currentNode.val);
			}

			if (currentNode.left) {
				queue.push(currentNode.left);
			}
			if (currentNode.right) {
				queue.push(currentNode.right);
			}
		}

		result.push(level);
		leftToRight = !leftToRight;
	}
	return result;
};

