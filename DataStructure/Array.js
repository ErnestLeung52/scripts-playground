class Array {
	constructor() {
		this.array = [];
	}

	push(val) {
		this.array[this.array.length] = val;
		return this.array;
	}

	pop() {
		const removed = this.array[this.array.length - 1];
		this.array = this.array.slice(0, -1);
		return removed;
	}

	unshift(val) {
		for (let i = this.array.length - 1; i >= 0; i -= 1) {
			this.array[i + 1] = this.array[i];
		}
		this.array[0] = val;
		return this.array;
	}

	shift() {
		const removed = this.array[0];
		for (let i = 0; i < this.array.length - 1; i += 1) {
			this.array[i] = this.array[i + 1];
		}
		return removed;
	}
}

