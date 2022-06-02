class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

const breadthFirstSearch = function (root) {
	const result = [];
	if (!root) return result;

	const queue = [];
	queue.push(root);

	while (queue.length > 0) {
		let currentNode = queue.shift();
		result.push(currentNode.val);

		if (currentNode.leftChild) {
			queue.push(currentNode.leftChild);
		}

		if (currentNode.rightChild) {
			queue.push(currentNode.rightChild);
		}
	}

	return result;

	// while (queue.length > 0) {
	// 	// const levelSize = queue.length;
	// 	currentLevel = [];
	// 	for (let i = 0; i < queue.length; i += 1) {
	// 		const currentNode = queue.shift();
	// 		currentLevel.push(currentNode.val);
	// 		if (currentNode.leftChild !== null) {
	// 			queue.push(currentNode.leftChild);
	// 		}
	// 		if (currentNode.rightChild !== null) {
	// 			queue.push(currentNode.rightChild);
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

console.log(breadthFirstSearch(root))