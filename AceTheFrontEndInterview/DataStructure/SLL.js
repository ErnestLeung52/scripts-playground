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

SinglyLinkedList.prototype.insertAtTail = (newData) => {};

SinglyLinkedList.prototype.insertAtN = (newData) => {};

const list = new SinglyLinkedList();
for (let i = 0; i < 10; i++) {
	// list = list.insertAtHead(i);
	list.insertAtHead(i);
}
// list.printList();
