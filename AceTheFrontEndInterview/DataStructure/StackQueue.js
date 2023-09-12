/* 1. Implement a function findBin(n), which will generate binary numbers from 1 to n in the form of a string using a queue. An illustration is also provided for your understanding.
 */

class Queue {
	constructor() {
		this.items = [];
	}

	isEmpty() {
		return this.items.length === 0;
	}

	getFront() {
		if (!this.isEmpty()) {
			return this.items[0];
		} else {
			return null;
		}
	}

	size() {
		return this.items.length;
	}

	enqueue(el) {
		return this.items.push(el);
	}

	dequeue() {
		return this.items.shift();
	}
}

const findBin = (n) => {
	const result = [];
	const queue = new Queue();

	queue.enqueue('1');

	for (let i = 0; i < n; i++) {
		const currNum = queue.dequeue();

		result.push(currNum);

		queue.enqueue(currNum + '0');
		queue.enqueue(currNum + '1');
		queue;
	}

	return result;
};
// console.log(findBin(5));

/* 2. You have to implement the minStack class, which will have a min() function. Whenever min() is called, the minimum value of the stack is returned in O(1) time. The element is not popped from the stack; its value is simply returned.
 */

class MinStack {
	constructor() {
		this.mainStack = [];
		this.minStack = [];
	}

	push(el) {
		this.mainStack.push(el);

		// If minStack is empty OR element is less than or equal to the top of minStack
		if (this.minStack.length === 0 || el <= this.minStack[this.minStack.length - 1]) {
			this.minStack.push(el);
		}
	}

	pop() {
		const removedEl = this.mainStack.pop();

		if (removedEl === this.minStack[this.minStack.length - 1]) {
			this.minStack.pop();
		}

		return removedEl;
	}

	min() {
		return this.minStack[this.minStack.length - 1];
	}
}
// const stack = new MinStack();
// stack.push(3);
// stack.push(5);
// console.log(stack.min()); // 3
// stack.push(2);
// stack.push(1);
// console.log(stack.min()); // 1
// stack.pop();
// console.log(stack.min()); // 2
