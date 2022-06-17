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

/* ----------- 2. Reverse a LinkedList ----------
Given the head of a LinkedList and two positions ‘p’ and ‘q’, reverse the LinkedList from position ‘p’ to ‘q’.
*/
function reverse_sub_list(head, p, q) {
	if (p === q) {
		return head;
	}
	let current = head,
		previous = null;
	let i = 0;

	// after skipping 'p-1' nodes, current will point to 'p'th node. p - 1 because 0 is already pointing at head
	while (current !== null && i < p - 1) {
		previous = current;
		current = current.next;
		i++;
	}

	// we are interested in three parts of the LinkedList, the part before index 'p',
	// the part between 'p' and 'q', and the part after index 'q'
	const last_node_of_first_part = previous;
	// after reversing the LinkedList 'current' will become the last node of the sub-list
	const last_node_of_sub_list = current;
	let next = null; // will be used to temporarily store the next node

	i = 0;
	// reverse nodes between 'p' and 'q'
	while (current !== null && i < q - p + 1) {
		next = current.next;
		current.next = previous;
		previous = current;
		current = next;
		i += 1;
	}
 
	// connect with the first part
	if (last_node_of_first_part !== null) {
		// 'previous' is now the first node of the sub-list
		last_node_of_first_part.next = previous;
		// this means p === 1 i.e., we are changing the first node (head) of the LinkedList
	} else {
		head = previous;
	}

	// connect with the last part
	last_node_of_sub_list.next = current;
	return head;
}
