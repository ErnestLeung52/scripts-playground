class Node {
	constructor(value, next = null) {
		this.value = value;
		this.next = next;
	}
	get_list() {
		result = '';
		temp = this;
		while (temp !== null) {
			result += temp.value + ' ';
			temp = temp.next;
		}
		return result;
	}
}

/* ----------- 1. Reverse a LinkedList ----------
Given the head of a Singly LinkedList, reverse the LinkedList. Write a function to return the new head of the reversed LinkedList.
*/
// 1 -> 2 -> 3 -> 4
const reverse = function (head) {
	let prev = null,
		current = head,
		next = null;

	while (current !== null) {
		next = current.next;
		current.next = prev;
		prev = current;
		current = next;
	}
	return prev;
};
