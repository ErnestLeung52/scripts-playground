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

/* 146. LRU Cache
 */
class LRUCache {
	constructor(capacity) {
		this.map = new Map();
		this.capacity = capacity;
	}

	//GET: When we read a value, we have to move it from wherever it was an put it to the end.
	get(key) {
		if (!this.map.has(key)) return -1;

		const val = this.map.get(key);
		// Small hack to re-order keys: we remove the requested key and place it at the end
		this.map.delete(key);
		this.map.set(key, val);

		return val;
	}

	// PUT: Every time we put a value, it will naturally go to the end of the list.
	//If the value already exits we need to delete it from wherever it was and put it to the end.
	// When doing a put, we check the capacity. If are over the limit, we delete the first element.
	put(key, value) {
		if (!this.map.has(key) && this.map.size >= this.capacity) {
			const firstKey = this.map.keys().next().value;
			this.map.delete(firstKey);
		}

		this.map.delete(key);
		this.map.set(key, value);
	}
}

/* 102. Binary Tree Level Order Traversal
Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
*/
// Time: O(N), where N is the number of nodes in the binary tree. This is because each node is visited only once in the worst case scenario.
// Space: The space complexity of the levelOrder function is O(N) as well. This is because at most N nodes can be added to the queue at any given time, which requires O(N) space complexity.

//We can use an inner for loop at each iteration of the while loop. When the loop begins, the length of the queue represents the # of nodes at the level. So by exhausting this length, we will only push the nodes into the queue that are all at the same level. The table below helped me understand a bit better whats going on.
const levelOrder = (root) => {
	if (!root) return [];

	const queue = [root];
	const levels = [];

	while (queue.length) {
		// Get the length prior to dequeueing

		const queueLength = queue.length;
		const currLevel = [];
		// loop through to exhaust all options and only to include nodes at currLevel

		for (let i = 0; i < queueLength; i++) {
			// Get next node
			const currNode = queue.shift();

			if (currNode.left) {
				queue.push(currNode.left);
			}

			if (currNode.right) {
				queue.push(currNode.right);
			}

			// After we add left and right for current, we add to currLevel
			currLevel.push(currNode.val);
		}

		// Level has been finished. Push into output array
		levels.push(currLevel);
	}

	return result;
};

/* 150. Evaluate Reverse Polish Notation
You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.
Evaluate the expression. Return an integer that represents the value of the expression.
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
*/
const evalRPN = (tokens) => {
	// Stack
	if (tokens.length % 2 !== 0) return null;
	const stack = [];
	const operations = {
		'+': (a, b) => a + b,
		'-': (a, b) => a - b,
		'*': (a, b) => a * b,
		'/': (a, b) => Math.trunc(a / b),
	};

	for (const t of tokens) {
		if (operations[t]) {
			// End of array it the top
			const top = stack.pop();
			const second = stack.pop();
			stack.push(operations[t](second, top));
		} else {
			stack.push(Number(t));
		}
	}

	return stack.pop();
};

/* 207. Course Schedule
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
*/

const canFinish = (numCourses, prerequisites) => {
	// adjacency list + set
	const adjList = {};
	const visited = {};

	// build the adacency list
	for (let i = 0; i < prerequisites.length; i++) {
		if (adjList[prerequisites[i][0]] === undefined) {
			adjList[prerequisites[i][0]] = [prerequisites[i][1]];
		} else {
			adjList[prerequisites[i][0]].push(prerequisites[i][1]);
		}
	}
	// console.log(adjList); // { 0: [ 1, 2 ], 1: [ 3 ], 3: [ 4 ] }

	const dfs = (node) => {
		// Found a loop
		if (visited[node]) {
			return false;
		}

		// check for prereq courses
		if (adjList[node] !== undefined) {
			// if prereq courses is empty
			if (adjList[node].length === 0) {
				return true;
			}

			// set true to check for finding a loop
			visited[node] = true;
			// console.log(visited);

			// check for other prereq for the current prereq
			for (const prereq of adjList[node]) {
				// if result return to false (meaning visited[node] === false)
				//
				if (!dfs(prereq)) {
					return false;
				}
			}

			// passed all the checks
			// if we can't get to the step of flagging to false, that means during dfs,
			// we are encountering the same node in the dfs
			visited[node] = false;
			adjList[node] = [];
		}

		return true;
	};

	for (let key in adjList) {
		if (!dfs(key)) {
			return false;
		}
	}
	return true;
};

