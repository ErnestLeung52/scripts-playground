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
		if (this.array.length !== 0) {
			for (let i = this.array.length - 1; i >= 0; i -= 1) {
				this.array[i + 1] = this.array[i];
			}
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

// const arr = new Array();
// arr.push(1);
// arr.push(2);
// arr.push(3);
// arr.pop();
// arr.unshift(4)
// console.log(arr);
