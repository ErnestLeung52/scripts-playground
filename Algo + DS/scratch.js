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

/* 278. First Bad Version
You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.
Input: n = 5, bad = 4
Output: 4
*/
var solution = function (isBadVersion) {
	return function (n) {
		let low = 1;
		let high = n;
		let mid;
		while (low <= high) {
			mid = ~~(low + (high - low) / 2);
			if (isBadVersion(mid)) {
				if (isBadVersion(mid - 1)) high = mid - 1;
				else return mid;
			} else low = mid + 1;
		}
	};
};

/* 383. Ransom Note
Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.
*/

function canConstruct(ransomNote, magazine) {
	const cache = {};

	for (let i = 0; i < magazine.length; i++) {
		cache[magazine[i]] = cache[magazine[i]] ? cache[magazine[i]] + 1 : 1;
	}

	for (let j = 0; j < ransomNote.length; j++) {
		if (!(ransomNote[j] in cache) || cache[ransomNote[j]] <= 0) {
			return false;
		}

		cache[ransomNote[j]]--;
	}

	return true;
}
// console.log(canConstruct('aa', 'aab'));

/* 70. Climbing Stairs
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
Input: n = 2
Output: 2
*/
// O(N)
const climbStairs = (n, memo = {}) => {
	// base cases: there is only one way to climb 0 or 1 stairs
	if (n === 0 || n === 1) return 1;

	// check if we've already computed the result for n
	if (n in memo) {
		return memo[n];
	}

	memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);

	return memo[n];
};

// climbStairs(5);

/* 409. Longest Palindrome
Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.

Letters are case sensitive, for example, "Aa" is not considered a palindrome here.
Input: s = "abccccdd"
Output: 7
*/
const longestPalindrome = (s) => {
	let count = 0;
	const cache = {};

	for (const char in s) {
		cache[char] = cache[char] ? cache[char] + 1 : 1;

		if (cache[char] % 2 === 0) {
			count += 2;
		}
	}

	return s.length > count ? count + 1 : count;
};

/* 206. Reverse Linked List
Given the head of a singly linked list, reverse the list, and return the reversed list.
*/

const reverseList = (head) => {
	let prev = null;
	let curr = head;

	while (curr) {
		let next = curr.next;
		curr.next = prev;
		prev = curr;
		curr = next;
	}

	return prev;
};

/* 67. Add Binary
Given two binary strings a and b, return their sum as a binary string.
*/
const addBinary = (a, b) => {
	// const aBin = `0b${a}`;
	// const bBin = `0b${b}`;
	// const sum = BigInt(aBin) + BigInt(bBin);
	// return sum.toString(2);
};

// console.log(addBinary('1010', '1011'));

/* 169. Majority Element
Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
Input: nums = [3,2,3]
Output: 3
*/

const majorityElement = (nums) => {
	const cache = {};

	let maxNum = 0;
	let maxFreq = 0;

	for (let i = 0; i < nums.length; i++) {
		cache[nums[i]] = cache[nums[i]] ? cache[nums[i]] + 1 : 1;

		if (cache[nums[i]] > maxFreq) {
			maxFreq = cache[nums[i]];
			maxNum = nums[i];
		}

		// because majority element appears more than [n/2]
		// if (cache[nums[i]] > nums.length / 2) {
		//   return nums[i]
		// }
	}

	return maxNum;
};

// console.log(majorityElement([3,2,3]));

/* 543. Diameter of Binary Tree
Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.
*/

const diameterOfBinaryTree = (root) => {
	let max = 0;

	function maxDepth(root) {
		// if our root(num) is null then there is no path. return 0/ull
		if (root === null) return 0;

		// Assign the left  of tree to LEFT; this will be easier to call it instead of writing "maxDepth(root.left)" each time
		let left = maxDepth(root.left);
		let right = maxDepth(root.right); //Same above
		// console.log('left', left, '   right', right);

		//if the path doesn't go through the root we just get the max of them
		max = Math.max(max, left + right);

		// the path goes through the root so we add 1(for the root)
		return Math.max(left, right) + 1;
	}

	//since we don't know if the path will go through the root or not we will have to get the max between(path that visits the root, or the path that doesn't go through the root.)
	maxDepth(root);
	return max;
};

