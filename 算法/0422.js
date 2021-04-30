// var a = [[1, 4], [3, 8], [10, 15], [11, 18], [20, 27], [14, 15], [19, 28]];

function isOverlapped(arr) {
  let src = arr.sort((a, b) => a[0] - b[0]);
  let res = false;
  let ps, pe, s, e;
  if (arr instanceof Array) {
    while (src.length > 1) {
      [ps, pe] = src.shift();
      [s, e] = src[0];
      if ((pe >= s && pe <= e) || e <= pe) {
        res = true;
        break;
      }
    }
  }
  return res;
}

console.log(isOverlapped([[1, 4], [2, 8]]));
console.log(isOverlapped([[1, 4], [4, 8]]));
console.log(isOverlapped([[1, 4], [5, 8]]));
console.log(isOverlapped([[1, 4], [5, 8], [6, 10]]));
console.log(isOverlapped([[1, 4], [5, 8], [9, 10]]));