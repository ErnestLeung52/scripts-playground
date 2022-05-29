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

// Detect Loop
LinkedList.prototype.detectLoop = function (list) {
  let onestep = list.getHead();
  let twostep = list.getHead();
  while (onestep != null && twostep != null && twostep.nextElement != null) {
    onestep = onestep.nextElement; // Moves one node at a time
    twostep = twostep.nextElement.nextElement; // Moves two nodes at a time
    if (onestep == twostep) {
      // Loop exists
      return true;
    }
  }
  return false;
};

// Find mid-point
LinkedList.prototype.findMid = function (list) {
  let midNode = null;
  //Write your code here
  if (list.isEmpty()) {
    return null;
  }
  let slowerNode = list.getHead();
  let fasterNode = list.getHead();
  if (slowerNode.nextElement == null) {
    return slowerNode;
  }
  while (
    slowerNode.nextElement != null &&
    fasterNode.nextElement != null &&
    fasterNode.nextElement.nextElement != null
  ) {
    slowerNode = slowerNode.nextElement;
    fasterNode = fasterNode.nextElement.nextElement;
  }
  return slowerNode;
};

LinkedList.prototype.removeDuplicates = function (list) {
  //Write your code here
  const cache = {};

  let currNode = list.getHead();
  let previousNode = null;

  while (currNode !== null) {
    //   let nextNode = currNode.nextElement
    if (currNode.data in cache) {
      previousNode.nextElement = currNode.nextElement;
    } else {
      cache[currNode.data] = currNode.data;
      previousNode = currNode;
    }
    currNode = currNode.nextElement;
  }
  return list; //return the updated list here
};

// O(m+n)
LinkedList.prototype.union = function (list1, list2) {
  if (list1.isEmpty()) {
    return list2;
  } else if (list2.isEmpty()) {
    return list1;
  }

  let start = list1.getHead();
  //Traverse the first list till the tail
  while (start.nextElement != null) {
    start = start.nextElement;
  }
  //Link last element of first list to the first element of second list
  start.nextElement = list2.getHead();
  list1.removeDuplicates();
  return list1;
};

LinkedList.prototype.union = function (list1, list2) {
  let result = new LinkedList();

  let t1 = list1.getHead();
  let t2 = list2.getHead();

  while (t1 != null) {
    while (t2 != null) {
      if (t1.data == t2.data) {
        result.insertAtHead(t1.data);
      }
      t2 = t2.nextElement;
    }
    t2 = list2.getHead();
    t1 = t1.nextElement;
  }
  result.removeDuplicates();
  return result;
};

//max(O(mn),O(min(m,n)^2))

LinkedList.prototype.intersection = function (list1, list2) {
  let result = new LinkedList();
  let t1 = list1.getHead();
  let t2 = list2.getHead();

  while (t1 != null) {
    while (t2 != null) {
      if (t1.data == t2.data) {
        result.insertAtHead(t1.data);
      }
      t2 = t2.nextElement;
    }
    t2 = list2.getHead();
    t1 = t1.nextElement;
  }
  result.removeDuplicates();
  return result;
};

LinkedList.prototype.findNth = function (list, n) {
  let nthNode = null;
  let length = 0;
  let tempNode = list.getHead();
  while (tempNode != null) {
    tempNode = tempNode.nextElement;
    length++;
  }
  let nthPos = length - n;
  if (nthPos < 0 || nthPos > length) {
    return null;
  }
  nthNode = list.getHead();
  for (var i = 0; i < nthPos; i++) {
    nthNode = nthNode.nextElement;
  }
  return nthNode;
};

LinkedList.prototype.findNth2 = function (list, n)

// dummy
let list = new LinkedList();
list.insertAtHead(7);
list.insertAtHead(3);
list.insertAtHead(9);
list.insertAtHead(3);
list.insertAtHead(4);
list.insertAtHead(1);
// list.reverse(list);
// console.log(list.removeDuplicates(list));

// Adding a loop
// let head = list.getHead();
// let node = list.getHead();
// for(var i=0; i<4; i++){
//   if(node.nextElement == null){
//     node.nextElement = head.nextElement;
//     break;
//   }
//   node = node.nextElement
// }

// console.log(list.printList());
