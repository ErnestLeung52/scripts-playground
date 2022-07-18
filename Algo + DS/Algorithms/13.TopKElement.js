class Heap {
	constructor(data, comparator) {
		this.data = data;
		// minHeap a-b, maxHeap b-a
		this.comparator = comparator;
		this.heapify();
	}

	// O(nlog(n)) -> get invoked when we passed in an array of numbers
	heapify() {
		if (this.size() < 2) return;
		for (let i = 1; i < this.size(); i++) {
			this.bubbleUp(i);
		}
	}

	// O(1)
	peek() {
		if (this.size() === 0) return null;
		return this.data[0];
	}

	// O(log(n))
	insert(value) {
		this.data.push(value);
		this.bubbleUp(this.size() - 1);
	}

	// O(log(n))
	remove() {
		if (this.size() === 0) return null;
		const result = this.data[0];
		const last = this.data.pop();
		if (this.size() !== 0) {
			this.data[0] = last;
			this.bubbleDown(0);
		}
		return result;
	}

	// O(log(n))
	bubbleUp(index) {
		while (index > 0) {
			// same as Math.floor((index - 1) / 2)
			const parentIndex = (index - 1) >> 1;
			// min: a - b < 0. then we know current num is less than its parent, hence we need to swap place
			// max: b - a < 0. parent is less than current index, since for a maxHeap we need to find the largest, so we swap
			if (this.comparator(this.data[index], this.data[parentIndex]) < 0) {
				this.swap(index, parentIndex);
				index = parentIndex;
			} else {
				break;
			}
		}
	}

	// O(log(n))
	bubbleDown(index) {
		const lastIndex = this.size() - 1;
		while (true) {
			const leftIndex = index * 2 + 1;
			const rightIndex = index * 2 + 2;
			let findIndex = index;
			if (
				leftIndex <= lastIndex &&
				this.comparator(this.data[leftIndex], this.data[findIndex]) < 0
			) {
				findIndex = leftIndex;
			}
			if (
				rightIndex <= lastIndex &&
				this.comparator(this.data[rightIndex], this.data[findIndex]) < 0
			) {
				findIndex = rightIndex;
			}
			if (index !== findIndex) {
				this.swap(index, findIndex);
				index = findIndex;
			} else {
				break;
			}
		}
	}

	// O(1)
	swap(index1, index2) {
		[this.data[index1], this.data[index2]] = [
			this.data[index2],
			this.data[index1],
		];
	}

	// O(1)
	size() {
		return this.data.length;
	}
}

/*------------------- 1. Top 'K' Numbers --------------------- O(K*logK+(N−K)*logK) = N* logK
Given an unsorted array of numbers, find the ‘K’ largest numbers in it.
Input: [3, 1, 5, 12, 2, 11], K = 3
Output: [5, 12, 11]
*/

function find_k_largest_numbers(nums, k) {
	const minHeap = new Heap([], (a, b) => a - b);

	for (let i = 0; i < nums.length; i++) {
		// size < k not <=, because we are checking the length before inserting, after inserting it will +1
		// root is min, so when current number is greater root, we need insert it into heap
		if (minHeap.size() < k || minHeap.peek() < nums[i]) {
			console.log(minHeap.size());
			minHeap.insert(nums[i]);
		}
		if (minHeap.size() > k) {
			minHeap.remove();
		}
	}

	// return minHeap.peek();
	return minHeap.data;
}
// console.log(find_k_largest_numbers([12, 11, 10, 9], 3));

/*------------------- 2. Kth Smallest Number ---------------------  N* logK
Given an unsorted array of numbers, find Kth smallest number in it.
Input: [1, 5, 12, 2, 11, 5], K = 4
Output: 5
*/

const find_Kth_smallest_number = function (nums, k) {
	const maxHeap = new Heap([], (a, b) => b - a);

	// root is max, below will be the smallest. if current number is < root and that we are looking for top smallest, so we need to insert smallest
	for (let i = 0; i < nums.length; i++) {
		if (maxHeap.size() < k || nums[i] < maxHeap.peek()) {
			maxHeap.insert(nums[i]);
		}
		if (maxHeap.size() > k) {
			maxHeap.remove();
		}
	}
	return maxHeap.peek();
};
// console.log(find_Kth_smallest_number([5, 12, 11, -1, 12], 3));

