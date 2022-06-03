class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

const breadthFirstSearch = function (root) {
	// Self Answered ----------
	const result = [];
	if (!root) return result;

	const queue = [];
	queue.push(root);

	while (queue.length > 0) {
		let currentNode = queue.shift();
		result.push(currentNode.val);

		if (currentNode.left) {
			queue.push(currentNode.left);
		}

		if (currentNode.right) {
			queue.push(currentNode.right);
		}
	}
	return result;

	// Push into sub-array for each level ----------
	// const result = [];
	// if (!root) return result;

	// const queue = [];
	// queue.push(root);
	// while (queue.length > 0) {
	// 	const levelSize = queue.length;
	// 	currentLevel = [];
	// 	for (i = 0; i < levelSize; i++) {
	// 		currentNode = queue.shift();
	// 		// add the node to the current level
	// 		currentLevel.push(currentNode.val);
	// 		// insert the children of current node in the queue
	// 		if (currentNode.left !== null) {
	// 			queue.push(currentNode.left);
	// 		}
	// 		if (currentNode.right !== null) {
	// 			queue.push(currentNode.right);
	// 		}
	// 	}
	// 	result.push(currentLevel);
	// }

	// return result;
};

const root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);

console.log(breadthFirstSearch(root));

const arr = [1, 2];

// for (let i = 0; i < arr.length; i += 1) {
//     arr.push(3)
//     arr.push(4)
//     arr.push(5)
//     console.log(arr.length)
// }

// while (arr.length > 0) {
// 	console.log(arr.length);
//     arr.pop()
// }
