/* HEAP

All the parent nodes are present in the first half of the array, and the last parent appears at the floor(n/2th) position. In this case, ‘n’ is the last or largest index
- k is the parent node index in an Array, and its children will be at index =>
    LeftChild=2k+1
    RightChild=2k+2

*/

// ------------------- General Heap class implementation with comparator ------------------
class Heap {
	constructor(data = []) {
		this.data = data;
		// minHeap a-b, maxHeap b-a
		this.comparator = (a, b) => a - b;
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
// let index = 10
// console.log(Math.floor((index - 1) / 2));
// console.log(( index - 1) >> 1);

// -------------- Educative implementation --------------
class maxHeap {
	constructor() {
		// initialize an array that will contain the values of the heap
		this.heap = [];
		this.elements = 0;
	}

	insert(val) {
		//
		if (this.elements >= this.heap.length) {
			this.elements = this.elements + 1;
			this.heap.push(val);
			this.__percolateUp(this.heap.length - 1);
		} else {
			this.heap[this.elements] = val;
			this.elements = this.elements + 1;
			this.__percolateUp(this.elements - 1);
		}
	}

	getMax() {
		if (this.elements !== 0) {
			return this.heap[0];
		}
		return null;
	}

	removeMax() {
		if (this.elements > 1) {
			let max = this.heap[0];
			this.heap[0] = this.heap[this.elements - 1];
			this.elements = this.elements - 1;
			this.__maxHeapify(0);
			return max;
		} else if (this.elements === 1) {
			let max = this.heap[0];
			this.elements = this.elements - 1;
			return max;
		} else {
			return null;
		}
	}

	// restores the heap property by swapping the value at a parent node if it is less than the value at a child node. After swapping, the function is called recursively on each parent node until the root is reached.

	__percolateUp(index) {
		let parent = Math.floor((index - 1) / 2);
		if (index <= 0) {
			return;
		} else if (this.heap[parent] < this.heap[index]) {
			let temp = this.heap[parent];
			this.heap[parent] = this.heap[index];
			this.heap[index] = temp;
			// Parent is halved
			this.__percolateUp(parent);
		}
	}

	// restores the heap property after a node is removed. It swaps the values of the parent nodes with the values of their largest child nodes until the heap property is restored.
	__maxHeapify(index) {
		let left = index * 2 + 1;
		let right = index * 2 + 2;
		let largest = index;

		// If the parent is less than its left child, largest becomes the left child node
		// this.elemnts > left makes sure there are enough child in the heap, there could be no child for a parent
		if (this.elements > left && this.heap[largest] < this.heap[left]) {
			largest = left;
		}
		// largest could be updated to the left if left > index
		if (this.elements > right && this.heap[largest] < this.heap[right]) {
			largest = right;
		}
		if (largest !== index) {
			var tmp = this.heap[largest];
			this.heap[largest] = this.heap[index];
			this.heap[index] = tmp;
			// continue to check for the next parent
			this.__maxHeapify(largest);
		}
	}

	buildHeap(arr) {
		this.heap = arr;
		this.elements = this.heap.length;
		for (var i = this.heap.length - 1; i >= 0; i--) {
			this.__maxHeapify(i);
		}
	}
}

// var heap = new maxHeap();
// heap
// heap.insert(30);
// heap.insert(10);
// heap.insert(20);
// heap.insert(40);
// heap.insert(50);
// heap
// heap.removeMax()

// https://blog.bitsrc.io/implementing-heaps-in-javascript-c3fbf1cb2e65
class minHeap {
	constructor() {
		this.heap = [];
		this.elements = 0;
	}

	getMin() {
		if (this.heap.length !== 0) {
			return this.heap[0];
		}
		return null;
	}

	insert(val) {
		if (this.elements >= this.heap.length) {
			this.elements += 1;
			this.heap.push(val);
			this.__bubbleUp(this.heap.length - 1);
		} else {
			// when there are less elements in the heap (after removing)
			this.heap[this.elements] = val;
			this.elements = this.elements + 1;
			this.__bubbleUp(this.elements - 1);
		}
	}

	__bubbleUp(index) {
		// Find the parent's index of this index
		let parent = Math.floor((index - 1) / 2);
		// Base case: we are already at the root level
		if (index <= 0) {
			return;
			// parent can't be greater than its child, so we swap them
		} else if (this.heap[parent] > this.heap[index]) {
			this.__swap(parent, index, this.heap);
			// after swapping, parent is now the swapped new element, we continue to look up
			this.__bubbleUp(parent);
		}
	}

	removeMin() {
		if (this.elements > 1) {
			let min = this.heap[0];
			this.heap[0] = this.heap[this.elements - 1];
			this.elements -= 1;
			this.__sinkDown(0);
			return min;
		} else if (this.elements === 1) {
			let min = this.heap[0];
			this.elements = this.elements - 1;
			return min;
		} else {
			return null;
		}
	}

	__sinkDown(index) {
		const left = index * 2 + 1;
		const right = index * 2 + 2;
		let smallest = index;

		if (this.elements > left && this.heap[smallest] > this.heap[left]) {
			smallest = left;
		}
		if (this.elements > right && this.heap[smallest] > this.heap[right]) {
			smallest = right;
		}
		// Found a smaller number than its parnet
		if (smallest !== index) {
			this.__swap(smallest, index, this.heap);
			this.__sinkDown(smallest);
		}
	}

	__swap(i, j, heap) {
		[heap[i], heap[j]] = [heap[j], heap[i]];
	}
}
// var heap = new minHeap()
// heap.insert(12)
// heap.insert(10)
// heap.insert(-10)
// heap.insert(100)
// heap
// heap.removeMin()
// heap