/*------------------- 3. 'K' Closest Points to the Origin ---------------------  N* logK
Given an array of points in a 2D plane, find ‘K’ closest points to the origin.
Input: point = [[1, 3], [3, 4], [2, -1]], K = 2
Output: [[1, 3], [2, -1]]
*/
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	compare(other) {
		return other.distance_from_origin() - this.distance_from_origin();
	}

	distance_from_origin() {
		// return Math.sqrt(this.x ** 2 + this.y ** 2);
		return this.x * this.x + this.y * this.y;
	}
}
const find_closest_points = function (points, k) {
	// comparing the distance between point a and point b
	const maxHeap = new Heap([], (a, b) => a.compare(b));

	for (let i = 0; i < k; i++) {
		const current = new Point(...points[i]);
		maxHeap.insert(current);
	}
	// maxHeap
	for (let i = k; i < points.length; i++) {
		const current = new Point(...points[i]);
		if (
			current.distance_from_origin() <
			maxHeap.peek().distance_from_origin()
		) {
			maxHeap.remove();
			maxHeap.insert(current);
		}
	}
	return maxHeap.data;
};
// console.log(find_closest_points([[1,3] , [3,4], [2,-1]], 2));

/*------------------- 4. Connect Ropes --------------------- N * logN
Given ‘N’ ropes with different lengths, we need to connect these ropes into one big rope with minimum cost. The cost of connecting two ropes is equal to the sum of their lengths.
*/
const minimum_cost_to_connect_ropes = function (ropeLengths) {
	const minHeap = new Heap(ropeLengths, (a, b) => a - b);
	let result = 0;

	while (minHeap.size() > 1) {
		const temp = minHeap.remove() + minHeap.remove();
		result += temp;
		minHeap.insert(temp);
	}
	return result;
};
// console.log(`Minimum cost to connect ropes: ${minimum_cost_to_connect_ropes([1, 3, 11, 5])}`)
// console.log(`Minimum cost to connect ropes: ${minimum_cost_to_connect_ropes([3, 4, 5, 6])}`);
// console.log(`Minimum cost to connect ropes: ${minimum_cost_to_connect_ropes([1, 3, 11, 5, 2])}`)

/*------------------- 5. Top 'K' Frequent Numbers --------------------- O(N+N∗logK)
Given an unsorted array of numbers, find the top ‘K’ frequently occurring numbers in it.
Input: [1, 3, 5, 12, 11, 12, 11], K = 2
Output: [12, 11]
*/

const find_k_frequent_numbers = function (nums, k) {
	const numsFreq = {};

	nums.forEach((num) => {
		numsFreq[num] = numsFreq[num] ? numsFreq[num] + 1 : 1;
	});

	const minHeap = new Heap([], (a, b) => a[0] - b[0]);

	Object.keys(numsFreq).forEach((num) => {
		minHeap.insert([numsFreq[num], num]);
		if (minHeap.size() > k) {
			minHeap.remove();
		}
	});

	const result = [];

	while (minHeap.size() > 0) {
		result.push(parseInt(minHeap.remove()[1]));
	}

	return result;
};
// console.log(find_k_frequent_numbers([5, 12, 11, 3, 11], 2));

/* Only if is guaranteed that the answer is unique. ------- // 3 * N */
var topKFrequent = function (nums, k) {
	const freqMap = new Map();
	const bucket = [];
	const result = [];

	for (let num of nums) {
		freqMap.set(num, (freqMap.get(num) || 0) + 1);
	}

	// HashTable
	for (let [num, freq] of freqMap) {
		bucket[freq] = (bucket[freq] || new Set()).add(num);
	}

	for (let i = bucket.length - 1; i >= 0; i--) {
		if (bucket[i]) result.push(...bucket[i]);
		if (result.length >= k) break;
	}
	return result;
};
// console.log(topKFrequent([5, 12, 11, 3, 11], 2));

