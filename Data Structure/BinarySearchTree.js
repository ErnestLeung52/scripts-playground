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

BinarySearchTree.prototype.insert = function (newValue) {
  if (this.root === null) {
    this.root = new Node(newValue);
    return;
  }

  // Starting from the root
  let currentNode = this.root;
  let parent;
  // while we get to the null node
  while (currentNode) {
    parent = currentNode; //update the parent
    if (newValue < currentNode.val) {
      //if newValue < currentNode.val, iterate to the left subtree
      currentNode = currentNode.leftChild;
    } else {
      //if newValue >= currentNode.val, iterate to the right subtree
      currentNode = currentNode.rightChild;
    }
  }
  //by now, we will have the parent of the null
  //node where we have to insert the newValue
  if (newValue < parent.val) {
    //if newValue < parent.val, insert into the leftChild
    parent.leftChild = new Node(newValue);
  } else {
    //if newValue >= parent.val, insert into the rightChild
    parent.rightChild = new Node(newValue);
  }
};

BinarySearchTree.prototype.insertRecursive = function (currentNode, newValue) {
  // We found a place! Now intialize currentNode with the newValue
  if (currentNode === null) {
    currentNode = new Node(newValue);
  } else if (newValue < currentNode.val) {
    //if newValue < currentNode.val, let's go to the left subtree
    currentNode.leftChild = this.insertRecursive(
      currentNode.leftChild,
      newValue
    );
  } else {
    //if newValue >= currentNode.val, let's go to the right subtree
    currentNode.rightChild = this.insertRecursive(
      currentNode.rightChild,
      newValue
    );
  }
  return currentNode;
};
// Helper function that enables us to give a starting point
BinarySearchTree.prototype.insertRecursiveBST = function (newValue) {
  if (this.root === null) {
    this.root = new Node(newValue);
    return;
  }
  this.insertRecursive(this.root, newValue);
};

// Pre-order: “root-left-right” order.
BinarySearchTree.prototype.preOrderPrint = function (currentNode, arr = []) {
  if (currentNode !== null) {
    // console.log(currentNode);
    arr.push(currentNode.val);
    this.preOrderPrint(currentNode.leftChild, arr);
    this.preOrderPrint(currentNode.rightChild, arr);
  }
  return arr;
};

const bsTree = new BinarySearchTree(6);
bsTree.insertRecursiveBST(4);
bsTree.insertRecursiveBST(9);
bsTree.insertRecursiveBST(5);
bsTree.insertRecursiveBST(2);
bsTree.insertRecursiveBST(8);
// console.log(bsTree.preOrderPrint(bsTree.root)); [ 6, 4, 2, 5, 9, 8 ] 
