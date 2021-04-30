function path(n) {
  let sum = 0
  function checkPath(pathRecord, x, y, count) {
    // console.log(pathRecord.join('\t'));
    // console.log(count);
    // console.log([...pathRecord, ], x, y, count);

    console.log([...pathRecord, `${x},${y}`]);
    if (pathRecord.indexOf(x + ',' + y) > -1) return
    if (count === 0) sum++
    else {
      const pathRecordCopy = [...pathRecord];
      pathRecordCopy.push(x + ',' + y);

      checkPath(pathRecordCopy, x + 1, y, count - 1);
      checkPath(pathRecordCopy, x, y + 1, count - 1);
      if (x !== 0){
        checkPath(pathRecordCopy, x - 1, y, count - 1);
      }
      if (y !== 0) {
        checkPath(pathRecordCopy, x, y - 1, count - 1);
      }
    }
  }
  checkPath(['0,0'], 0, 1, n - 1);
  return sum;
}

console.log(path(2));