// const map1 = new Map();
// map1.set('a', 1);
// map1.get('b');

// const set1 = new Set();
// set1.add(1)
// set1.add(2)
// set1

/*------------------- 6. Frequency Sort ---------------------  O(D∗logD) ‘D’ is the number of distinct characters
Given a string, sort it based on the decreasing frequency of its characters.
Input: "Programming"
Output: "rrggmmPiano"
*/

const sort_character_by_frequency = function (str) {
	const freqMap = {};

	for (let i = 0; i < str.length; i++) {
		freqMap[str[i]] = freqMap[str[i]] ? freqMap[str[i]] + 1 : 1;
	}

	// Node in heap is stored as [freq, str]
	const minHeap = new Heap([], (a, b) => b[0] - a[0]);

	// Iterate all the keys in FreqMap, and insert them into minHeap as [freq, str]
	Object.keys(freqMap).forEach((str) => {
		minHeap.insert([freqMap[str], str]);
	});

	// Extract all str from minHeap
	let result = '';

	while (minHeap.size() > 0) {
		const string = minHeap.remove()[1];
		result += string.repeat(freqMap[string]);
	}

	return result;
};
// console.log(sort_character_by_frequency('Programming'));
// console.log(sort_character_by_frequency('abcbab'));

/*------------------- 7. Kth Largest Number in a Stream --------------------- O(logK)
Design a class to efficiently find the Kth largest element in a stream of numbers.
Input: [3, 1, 5, 12, 2, 11], K = 4
1. Calling add(6) should return '5'.
*/
class KthLargestNumberInStream {
	constructor(nums, k) {
		this.minHeap = new Heap([], (a, b) => a - b);
		this.k = k;
		// add the numbers in the min heap
		nums.forEach((num) => this.add(num));
	}

	add(num) {
		// add the new number in the min heap
		this.minHeap.insert(num);
		// if heap has more than 'k' numbers, remove one number
		if (this.minHeap.size() > this.k) {
			this.minHeap.remove();
		}
		// return the 'Kth largest number
		return this.minHeap.peek();
	}
}
// const kthLargestNumber = new KthLargestNumberInStream([3, 1, 5, 12, 2, 11], 4);
// console.log(`4th largest number is: ${kthLargestNumber.add(6)}`);
// console.log(`4th largest number is: ${kthLargestNumber.add(13)}`);
// console.log(`4th largest number is: ${kthLargestNumber.add(4)}`);

/*------------------- 8. 'K' Closest Numbers ---------------------  O(logN+K∗logK)
Given a sorted number array and two integers ‘K’ and ‘X’, find ‘K’ closest numbers to ‘X’ in the array. Return the numbers in the sorted order. ‘X’ is not necessarily present in the array.
Input: [2, 4, 5, 6, 9], K = 3, X = 10
Output: [5, 6, 9]
*/

function find_closest_elements(arr, K, X) {
	// Find the index of X or closest to X;
	const index = binary_search(arr, X);

	// Low - high is the range we can search, since it will be closest to X
	let low = index - K;
	let high = index + K;
	// Ensure low high are within arr's bound
	low = Math.max(low, 0); // 'low' should not be less than zero
	high = Math.min(high, arr.length - 1); // 'high' should not be greater the size of the array

	// minHeap to keep track of smallest distance
	const minHeap = new Heap([], (a, b) => a[0] - b[0]);

	// Insert all number -> minHeap do the job and keep the smallest number at top
	for (let i = low; i < high + 1; i++) {
		minHeap.insert([Math.abs(X - arr[i]), arr[i]]);
	}

	const result = [];
	while (result.length < K) {
		result.push(minHeap.remove()[1]);
	}

	result.sort((a, b) => a - b);

	return result;
}

function binary_search(arr, target) {
	let low = 0,
		high = arr.length - 1;

	while (low <= high) {
		const mid = Math.floor(low + (high - low) / 2);

		if (arr[mid] === target) {
			return mid;
		}

		if (arr[mid] < target) {
			low = mid + 1;
		} else {
			high = mid - 1;
		}
	}
	// When we can't find target and low becomes out of bound, return the closest
	if (low > 0) {
		return low - 1;
	}

	return low;
}

