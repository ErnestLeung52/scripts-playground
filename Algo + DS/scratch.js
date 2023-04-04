class ListNode {
	constructor(val, next) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}

class TreeNode {
	constructor(val, left, right) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}

/* 21. Merge Two Sorted Lists
You are given the heads of two sorted linked lists list1 and list2.
Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.
Return the head of the merged linked list.
[0,2,4], [1,3,5]
*/

// O(n): total of nodes in l1 & l2
var mergeTwoLists = function (list1, list2) {
	// Create a new node, and assign a variable curr to the head
	// Compare the first node from 2 lists
	// point the next of curr to the smaller node
	// move to the next node of which ever list that had the node
	// reassign curr to point to the next node

	const dummyHead = new ListNode(null);
	let tail = dummyHead;

	while (list1 && list2) {
		if (list1.val < list2.val) {
			tail.next = list1;
			list1 = list1.next;
		} else {
			tail.next = list2;
			list2 = list2.next;
		}
		tail = tail.next;
	}
	// Either list1 or/and list2 no longer have any more values to compare
	// If one does, have the new ListNode copy its remaining values
	tail.next = list1 || list2;
	return dummyHead.next;
};

const l1 = new ListNode(0);
l1.next = new ListNode(2);
// l1.next.next = new ListNode(4);

const l2 = new ListNode(1);
// l2.next = new ListNode(3);
// l2.next.next = new ListNode(5);

// console.log(mergeTwoLists(l1, l2));

/* 121. Best Time to Buy and Sell Stock
You are given an array prices where prices[i] is the price of a given stock on the ith day.
You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
[7,1,5,3,6,4]
*/

var maxProfit = function (prices) {
	// Create maxProfit variable to keep track of the highest profit
	// Iterate through arr
	// Calc profit between 2 prices
	// if there is a profit, compare with maxProfit

	let maxProfit = 0;
	let lowestPrice = prices[0];

	for (let i = 1; i < prices.length; i++) {
		const tempProfit = prices[i] - lowestPrice;

		maxProfit = Math.max(maxProfit, tempProfit);

		lowestPrice = Math.min(lowestPrice, prices[i]);
	}

	return maxProfit;
};
// console.log(maxProfit([7, 1, 5, 3, 6, 4]));

/* 125. Valid Palindrome 
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.
*/
function isPalindrome(s) {
	// Convert to lowercase and remove non-alphanumeric characters
	s = s.toLowerCase().replace(/[^a-z0-9]/g, '');

	let endIdx = s.length - 1;

	for (let i = 0; i < s.length; i++) {
		if (s[i] !== s[endIdx]) {
			return false;
		}
		endIdx--;
	}

	return true;
}
// console.log(isPalindrome('A man, a plan, a canal: Panama'));

/* 226. Invert Binary Tree
Given the root of a binary tree, invert the tree, and return its root.
*/

function invertTree(root) {
	if (root === null) return null;
	// DFS

	// [root.left, root.right] = [root.right, root.left];

	// invertTree(root.left);
	// invertTree(root.right);

	// return root;

	// BFS
	const queue = [root];

	while (queue.length !== 0) {
		// console.log(queue);
		// remove the first node
		const node = queue.shift();

		[node.left, node.right] = [node.right, node.left];

		if (node.left) queue.push(node.left);
		if (node.right) queue.push(node.right);
	}

	return root;
}

const tree = new TreeNode(4);
tree.left = new TreeNode(2);
tree.left.left = new TreeNode(1);
tree.left.right = new TreeNode(3);
tree.right = new TreeNode(7);
tree.right.left = new TreeNode(6);
tree.right.right = new TreeNode(9);

// invertTree(tree);
// console.log();

/* 242. Valid Anagram
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Input: s = "anagram", t = "nagaram"
Output: true
*/

// Create a map to store the letter as key, and frequency as value
const isAnagram = (s, t) => {
	if (!s || !t) return false;
	if (s.length !== t.length) return false;

	const cache = {};

	for (let i = 0; i < s.length; i++) {
		cache[s[i]] = cache[s[i]] ? cache[s[i]] + 1 : 1;
	}

	for (let j = 0; j < t.length; j++) {
		if (cache[t[j]]) {
			cache[t[j]]--;
		} else {
			return false;
		}
	}

	for (let letter in cache) {
		if (cache[letter] !== 0) {
			return false;
		}
	}

	return true;
};

