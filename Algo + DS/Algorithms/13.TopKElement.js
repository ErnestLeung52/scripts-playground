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

/*------------------- 4. Connect Ropes ---------------------
Given ‘N’ ropes with different lengths, we need to connect these ropes into one big rope with minimum cost. The cost of connecting two ropes is equal to the sum of their lengths.
*/
const minimum_cost_to_connect_ropes = function (ropeLengths) {
	const minHeap = new Heap(ropeLengths, (a, b) => a - b);
    let result = 0;

    while (minHeap.size() > 1) {
        const temp = minHeap.remove() + minHeap.remove();
        result += temp;
        minHeap.insert(temp)
    }
    return result;
};
// console.log(`Minimum cost to connect ropes: ${minimum_cost_to_connect_ropes([1, 3, 11, 5])}`)
// console.log(`Minimum cost to connect ropes: ${minimum_cost_to_connect_ropes([3, 4, 5, 6])}`);
// console.log(`Minimum cost to connect ropes: ${minimum_cost_to_connect_ropes([1, 3, 11, 5, 2])}`)