// Stack: last in first out
function Stack() {
	this.storage = {};
	this.index = 0;
}

Stack.prototype.push = function (value) {
	this.storage[this.index++] = value;
};

Stack.prototype.pop = function () {
	if (this.index <= 0) {
		return undefined;
	}
	let removedItem = this.storage[this.index - 1];
	delete this.storage[--this.index];
	return removedItem;
};

const stack = new Stack();

// stack.push(1)
// stack.push(2)
// stack.push(3)
// stack.pop()
// stack

class Queue {
	constructor() {
		this.storage = {};
		this.index = 0;
	}

	enqueue(val) {
		this.storage[this.index++] = value;
	}

	dequeue() {
		if (this.index <= 0) return undefined;

		const dequeuedItem = this.storage[0];
		delete this.storage[0];

        // create 0
		for (let key in this.storage) {
			this.storage[key - 1] - this.storage[key];
		}
        // delete last
		delete this.storage[this.index - 1];
		this.index--;
		return dequeuedItem;
	}
}
