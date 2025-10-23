// const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;

  }

  add(data) {
    if (!this.treeRoot) {
      this.treeRoot = new Node(data);
    } else {
      let node = this.treeRoot;
      let newNode = new Node(data);

      while (node) {
        if (data > node.data) {
          if (!node.right) {
            break;
          }

          node = node.right;
        } else {
          if (!node.left) {
            break;
          }

          node = node.left;
        }
      }

      if (data > node.data) {
        node.right = newNode;
      } else {
        node.left = newNode;
      }
    }
  }

  has(data) {
    let node = this.treeRoot;

    while (node) {
      if (data === node.data) {
        return true;
      } else if (data < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    return false;
  }

  find(data) {
    let node = this.treeRoot;

    while (node) {
      if (data === node.data) {
        return node;
      } else if (data < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    return null;
  }

  remove(data) {
    let node = this.treeRoot;
    let parent = null;

    while (node) {
      if (data < node.data) {
        parent = node;
        node = node.left;
      } else if (data > node.data) {
        parent = node;
        node = node.right;
      } else {
        if (!node.left && !node.right) {
          if (!parent) {
            this.treeRoot = null;
          } else if (node === parent.left) {
            parent.left = null;
          } else {
            parent.right = null;
          }
        } else if (!node.left) {
          if (!parent) {
            this.treeRoot = node.right;
          } else if (node === parent.left) {
            parent.left = node.right;
          } else {
            parent.right = node.right;
          }
        } else if (!node.right) {
          if (!parent) {
            this.treeRoot = node.left;
          } else if (node === parent.left) {
            parent.left = node.left;
          } else {
            parent.right = node.left;
          }
        } else {
          let rightChild = node.right;
          let rightChildParent = null;

          while (rightChild.left) {
            rightChildParent = rightChild;
            rightChild = rightChild.left;
          }

          if (rightChildParent) {
            rightChildParent.left = rightChild.right;
          } else {
            node.right = rightChild.right;
          }

          node.data = rightChild.data;
        }

        break;
      }
    }
  }

  min() {
    let node = this.treeRoot;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    let node = this.treeRoot;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};