// console.log(diameterOfBinaryTree(tree));

/* 876. Middle of the Linked List 
Given the head of a singly linked list, return the middle node of the linked list.
If there are two middle nodes, return the second middle node.
*/
const middleNode = (head) => {
	// let slow = head;
	// let fast = head.next;

	// while (fast) {
	// 	slow = slow.next;
	// 	fast = fast.next.next;
	// }

	// return slow;

	let slow = head;
	let fast = head;

	// works for odd/even number of nodes
	while (fast && fast.next) {
		slow = slow.next;
		fast = fast.next.next;
	}

	return slow;
};

/* 104. Maximum Depth of Binary Tree
Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
*/

const maxDepth = (root) => {
	// base case: if root is null, return 0
	if (!root) {
		return 0;
	}

	// recursively find the maximum depth of the left and right subtrees
	const leftDepth = maxDepth(root.left);
	const rightDepth = maxDepth(root.right);

	// return the maximum depth of the tree
	return Math.max(leftDepth, rightDepth) + 1;
};

// const tree = new TreeNode(1);
// tree.left = new TreeNode(2);
// tree.right = new TreeNode(3);
// tree.right.left = new TreeNode(4);
// tree.right.right = new TreeNode(5);
// console.log(maxDepth(tree));

/* 217. Contains Duplicate
Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
*/
const containsDuplicate = (nums) => {
	if (nums.length <= 1) return false;

	const set = new Set();

	for (let i = 0; i < nums.length; i++) {
		if (set.has(nums[i])) {
			return true;
		}

		set.add(nums[i]);
	}

	return false;
	// let testSet = new Set(nums);
	// return testSet.size !== nums.length;
};
// console.log(containsDuplicate([1, 2, 3, 1]));

/* 53. Maximum Subarray
Given an integer array nums, find the 
subarray
 with the largest sum, and return its sum.
 */
const maxSubArray = (nums) => {
	// Sliding windows
	let maxSum = nums[0];
	let currSum = nums[0];

	for (let i = 1; i < nums.length; i++) {
		currSum = Math.max(nums[i], nums[i] + currSum);
		maxSum = Math.max(maxSum, currSum);
	}

	return maxSum;
};

/* 57. Insert Interval
You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
*/

const insert = (intervals, newInterval) => {
	let [newStart, newEnd] = newInterval;
	const left = [];
	const right = [];

	for (const interval of intervals) {
		const [start, end] = interval;

		// current interval is smaller than newInterval
		if (end < newStart) {
			left.push(interval);
		}

		// current interval is larger than newInterval
		else if (start > newEnd) {
			right.push(interval);
		}

		// there is a overlap
		else {
			newStart = Math.min(newStart, start);
			newEnd = Math.max(newEnd, end);
		}
	}

	return [...left, [newStart, newEnd], ...right];
};

/* 542. 01 Matrix
Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.
*/