// console.log(find_closest_elements([5, 6, 7, 8, 9], 3, 7));
// console.log(find_closest_elements([2, 4, 5, 6, 9], 3, 6));
// console.log(find_closest_elements([2, 4, 5, 6, 9], 3, 10));

/*------------------- 9. Maximum Distinct Elements ---------------------  O(N∗logN)(inserting) + KlogN (deleting) -> improve to O(N∗logK+KlogK)
Given an array of numbers and a number ‘K’, we need to remove ‘K’ numbers from the array such that we are left with maximum distinct numbers.
Input: [7, 3, 5, 8, 5, 3, 3], and K=2
Output: 3
*/
function find_maximum_distinct_elements(nums, k) {
	let distinctCount = 0;
	if (nums.length < k) return distinctCount;

	// Find Freq
	const freqMap = {};
	nums.forEach((num) => (freqMap[num] = freqMap[num] ? freqMap[num] + 1 : 1));

	// we use minHeap because we want to make a number to become distinctive that has the least frequency
	// if we start from the number with the most freq, then it will be inefficient, in that case we should exclude that number
	const minHeap = new Heap([], (a, b) => a - b);

	// insert all numbers with frequency greater than '1' into the min-heap
	Object.keys(freqMap).forEach((num) => {
		// Adding distinct numbers
		if (freqMap[num] === 1) {
			distinctCount += 1;
		} else {
			minHeap.insert(freqMap[num]);
		}
	});

	// following a greedy approach, try removing the least frequent numbers first from the min-heap
	while (k > 0 && minHeap.size() > 0) {
		const frequency = minHeap.remove();

		// to make an element distinct, we need to remove all of its occurrences except one
		// subtracting frequency from k makes the element deleted, however we want to keep one to make it distinct, so we add back 1
		k = k - frequency + 1;
		// after subtracting, if k >= 0, we know we have sucessfully make an element distinctive and hence add one count
		if (k >= 0) {
			distinctCount += 1;
		}
	}
	// if k > 0, this means we have to remove some distinct numbers, because we are not deleting enough elements based on k
	if (k > 0) {
		distinctCount -= k;
	}

	return distinctCount;
}
// console.log(find_maximum_distinct_elements([7, 3, 5, 8, 5, 3, 3], 2));
// console.log(find_maximum_distinct_elements([3, 5, 12, 11, 12], 3));
// console.log(find_maximum_distinct_elements([1, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5], 2));

/*------------------- 10. Sum of Elements ---------------------  O(N*logN)
Given an array, find the sum of all numbers between the K1’th and K2’th smallest elements of that array.
Input: [1, 3, 12, 5, 15, 11], and K1=3, K2=6
Output: 23
*/

function find_sum_of_elements(nums, k1, k2) {
	// Insert all numbers
	const minHeap = new Heap(nums, (a, b) => a - b);

	// nums.forEach(num => minHeap.insert(num))
	// Remove k1 numbers
	for (let i = 0; i < k1; i++) {
		minHeap.remove();
	}

	let sum = 0;
	// Add numbers between k1 - k2
	for (let j = 0; j < k2 - k1 - 1; j++) {
		sum += minHeap.remove();
	}

	return sum;
}

// console.log(find_sum_of_elements([1, 3, 12, 5, 15, 11], 3, 6));
// console.log(find_sum_of_elements([3, 5, 8, 7], 1, 4));

