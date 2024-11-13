const createBinaryTree = require('./index')

function treeSum(tree) {
  const pathArr = [];
  function treePath(node, path = '') {
    if (node && (node.left || node.right)) {
      if (node.left) {
        treePath(node.left, `${path}${node.val}`)
      }
      if (node.right) {
        treePath(node.right, `${path}${node.val}`)
      }
    } else {
      pathArr.push(`${path}${node.val}`)
    }
  }
  treePath(tree)
  const res = [...pathArr].reduce((p, c) => +c + p, 0);
  return res;
}

const src = createBinaryTree([1, 2, 3, 4, 5]);
const tempRes = treeSum(src);
console.log(tempRes);


