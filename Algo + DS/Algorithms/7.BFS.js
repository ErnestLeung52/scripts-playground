class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

/*------------------- 1. Binary Tree Level Order Traversal ---------------------
Given a binary tree, populate an array to represent its level-by-level traversal. You should populate the values of all nodes of each level from left to right in separate sub-arrays.
        1
      2   3
    4  5 6  7
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
        1
      2   3
    4  5 6  7
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

/*------------------- 4. Level Averages in a Binary Tree  ---------------------
Given a binary tree, populate an array to represent the averages of all of its levels.
*/
const find_level_averages = function (root) {
	const result = [];
	const queue = [];
	queue.push(root);

	while (queue.length > 0) {
		// Need to fix levelSize because queue is constantly changing
		const levelSize = queue.length;
		let sum = 0;

		for (let i = 0; i < levelSize; i++) {
			const currentNode = queue.shift();
			sum += currentNode.val;

			if (currentNode.left) {
				queue.push(currentNode.left);
			}
			if (currentNode.right) {
				queue.push(currentNode.right);
			}
		}
		result.push(sum / levelSize);
	}
	return result;
};

/*------------------- 5.1 Minimum Depth of a Binary Tree  ---------------------
Find the minimum depth of a binary tree. The minimum depth is the number of nodes along the shortest path from the root node to the nearest leaf node.
*/
const find_minimum_depth = function (root) {
	if (!root) return 0;

	const queue = [];
	queue.push(root);

	let minimumDepth = 0;

	while (queue.length > 0) {
		const levelSize = queue.length;

		minimumDepth += 1;

		for (let i = 0; i < levelSize; i++) {
			const currentNode = queue.shift();

			if (!currentNode.left && !currentNode.right) {
				return minimumDepth;
			}

			if (currentNode.left) {
				queue.push(currentNode.left);
			}
			if (currentNode.right) {
				queue.push(currentNode.right);
			}
		}
	}
};

/*------------------- 5.2 Maximum Depth of a Binary Tree  ---------------------
Given a binary tree, find its maximum depth (or height)
*/
const find_maximum_depth = function (root) {
	if (!root) return 0;

	const queue = [];
	queue.push(root);

	let maxDepth = 0;

	while (queue.length > 0) {
		const levelSize = queue.length;

		maxDepth += 1;

		for (let i = 0; i < levelSize; i++) {
			const currentNode = queue.shift();

			if (currentNode.left) queue.push(currentNode.left);
			if (currentNode.right) queue.push(currentNode.right);
		}
	}

	return maxDepth;
};

/*------------------- 6. Level Order Successor  ---------------------
Given a binary tree and a node, find the level order successor of the given node in the tree. The level order successor is the node that appears right after the given node in the level order traversal.
*/
const find_successor = function (root, key) {
	if (!root) return null;

	const queue = [];
	queue.push(root);

	while (queue.length > 0) {
		const currentNode = queue.shift();

		if (currentNode.left) {
			queue.push(currentNode.left);
		}
		if (currentNode.right) {
			queue.push(currentNode.right);
		}

		if (currentNode.val === key) {
			break;
		}
	}

	if (queue.length > 0) {
		return queue.shift();
	}
	return null;
};

/*------------------- 7. Connect Level Order Siblings  ---------------------
Given a binary tree, connect each node with its level order successor. The last node of each level should point to a null node.
*/
function connect_level_order_siblings(root) {
	if (!root) return null;

	const queue = [];
	queue.push(root);

	while (queue.length > 0) {
		let previousNode = null,
			levelSize = queue.length;
		// connect all nodes of this level
		for (let i = 0; i < levelSize; i++) {
			const currentNode = queue.shift();

			if (previousNode !== null) {
				previousNode.next = currentNode;
			}
			previousNode = currentNode;

			if (currentNode.left) {
				queue.push(currentNode.left);
			}
			if (currentNode.right) {
				queue.push(currentNode.right);
			}
		}
	}
}

/*------------------- 8. Connect All Level Order Siblings  ---------------------
Given a binary tree, connect each node with its level order successor. The last node of each level should point to the first node of the next level.
*/
const connect_all_siblings = function (root) {
	if (!root) return null;

	const queue = [];
	queue.push(root);

	let currentNode = null,
		previousNode = null;

	while (queue.length > 0) {
		currentNode = queue.shift();

		if (previousNode) {
			previousNode.next = currentNode;
		}

		previousNode = currentNode;

		if (currentNode.left) queue.push(currentNode.left);
		if (currentNode.right) queue.push(currentNode.right);
	}
};

/*------------------- 9. ConnectRight View of a Binary Tree  ---------------------
Given a binary tree, return an array containing nodes in its right view. The right view of a binary tree is the set of nodes visible when the tree is seen from the right side.
*/
function tree_right_view(root) {
	const result = [];

	if (!root) return result;

	const queue = [];
	queue.push(root);

	while (queue.length > 0) {
		const levelSize = queue.length;
		// const level = [];

		for (let i = 0; i < levelSize; i++) {
			const currentNode = queue.shift();

			// level.push(currentNode.val);
            if (i === levelSize - 1) {
                result.push(currentNode.val)
            }

			if (currentNode.left) queue.push(currentNode.left);
			if (currentNode.right) queue.push(currentNode.right);
		}

		// result.push(level[level.length - 1]);
	}
	return result;
}

