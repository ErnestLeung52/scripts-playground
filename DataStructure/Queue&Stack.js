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