const canFinish_2 = (numCourses, prerequisites) => {
	// adjacency list + set
	// In this implementation, we use a depth-first search (DFS) approach to traverse the graph represented by the course prerequisites. We first build an adjacency list to represent the graph. Then, we use a set to keep track of visited nodes during the DFS traversal.

	// For each node in the graph, we perform a DFS traversal starting from that node. If we encounter a node that has already been visited during the current traversal, we know that there is a cycle in the graph, and we return false. Otherwise, we mark the current node as visited, and recursively traverse all its neighbors (i.e., prerequisite courses). If we encounter a node that returns false during the recursive traversal, we return false as well. Finally, we remove the current node from the visited set before returning true.

	// We perform the DFS traversal for all nodes in the graph (i.e., all courses), and if all traversals return true, we know that there are no cycles in the graph and we can finish all courses. Otherwise, we return false.
	const adjList = {};
	const visited = new Set();

	// build the adacency list
	for (let i = 0; i < prerequisites.length; i++) {
		if (adjList[prerequisites[i][0]] === undefined) {
			adjList[prerequisites[i][0]] = [prerequisites[i][1]];
		} else {
			adjList[prerequisites[i][0]].push(prerequisites[i][1]);
		}
	}

	const dfs = (node) => {
		if (visited.has(node)) {
			return false;
		}

		visited.add(node);
		if (adjList[node] !== undefined) {
			for (const prereq of adjList[node]) {
				if (!dfs(prereq)) {
					return false;
				}
			}
		}
		visited.delete(node);

		return true;
	};

	for (let i = 0; i < numCourses; i++) {
		if (!dfs(i)) {
			return false;
		}
	}

	return true;
};

/* 208. Implement Trie (Prefix Tree)
A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.
*/

class TrieNode {
	constructor() {
		this.children = {};
		this.end = false;
	}
}

class Trie {
	// insert 'aa' & 'ab'
	// root { a: {	a: {},
	//          		b: {},
	// 	}, };
	constructor() {
		this.root = new TrieNode();
	}

	// Inserts the string word into the trie.
	insert(word) {
		let current = this.root;

		for (const char of word) {
			if (!current.children[char]) {
				current.children[char] = new TrieNode();
			}
			// continously traversing inside of the object
			current = current.children[char];
		}

		current.end = true;
	}

	traverse(word) {
		let currNode = this.root;

		for (const char of word) {
			if (!(char in currNode.children)) return null;
			currNode = currNode.children[char];
		}

		return currNode;
	}

	// Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
	search(word) {
		const lastNode = this.traverse(word);
		return !!lastNode && lastNode.end;
	}

	// Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
	startsWith(prefix) {
		const lastNode = this.traverse(prefix);
		return !!lastNode;
	}
}

// const trie = new Trie();
// trie.insert('aa');
// trie.insert('ab');
// console.log(trie);
// console.log(trie.search('aa'));

/* 322. Coin Change
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.
*/
const coinChange = (coins, amount) => {
	// [1,2,5], 11
	// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11]
	// @3: 1-> dp[3] = min(dp[3], 1 + dp[3-1])	 2-> dp[3] = min(dp[3], 1 + dp[3-2])
	// @4: 1-> dp[4] = min(dp[4], 1 + dp[4-1])...
	// DP arr: store all the solutions between 0 to amount, filled with invalid value, so that if we can later check if there exists possible solutions
	// loop through amount to fille up the dp arr
	// loop through the amount of coins
	// if the current amount - coin is greater than 0, which means there is a potential solution
	// then we find the min between curAmount, and the remaining amount of cur - coin + 1
	// + 1 is to include  the current we have taken

	// amount + 1: includes 0
	const dp = Array(amount + 1).fill(Infinity);

	// base case, takes 0 coin to make 0
	dp[0] = 0;

	for (let curAmount = 1; curAmount <= amount; curAmount++) {
		for (const coin of coins) {
			// have a potential value
			if (curAmount - coin >= 0) {
				// 1 + is the current we have taken
				dp[curAmount] = Math.min(dp[curAmount], 1 + dp[curAmount - coin]);
			}
		}
	}

	return dp[amount] === Infinity ? -1 : dp[amount];
};

