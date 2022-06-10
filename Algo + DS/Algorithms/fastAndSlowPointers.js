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

/* -------------- 3. Happy Number  ------------------
Any number will be called a happy number if, after repeatedly replacing it with a number equal to the sum of the square of all of its digits, leads us to number ‘1’. All other (not-happy) numbers will never reach ‘1’. Instead, they will be stuck in a cycle of numbers which does not include ‘1’.
Input: 23   
Output: true (23 is a happy number) => 2^2+3^2 = 13 ==> 1^2+3^2 = 10 ==> 1^2+0^2 = 1
*/
function find_happy_number(num) {
	let slow = num,
		fast = num;
	while (true) {
		slow = find_square_sum(slow); // move one step
		fast = find_square_sum(find_square_sum(fast)); // move two steps
		if (slow === fast) {
			// found the cycle
			break;
		}
	}
	return slow === 1; // see if the cycle is stuck on the number '1'
}
function find_square_sum(num) {
	let sum = 0;
	while (num > 0) {
		digit = num % 10;
		sum += digit * digit;
		num = Math.floor(num / 10);
	}
	return sum;
}
// console.log(find_happy_number(12));

/* -------------- 4. Middle of the LinkedList  ------------------
Given the head of a Singly LinkedList, write a method to return the middle node of the LinkedList.
If the total number of nodes in the LinkedList is even, return the second middle node.
*/
const find_middle_of_linked_list = function (head) {
	let slow = head,
		fast = head;
	while (fast !== null && fast.next !== null) {
		slow = slow.next;
		fast = fast.next.next;
	}
	return slow;
};
