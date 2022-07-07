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

// heap
