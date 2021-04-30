const arr = [1, 0, -1, 1, 2, -1, -4];

function getZeroArr(arr) {
  const zeroArr = []
  if (arr instanceof Array && arr.length > 2) {
    const len = arr.length;
    let l = 0, c = 1, r = 2;
    for (; l < len - 3; l++) {
      c = l + 1;
      for (; c < len - 2; c++) {
        r = c + 1;
        for (; r < len - 1; r++) {
          const lnum = arr[l], cnum = arr[c], rnum = arr[r];
          const dest = [lnum, cnum, rnum].sort().join();
          if (lnum + cnum + rnum === 0 && !zeroArr.includes(dest)) {
            zeroArr.push(dest)
          }
        }
      }
    }
  }
  return zeroArr.map(i => i.split(',').map(i => +i));
}
const res = getZeroArr(arr)
console.log(res);



