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
		this.element = 0;
	}

	insert(val) {}

	getMax() {}

	removeMax() {}

	// meant to restore the heap property going up from a node to the root. /private functions
	__percolateUp(index) {}

	// restores the heap property starting from a given node down to the leaves. /private functions
	__maxHeapify(index) {}
}
