class Node {
	constructor(value, next = null) {
		this.value = value;
		this.next = next;
	}
}

/* -------------- 1.1 LinkedList Cycle  ------------------
Given the head of a Singly LinkedList, write a function to determine if the LinkedList has a cycle in it or not.
*/
const has_cycle = function (head) {
	let slow = head,
		fast = head;
	while (fast !== null && fast.next !== null) {
		slow = slow.next;
		fast = fast.next.next;
		if (fast === slow) return true;
	}
	return false;
};

/* -------------- 1.2 LinkedList Cycle  ------------------
Given the head of a LinkedList with a cycle, find the length of the cycle.
*/
function find_cycle_length(head) {
	let slow = head,
		fast = head;
	while (fast !== null && fast.next !== null) {
		slow = slow.next;
		fast = fast.next.next;
		// Found cycle
		if (fast === slow) {
			return calcCycleLength(slow);
		}
	}
	return 0;
}
function calcCycleLength(slow) {
	let current = slow,
		cycle_length = 0;
	// while (true) {
	// 	current = current.next;
	// 	cycle_length += 1;
	// 	if (current === slow) {
	// 		break;
	// 	}
	// }
	do {
		current = current.next;
		cycle_length += 1;
	} while (current !== slow);
	return cycle_length;
}

/* -------------- 2. Start of LinkedList Cycle  ------------------
Given the head of a Singly LinkedList that contains a cycle, write a function to find the starting node of the cycle.
*/
var find_cycle_start = function (head) {
	if (head === null || head === head.next) return head;
	let slow = head,
		fast = head,
		pointer = head;
	while (fast !== null && fast.next !== null) {
		slow = slow.next;
		fast = fast.next.next;
		if (slow === fast) {
			while (pointer !== slow) {
				pointer = pointer.next;
				slow = slow.next;
			}
			return pointer;
		}
	}
	return null;
};
