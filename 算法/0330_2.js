function path(n) {
  let sum = 0
  let pathArray = []
  for (let i = 0; i < n; i++) {
    pathArray[i] = []
    for (let j = 1; j < n; j++) {
      pathArray[i][j] = 0
    }
  }
  pathArray[0][0] = 1
  function checkPath(x, y, count) {
    // console.log(`${pathArray.map(item=>item.map(i=> i===1 ? i: '-').join(' ')).join('\t\t')}`);
    if (pathArray[x][y] === 1) return
    if (count === 0) sum++
    else {
      pathArray[x][y] = 1;
      checkPath(x + 1, y, count - 1)
      checkPath(x, y + 1, count - 1)
      if (x !== 0) {
        checkPath(x - 1, y, count - 1)
      }
      if (y !== 0) {
        checkPath(x, y - 1, count - 1)
      }
      pathArray[x][y] = 0
    }

    showArrar(pathArray);
    // console.log(`${pathArray.map(item=>item.join(' ')).join('\t\t')}`);
  }

  checkPath(0, 1, n - 1)
  return sum
}

function showArrar(pathArr) {
  const str =
    pathArr.map((item, index) => [...item].map(o => o === undefined ? '-' : o).join(' ')).join('\n');
    console.log(str);
    console.log('--------------');
}

// console.log(path(2))	  // 2
// console.log(path(3))	  // 5
console.log(path(5))	  // 12
// console.log(path(5))	  // 30
// console.log(path(6))	  // 73
// console.log(path(7))	  // 183
// console.log(path(8))	  // 456

// 19x19 : 13542718       // 耗时：   518 ms
// 20x20 : 34884239       // 耗时：  1323 ms
// 21x21 : 89991344       // 耗时：  3360 ms
// 22x22 : 232282110      // 耗时：  8661 ms
// 23x23 : 600281932      // 耗时： 23251 ms
// 24x24 : 1552096361     // 耗时： 58033 ms
// 25x25 : 4017128206     // 耗时：176351 ms

// var t1 = Date.now();
// console.log(path(21));
// var t2 = Date.now();
// console.log(`耗时：${t2 - t1} ms`);

// function test(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     const element = arr[i];
//     var t1 = Date.now();
//     console.log(`${element}x${element} : ${path(element)}`);
//     var t2 = Date.now();
//     console.log(`耗时：${t2 - t1} ms`);
//   }
// }
// test([19,20,21,22,23,24,25])