class Node {
  constructor(value) {
    this.val = value; //value of the Node
    this.leftChild = null; //leftChild (will also be of the Node class)
    this.rightChild = null; //rightChild (will also be of the Node class)
  }
}
/*
const myNode= new Node(6);
myNode.leftChild=new Node(5); 
myNode.rightChild=new Node(7);
*/

class BinarySearchTree {
  constructor(rootValue) {
    this.root = new Node(rootValue); //the rootNode
  }
}

// const BST= new BinarySearchTree(8);

