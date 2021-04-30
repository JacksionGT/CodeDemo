var arr = [1, 2, 3, 4, 5, 6, 7];

function rotateArr1(arr, step) {
  if (step && step > 0) {
    const len = arr.length;
    const temp = arr.slice(len - step);
    for (let index = len - 1; index >= step ;index --) {
      arr[index] = arr[index - step];
    }
    temp.forEach((item, index) => {
      arr[index] = item;
    });
  }
  return arr;
}

console.log(JSON.stringify(rotateArr1(arr,6)));
