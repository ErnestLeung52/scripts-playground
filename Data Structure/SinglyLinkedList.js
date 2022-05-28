class LinkedList {
  constructor() {
    this.head = null;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.nextElement = null;
  }
}

LinkedList.prototype.isEmpty = function () {
  return this.head === null;
};

LinkedList.prototype.getHead = function () {
  return this.head;
};

LinkedList.prototype.setHead = function (newHead) {
  this.head = newHead;
  return this;
};

LinkedList.prototype.printList = function () {
  if (this.isEmpty()) return false;
  else {
    const arr = [];
    let temp = this.head;
    while (temp !== null) {
      //   process.stdout.write(String(temp.data));
      //   process.stdout.write(' -> ');
      arr.push(temp.data);
      temp = temp.nextElement;
    }
    return arr;
  }
};

// INSERT
LinkedList.prototype.insertAtHead = function (newData) {
  let newHead = new Node(newData);
  newHead.nextElement = this.head;
  this.head = newHead;
  return this;
};

LinkedList.prototype.insertAtTail = function (newData) {
  //Creating a new Node with data as newData
  let node = new Node(newData);
  //check for case when list is empty
  if (this.isEmpty()) {
    //Needs to Insert the new node at Head
    this.head = node;
    return this;
  }
};

// SEARCHES a value in the given list
// (Iterative) | TC: O(N) | SC: O(1)
LinkedList.prototype.search = function (value) {
  //Start from the first element
  let currentNode = this.head;
  //Traverse the list until you find the value or reach the end
  while (currentNode != null) {
    if (currentNode.data == value) {
      return true; //value found
    }
    currentNode = currentNode.nextElement;
  }
  return false; //value not found
};

// (Recursive) | TC: O(N) | SC: O(N)
LinkedList.prototype.searchRecursive = function (node, value) {
  if (node !== null) return false;
  if (node.data === value) return true;
  return this.searchRecursive(node.nextElement, value);
};

// DELETE a value
LinkedList.prototype.delete = function (value) {
  //if list is empty return false
  if (this.isEmpty()) {
    return false;
  }

  let currentNode = this.head;

  // if first node's is the node to be deleted, delete it and return true
  if (currentNode.data == value) {
    this.head = currentNode.nextElement;
    return true;
  }

  // else traverse the list
  while (currentNode.nextElement != null) {
    // if a node whose next node has the value as data, is found, delete it from the list and return true
    if (currentNode.nextElement.data == value) {
      currentNode.nextElement = currentNode.nextElement.nextElement;
      return true;
    }

    currentNode = currentNode.nextElement;
  }
  //else node was not found, return false
  return false;
};

LinkedList.prototype.deleteAtTail = function () {
  // check for the case when linked list is empty
  if (this.isEmpty()) {
    return this;
  }
  //if linked list is not empty, get the pointer to first node
  let currentNode = this.head;
  //check for the corner case when linked list has only one element
  if (currentNode.nextElement == null) {
    this.deleteAtHead();
    return this;
  }
  //otherwise traverse to reach second last node
  while (currentNode.nextElement.nextElement != null) {
    currentNode = currentNode.nextElement;
  }
  //since you have reached second last node, just update its nextElement pointer to point at null, skipping the last node
  currentNode.nextElement = null;
  return this;
};

// GET LENGTH
LinkedList.prototype.getLength = function (list) {
  let length = 0;
  let currentNode = list.getHead();
  while (currentNode != null) {
    length = length + 1;
    currentNode = currentNode.nextElement;
  }
  return length;
};

// Reverse
LinkedList.prototype.reverse = function (list) {
  let previousNode = null,
    currentNode = list.getHead(),
    nextNode = null;

  while (currentNode !== null) {
    /*
    Store the current node’s nextElement in next 
    Set current node’s nextElement to previous (reversal) 
    Make the current node the new previous so that it can be used for the next iteration 
    Use next to move on to the next node 
    */
    nextNode = currentNode.nextElement;
    currentNode.nextElement = previousNode;
    previousNode = currentNode;
    currentNode = nextNode;
  }
  list.setHead(previousNode);
  return list;
};

let list = new LinkedList();
list.insertAtHead(2);
list.insertAtHead(4);
list.insertAtHead(5);
list.insertAtHead(7);
list.insertAtHead(1);
list.reverse(list);
console.log(list.printList());