var updateMatrix = function (matrix) {
	// General approach is: Loop over the full matrix to find all zeroes first.
	// Add those to a queue and start a classic BFS, writing down a number +1
	// of the position we find in the Q. That way, all the neigbors of the zeroes will become 1's
	// all their neighbors 2's etc.
	// As we're looking for the initial set of zeroes, mark the others, mark as infinity
	// because we don't want to get confused with future 1s we want to write down.

	let i, l, j, m;

	let q = [];

	// Find all zeroes in the matrix
	for (i = 0, l = matrix.length; i < l; i++) {
		for (j = 0, m = matrix[0].length; j < m; j++) {
			if (matrix[i][j] === 0) {
				// Note the third param here, a zero to keep track of which "level" we're at.
				// The zeroes are obviously at zero.
				// Later in the bfs we will increase this for each unvisited neighbor
				q.push([i, j, 0]);
			} else {
				matrix[i][j] = Infinity;
			}
		}
	}

	// little helper array to find neighbors in a quick forEach loop.
	let dir = [
		[1, 0],
		[0, 1],
		[-1, 0],
		[0, -1],
	];

	// Start BFS. BFS is the right choice so we minimize attempted double visits
	// BFS is like a stain that spreads, while DFS is like tendrils reaching out.
	while (q.length) {
		let pos = q.shift();

		// write value if we find it's lower than current (like those infinities)
		if (matrix[pos[0]][pos[1]] > pos[2]) {
			matrix[pos[0]][pos[1]] = pos[2];
		}

		// Look at all neighbor positions. Are they on the board? Are they not yet visited?
		// If yes to both, add to the q, with an increased "level" param at pos [2]
		dir.forEach(function (d) {
			let next = [pos[0] + d[0], pos[1] + d[1], pos[2] + 1];
			// valid next coordinates?
			if (
				next[0] > -1 &&
				next[0] < matrix.length &&
				next[1] > -1 &&
				next[1] < matrix[0].length
			) {
				// not yet marked?
				if (matrix[next[0]][next[1]] === Infinity) {
					// add to q, but with increased index, which we stored at pos[2]
					q.push(next);
				}
			}
		});
	}
	return matrix;
};

/* 15. 3Sum
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.
Input: nums = [-1,0,1,2,-1,-4]      [-4,-1,-1,0,1,2]
Output: [[-1,-1,2],[-1,0,1]]
*/
// Two pointers
const threeSum = (nums) => {
	const results = [];

	if (nums.length < 3) return results;

	nums.sort((a, b) => a - b);

	let target = 0;

	for (let i = 0; i < nums.length - 2; i++) {
		if (nums[i] > target) break;

		// Because it's sorted, so we check if it's a duplicate with previous num
		if (i > 0 && nums[i] === nums[i - 1]) continue;

		let j = i + 1,
			k = nums.length - 1;

		while (j < k) {
			let sum = nums[i] + nums[j] + nums[k];

			if (sum === target) {
				results.push([nums[i], nums[j], nums[k]]);

				while (nums[j] === nums[j + 1]) j++;
				while (nums[k] === nums[k - 1]) k--;

				j++;
				k--;
			} else if (sum < target) {
				j++;
			} else {
				k--;
			}
		}
	}
	return results;
};

// console.log(threeSum([-1, 0, 1, 2, -1, -4]));

/* 3. Longest Substring Without Repeating Characters
Given a string s, find the length of the longest 
substring without repeating characters.


Input: s = "abcabcbb"
Output: 3
*/
//Sliding Windows with Set - Most optimal
const lengthOfLongestSubstring = (s) => {
	// keeps track of the most recent index of each letter.
	const seen = {};

	let left = 0,
		maxLen = 0;

	for (let right = 0; right < s.length; right++) {
		if (s[right] in seen) {
			// if the current char was seen, move the start to (1 + the last index of this char)
			// max prevents moving backward, 'start' can only move forward
			left = Math.max(left, seen[s[right]] + 1);
			// left = seen[s[right]] + 1;
		}

		seen[s[right]] = right;
		maxLen = Math.max(maxLen, right - left + 1);
	}

	return maxLen;
};
// console.log(lengthOfLongestSubstring('pwwkew'));

// Worst case: O(N^2)
const lengthOfLongestSubstring_2 = (s) => {
	const set = new Set();

	let left = 0,
		maxLen = 0;

	for (let right = 0; right < s.length; right++) {
		// if set has string, need to delete everything in the set
		while (set.has(s[right])) {
			set.delete(s[left]);
			left++;
		}
		set.add(s[right]);
		maxLen = Math.max(maxLen, right - left + 1);
	}

	return maxLen;
};
// console.log(lengthOfLongestSubstring_2('pwwkew'));