// Alternate Solution --------------------> N∗logK2
function find_sum_of_elements_2(nums, k1, k2) {
	const maxHeap = new Heap([], (a, b) => b - a);
	// keep smallest k2 numbers in the max heap
	for (i = 0; i < nums.length; i++) {
		// Nums is NOT sorted! k2-1 number is the right bound of the range we are looking for, we only need to have k2-1 numbers to keep track
		if (i < k2 - 1) {
			maxHeap.insert(nums[i]);
		} else if (nums[i] < maxHeap.peek()) {
			// Other number should be considered too, since we have can only look at k2-1 number of range, we can compare with peek and elinminate the greater numbers
			// as we are interested only in the smallest k2 numbers
			maxHeap.remove();
			maxHeap.insert(nums[i]);
		}
	}
	// Think of it as reverted-sorted number, if we start counting from k2 - 1 (greater numbers), we only need to sum number between k2 & k1, which is k2 - k1 - 1 numbers
	// get the sum of numbers between k1 and k2 indices
	// these numbers will be at the top of the max heap
	let elementSum = 0;
	for (i = 0; i < k2 - k1 - 1; i++) {
		elementSum += maxHeap.remove();
	}

	return elementSum;
}
// console.log(find_sum_of_elements_2([1, 3, 12, 5, 15, 11], 3, 6));
// console.log(find_sum_of_elements_2([3, 5, 8, 7], 1, 4));

/*------------------- 11. Sum of Elements ---------------------  O(N*logN)
Given a string, find if its letters can be rearranged in such a way that no two same characters come next to each other.
Input: "Programming"
Output: "rgmrgmPiano" or "gmringmrPoa" or "gmrPagimnor", etc.
*/

function rearrange_string(str) {
	// Find string frequency
	const strFreq = {};
	for (let i = 0; i < str.length; i++) {
		const char = str[i];
		strFreq[char] = strFreq[char] ? strFreq[char] + 1 : 1;
	}
	// Insert char | freq pair into maxHeap
	const maxHeap = new Heap([], (a, b) => b[0] - a[0]);
	for (const char in strFreq) {
		maxHeap.insert([strFreq[char], char]);
	}

	let prevChar = null,
		prevFreq = 0,
		resultStr = '';

	while (maxHeap.size() > 0) {
		// Get the most frequent str
		maxHeap;
		const [freq, char] = maxHeap.remove();
		// Before appending a string, we want to check in the last iteration, the letter we just appended, still has any frequency left, if so, we will insert back to the maxHeap
		// **** when nothing inserts, we are done with one letter, and this might break the while loop in the next iteration
		if (prevChar !== null && prevFreq > 0) {
			maxHeap.insert([prevFreq, prevChar]);
		}

		resultStr += char;
		// Helps to keep track and update maxHeap
		prevChar = char;
		prevFreq = freq - 1;
	}

	if (resultStr.length === str.length) {
		return resultStr;
	}

	return '';
}
// console.log(`Rearranged string:  ${rearrange_string('aappp')}`);
// console.log(`Rearranged string:  ${rearrange_string('Programming')}`);
// console.log(`Rearranged string:  ${rearrange_string('abcccc')}`);

/*------------------- 12. Rearrange String K Distance Apart --------------------- 
Given a string and a number ‘K’, find if the string can be rearranged such that the same characters are at least ‘K’ distance apart from each other.
Input: "mmpp", K=2
Output: "mpmp" or "pmpm"
*/

function reorganize_string(str, k) {
	if (k <= 1) {
		return str;
	}
	// Find str frequency
	const charFreq = {};
	for (let i = 0; i < str.length; i++) {
		const char = str[i];
		charFreq[char] = charFreq[char] ? charFreq[char] + 1 : 1;
	}
	// Add to maxHeap
	const maxHeap = new Heap([], (a, b) => b[0] - a[0]);
	for (const char in charFreq) {
		maxHeap.insert([charFreq[char], char]);
	}

	// We can keep track of previous characters in a queue to insert them back in the heap after ‘K’ iterations.
	const queue = [];
	let resultStr = '';
	while (maxHeap.size() > 0) {
		const [freq, char] = maxHeap.remove();
		// Build string
		resultStr += char;
		// After adding to result, we store this char into a queue (First in First out)
		queue.push([char, freq - 1]);
		// When queue reaches k length, we know we have already processed k numbers, so in the next iteration we can reuse that number again
		if (queue.length === k) {
			// After k times (a cycle), we take out the first letter from queue and try to re-add it to result string again
			const [char, freq] = queue.shift();
			// Ensure there is frequency left
			if (freq > 0) {
				maxHeap.insert([freq, char]);
			}
		}
	}

	if (resultStr.length === str.length) {
		return resultStr;
	}

	return '';
}

// console.log(reorganize_string('abbacca', 3));