// console.log(isAnagram('anagram', 'nagaram'));

/* 704. Binary Search
Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
*/

const search = (nums, target) => {
	let start = 0;
	let end = nums.length - 1;

	while (start <= end) {
		const mid = Math.floor(start + (end - start) / 2);

		if (nums[mid] === target) {
			return mid;
		} else if (nums[mid] < target) {
			start = mid + 1;
		} else {
			end = mid - 1;
		}
	}
	return -1;
};

/* 733. Flood Fill
An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.

You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].

To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with color.
*/

const floodFill = (image, sr, sc, color) => {
	const startColor = image[sr][sc];

	// when curColor already becomes the new color
	if (startColor === color) return image;

	const dfs = (image, row, col) => {
		// when the current color is out of bound of the image
		if (row >= image.length || row < 0 || col >= image[0].length || col < 0) {
			return;
		}

		// Since we are only affecting pixel with the same color
		// if the near by color does not match the starting color, then we do nothing
		if (image[row][col] !== startColor) {
			return;
		}

		// change the curr Color to the new color
		image[row][col] = color;

		dfs(image, row + 1, col); // up
		dfs(image, row - 1, col); // down
		dfs(image, row, col + 1); // right
		dfs(image, row, col - 1); // left
	};

	dfs(image, sr, sc);

	return image;
};

/* 235. Lowest Common Ancestor of a Binary Search Tree
Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”
*/
// O(logN )
function lowestCommonAncestor(root, p, q) {
	// top root is always the common ancestor but not the lowest
	// p is less than curNode then it will be in the left subtree
	// q is less than curNode then it will be in the right subtree
	// this means we are going to different sub-tree -> current root is the LCA

	// if both p & q is > root, then we go to the right subtree
	//
	if (!root || root === p || root === q) {
		return root;
	}

	if (p.val < root.val && q.val < root.val) {
		return lowestCommonAncestor(root.left, p, q);
	}

	if (p.val > root.val && q.val > root.val) {
		return lowestCommonAncestor(root.right, p, q);
	}

	return root;
}

/* 110. Balanced Binary Tree
Given a binary tree, determine if it is 
height-balanced
*/
const isBalanced = (root) => {
	// A flag to check if the tree is balanced or not
	let flag = true;

	// Helper function to check if the tree is balanced or not
	const get_heights = (node, height) => {
		// Empty tree? It's 0 in height
		if (!node) {
			return 0;
		}

		// Get my left and right heights
		// by adding 1 to the height of the left and right subtrees.
		// each time we move down them
		const left_height = get_heights(node.left, height + 1);
		const right_height = get_heights(node.right, height + 1);

		// Let's use some math.
		// Technically, if we have a balanced tree, the difference
		// should always be 0. But because, this question is awkward, we need to check if
		// if its diff is greater than 1. So we minus the two by using absolutes values and asking
		// if the diff in this sub tree was greater than 1. If so bad un balanced.
		if (Math.abs(right_height - left_height) > 1) {
			flag = false;
		}

		// Return the height of the tree
		// By returning whoever had the bigger height and adding 1 (Our current node)
		return Math.max(left_height, right_height) + 1;
	};

	// Call the helper function
	get_heights(root, 0);

	// Get the flag back to base. :D
	return flag;

	// let isBalanced = true;
	// function dfs(t) {
	// 	if (!t) return 0;

	// 	const left = dfs(t.left);
	// 	const right = dfs(t.right);

	// 	if (Math.abs(left - right) > 1) {
	// 		isBalanced = false;
	// 	}

	// 	return 1 + Math.max(left, right);
	// }

	// dfs(tree);
	// return isBalanced;
};

/* 141. Linked List Cycle
Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.
*/

var hasCycle = function (head) {
	let fastPointer = head;

	while (fastPointer && fastPointer.next) {
		head = head.next;
		fastPointer = fastPointer.next.next;
		if (head === fastPointer) {
			return true;
		}
	}
	return false;
};
