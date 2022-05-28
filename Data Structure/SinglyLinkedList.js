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

  //else get pointer to head
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

let list = new LinkedList();
list.insertAtHead(2);
list.insertAtHead(4);
list.insertAtHead(5);
list.insertAtHead(7);
list.insertAtHead(1);
console.log(list.printList());
