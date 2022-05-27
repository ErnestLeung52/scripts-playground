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