/* 238. Product of Array Except Self
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.
*/
const productExceptSelf = (nums) => {
	// [1, 2, 3, 4] => [24, 12, 8, 6]
	//          1, 1*1, 2*1*1, 3*2*1*1
	// prefix: [1,  1,    2,     6]
	//         2*3*4*1, 3*4*1, 4*1, 1
	// suffix: [  24,     12,   4,  1]

	const prefix = [];

	// Move left in the input array
	for (let i = 0; i < nums.length; i++) {
		// If i === 0, start with `1`, since there is no prefix
		if (i === 0) {
			prefix[i] = 1;
		} else {
			// Otherwise, multiply nums[i-1] times the prefix at position i-1,
			// and add that to the prefix array at position i
			prefix[i] = nums[i - 1] * prefix[i - 1];
		}
	}

	// Then, let's create a suffix array
	const suffix = [];

	// Move right in the input array
	for (let i = nums.length - 1; i >= 0; i--) {
		if (i === nums.length - 1) {
			suffix[i] = 1;
		} else {
			suffix[i] = nums[i + 1] * suffix[i + 1];
		}
	}
	// suffix

	const result = [];

	for (let i = 0; i < nums.length; i++) {
		result[i] = prefix[i] * suffix[i];
	}

	return result;

	// Optimized
	/*
	  // Set up an empty array as our result
    const result = []
    
    // Initialize a prefix tracker at 1
    let prefix = 1
    
    // Loop through the input array - for each position,
    // the result array should equal the prefix tracker.
    
    // Then, update the prefix tracker to be the product of itself,
    // multiplied by the input value at the position.
    for (let i=0; i<nums.length; i++) {
        result[i] = prefix
        prefix *= nums[i]
    }
    
    // Initialize a suffix tracker at 1
    let suffix = 1
    
    // Loop backwards through the array.
    // For each iteration, set the result array to be 
    // the product of itself multiplied by the suffix tracker.
    
    // Then, update the suffix tracker to be the product of itself,
    // multiplied by the input value at that position.
    for (let i=nums.length - 1; i>=0; i--) {
        result[i] *= suffix
        suffix *= nums[i]
    }

    return result
		*/
};
// console.log(productExceptSelf([1, 2, 3, 4]));

/* 155. Min Stack
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
*/

class MinStack {
	constructor() {
		this.stack = [];
		this.min = Infinity;
	}

	// void push(int val) pushes the element val onto the stack.
	push(val) {
		this.stack.push({ val, prevMin: this.min });
		this.min = Math.min(this.min, val);
	}

	//void pop() removes the element on the top of the stack.
	pop() {
		const deleted = this.stack.pop();
		this.min = deleted.prevMin;
	}

	//int top() gets the top element of the stack.
	top() {
		return this.stack[this.stack.length - 1].val;
	}

	//int getMin() retrieves the minimum element in the stack.
	getMin() {
		return this.min;
	}
}

/* 98. Validate Binary Search Tree
Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:

The left subtreeof a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
*/
// Time- O(N), n nodes in BST
// Space- worst O(N) for skewed tree, O(logN) balanced BST
const isValidBST = (root) => {
	const dfs = (node, min, max) => {
		if (!node) return true;

		if (node.val >= max || node.val <= min) {
			return false;
		}

		const validLeft = dfs(node.left, min, node.val);
		const validRight = dfs(node.right, node.val, max);

		return validLeft && validRight;
	};

	return dfs(root, -Infinity, Infinity);
};

/* 200. Number of Islands
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
*/
const numIslands = (grid) => {
	// Time & Space O(m x n)
	// Set up a count to keep track of the number of islands found
	let count = 0;

	// Helper function to explore the island from a given cell
	const exploreIsland = function (row, col) {
		// If the current cell is out of bounds or not part of an island, return
		if (
			row < 0 ||
			row >= grid.length ||
			col < 0 ||
			col >= grid[0].length ||
			grid[row][col] === '0'
		) {
			return;
		}

		// Mark the current cell as visited by changing its value to '0'
		grid[row][col] = '0';

		// Recursively explore the neighboring cells
		exploreIsland(row + 1, col);
		exploreIsland(row - 1, col);
		exploreIsland(row, col + 1);
		exploreIsland(row, col - 1);
	};

	// Loop through the grid to find the islands
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[0].length; col++) {
			// If a cell is part of an island, increment the count and explore the island
			if (grid[row][col] === '1') {
				count++;
				exploreIsland(row, col);
			}
		}
	}

	// Return the total count of islands found
	return count;
};

/* 994. Rotting Oranges
You are given an m x n grid where each cell can have one of three values:

0 representing an empty cell,
1 representing a fresh orange, or
2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

2, 1, 1
1, 1, 0
0, 1, 1
*/

