class LinkedList {
  constructor() {
    this.head = null;
  }
}

class Node {
  constructor() {
    this.data = data;
    this.nextElement = null;
  }
}

// SEARCHES a value in the given list
// (Iterative) | TC: O(N) | SC: O(1)
LinkedList.prototype.search = (value) => {
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
LinkedList.prototype.searchRecursive = (node, value) => {
  if (node !== null) return false;
  if (node.data === value) return true;
  return this.searchRecursive(node.nextElement, value);
};

// DELETE a value
LinkedList.prototype.delete = (value) => {
  //if list is empty, do nothing
  if (this.isEmpty()) {
    return this;
  }
  //Get the head and first element of the list
  let firstElement = this.head;
  //If list is not empty, link head to the nextElement of firstElement
  this.head = firstElement.nextElement;
  return this;
};
