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

//Searches a value in the given list (Iterative)
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

// (Recursive)
LinkedList.prototype.searchRecursive = (value) => {
    
}