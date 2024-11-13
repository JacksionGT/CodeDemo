function TreeNode(data) {
  this.val = data;
  this.left = null;
  this.right = null;
}

function createBinaryTree(list) {
  if (!list || list.length === 0) {
    return null;
  }
  const node = new TreeNode(list.shift());
  const stack = [node];
  while (stack.length > 0) {
    if (list.length > 0) {
      const temp = stack.shift();
      temp.left = new TreeNode(list.shift());
      stack.push(temp.left);
      if (list.length > 0) {
        temp.right = new TreeNode(list.shift());
        stack.push(temp.right);
      }
    } else {
      stack.length = 0
    }
  }
  return node;
}

module.exports = createBinaryTree;