const orangesRotting = (grid) => {
	/*The strategy to solve the problem is to use BFS to simulate the rotting process of oranges in the grid. We will start by adding all the rotten oranges to the queue, and then we will do the following steps:

	1. Pop an orange from the queue.
	2. Check if the adjacent oranges (up, down, left, right) are fresh.
	3. If an adjacent orange is fresh, mark it as rotten and add it to the queue.
	4. Continue the process until the queue is empty.
	While performing the above steps, we will also keep track of the time it takes to rot all the fresh oranges. We will do this by using a variable called time. The time will be equal to the number of iterations we do on the queue, which is equal to the number of levels in the BFS tree.

	At the end of the process, we will check if there are any fresh oranges left in the grid. If there are, it means that not all the oranges could be rotted, and we will return -1. Otherwise, we will return the time.

	The time complexity of this solution is O(m * n), where m is the number of rows and n is the number of columns in the grid. This is because we traverse the grid once to initialize the queue, and then repeatedly explore neighbors of oranges that we mark as rotten in the queue until all fresh oranges are rotten or there are no more rotten oranges to explore.

	The space complexity of this solution is O(m * n), because in the worst case we can add all the oranges to the queue before starting the BFS loop. However, we can optimize the space usage by marking rotten oranges as -1 instead of using a queue of coordinates, since we only care about the number of minutes elapsed and not about the path of the BFS.
	*/
	// Set up directions array
	const dirs = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	];

	// Set up queue and fresh count
	let queue = [];
	let fresh = 0;

	// Iterate through grid and add rotten oranges to queue and count fresh oranges
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j] === 2) {
				queue.push([i, j]);
			} else if (grid[i][j] === 1) {
				fresh++;
			}
		}
	}

	let minutes = 0;

	while (queue.length > 0 && fresh > 0) {
		let size = queue.length;

		// Iterate through current level of rotten oranges in queue
		for (let i = 0; i < size; i++) {
			let [x, y] = queue.shift();

			// Iterate through each direction
			for (let [dx, dy] of dirs) {
				let nx = x + dx;
				let ny = y + dy;

				// Check if new coordinates are valid and if there is a fresh orange there
				if (
					nx >= 0 &&
					nx < grid.length &&
					ny >= 0 &&
					ny < grid[0].length &&
					grid[nx][ny] === 1
				) {
					// Change fresh orange to rotten orange and add it to queue
					grid[nx][ny] = 2;
					queue.push([nx, ny]);
					fresh--;
				}
			}
		}
		// Increment minutes for each level of rotten oranges
		minutes++;
	}

	// If there are no fresh oranges left, return the number of minutes, otherwise return -1
	return fresh === 0 ? minutes : -1;
};

/* 33. Search in Rotated Sorted Array
There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.
*/
var searchSortedArray = function (nums, target) {
	let left = 0;
	let right = nums.length - 1;

	while (left <= right) {
		let mid = Math.floor((left + right) / 2);

		if (nums[mid] === target) {
			return mid;
		}

		// When dividing the roated array into two halves, one must be sorted.
		// Check if the left side is sorted
		if (nums[left] <= nums[mid]) {
			if (nums[left] <= target && target <= nums[mid]) {
				// target is in the left
				right = mid - 1;
			} else {
				// target is in the right
				left = mid + 1;
			}
		}

		// Otherwise, the right side is sorted
		else {
			if (nums[mid] <= target && target <= nums[right]) {
				// target is in the right
				left = mid + 1;
			} else {
				// target is in the left
				right = mid - 1;
			}
		}
	}
	return -1;
};

/* 39. Combination Sum
Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the 
frequency
 of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.
*/

function combinationSum(candidates, target) {
	const results = [];

	// This function recursively finds all combinations that sum up to the target.
	function backtrack(combination, remaining, start) {
		// Base case: if the remaining value is 0, the combination sums up to the target.
		if (remaining === 0) {
			results.push([...combination]); // Add the combination to the results array.
			console.log('result: ', results);
			return;
		}

		// If the remaining value is negative, or there are no candidates left to add, backtrack.
		if (remaining < 0 || start === candidates.length) {
			return;
		}

		// Try adding each candidate to the combination and recursively backtrack.
		for (let i = start; i < candidates.length; i++) {
			combination.push(candidates[i]); // Add the candidate to the combination.
			console.log(i, combination, '-', remaining);

			backtrack(combination, remaining - candidates[i], i); // Recursively backtrack with the new remaining value and starting index.

			combination.pop(); // Remove the candidate from the combination to try the next one.
		}
	}

	backtrack([], target, 0); // Start the recursive backtracking with an empty combination, target value, and starting index of 0.
	return results;
}

// console.log(combinationSum([2, 3, 6, 7], 7));
