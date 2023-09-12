/*
Singly Linked List DS:
Head_{data, pointer} -> Node_{data1, pointer1} -> Node_{data2, pointer2} -> Null
*/

class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class SinglyLinkedList {
	constructor() {
		this.head = null;
	}

	isEmpty() {
		return this.head === null;
	}

	insertAtHead = (newData) => {};

	insertAtTail = (newData) => {};

	insertAtN = (newData) => {};
}
