/* HEAP

All the parent nodes are present in the first half of the array, and the last parent appears at the floor(n/2th) position. In this case, ‘n’ is the last or largest index
- k is the parent node index in an Array, and its children will be at index =>
    LeftChild=2k+1
    RightChild=2k+2

*/

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
		if (index < 0) {
			return;
			// parent can't be greater than its child, so we swap them
		} else if (this.heap[parent] > this.heap[index]) {
			this.__swap(this.heap[parent], this.heap[index], this.heap);
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
}
