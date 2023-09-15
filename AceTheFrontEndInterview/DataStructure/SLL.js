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

	getHead() {
		return this.head;
	}

	getLength() {
		if (this.isEmpty()) {
			return 0;
		}

		let length = 0;
		let temp = this.head;
		while (temp.next !== null) {
			length++;
			temp = temp.next;
		}

		return length;
	}

	isEmpty() {
		return this.head === null;
	}

	printList() {
		if (this.isEmpty()) {
			console.log('Empty Linked List');
			return;
		} else {
			let result = '';
			let temp = this.head;

			while (temp !== null) {
				result += `${temp.data} -> `;
				temp = temp.next;
			}

			result += 'null';
			console.log(result);

			return;
		}
	}
}

SinglyLinkedList.prototype.insertAtHead = function (newData) {
	const newNode = new Node(newData);

	// Point the next of new node to the old head;
	newNode.next = this.head;
	// new head is the new node
	this.head = newNode;

	return this;
};

SinglyLinkedList.prototype.insertAtTail = function (newData) {
	const newNode = new Node(newData);

	if (this.isEmpty()) {
		this.head = newNode;
		return this;
	}

	let temp = this.head;
	while (temp.next !== null) {
		temp = temp.next;
	}

	temp.next = newNode;
	return this;
};

SinglyLinkedList.prototype.insertAtN = function (newData, n) {
	const newNode = new Node(newData);

	// Case: If the position is less than or equal to 0, insert at head
	if (n <= 0) {
		this.insertAtHead(newData);
		return this;
	}

	let prev = null;
	let curr = this.head;
	let position = 0;

	// Traverse the list to find the n-1 position or until the end of the list
	while (position < n && curr !== null) {
		prev = curr;
		curr = curr.next;
		position++;
	}

	// Case: If the position is greater than the length of the list, insert at the tail
	if (curr === null || position < n) {
		prev.next = newNode;
		return this;
	}

	// Normal case: insert our new node after the previous node
	prev.next = newNode;
	newNode.next = curr;

	return this;
};

SinglyLinkedList.prototype.deleteVal = function (value) {
	if (this.isEmpty()) {
		return null;
	}

	let curr = this.head;

	if (curr.data === value) {
		this.head = curr.next;
		return true;
	}

	while (curr.next !== null) {
		if (curr.next.data === value) {
			curr.next = curr.next.next;
			return true;
		}

		curr = curr.next;
	}

	return false;
};

SinglyLinkedList.prototype.findMid = function () {
	if (this.isEmpty()) {
		return null;
	}

	let midNode = this.getHead();
	let midNodePosition = Math.ceil(this.getLength() / 2);
	midNodePosition;
	for (let i = 1; i < midNodePosition; i++) {
		midNode = midNode.next;
	}

	return midNode.data;
};

// const list = new SinglyLinkedList();
// for (let i = 0; i < 10; i++) {
// 	list.insertAtTail(i);
// }
// list.printList();
