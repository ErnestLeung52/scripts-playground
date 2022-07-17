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

/*------------------- 8. 'K' Closest Numbers --------------------- 
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
