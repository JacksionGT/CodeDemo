const pointInPath = ([px, py], path) => Boolean(path.find(([x, y]) => (x === px && y === py)));

const getPath = (stepCount, stepPath = [[0, 0], [0, 1]]) => {
  if (stepCount < 2) return 1;
  let count = 0, [x, y] = stepPath.slice(-1)[0];
  const nextSteps = [], stepIndex = stepPath.length - 1;
  if (stepIndex < stepCount) {
    let step = [x - 1, y];
    if (step[0] >= 0 && !pointInPath(step, stepPath)) {
      nextSteps.push(step);
      count += 1;
    }
    step = [x + 1, y];
    if (step[0] <= stepCount && !pointInPath(step, stepPath)) {
      nextSteps.push(step)
      count += 1;
    }
    step = [x, y - 1];
    if (step[1] >= 0 && !pointInPath(step, stepPath)) {
      nextSteps.push(step)
      count += 1;
    }
    step = [x, y + 1];
    if (step[1] <= stepCount && !pointInPath(step, stepPath)) {
      nextSteps.push(step)
      count += 1;
    }
  }
  const nextStepIndex = stepPath.length;
  if (nextSteps.length > 0 && nextStepIndex < stepCount) {
    return nextSteps.map(item => getPath(stepCount, [...stepPath, item])).reduce((last, current) => last + current, 0);
  }
  return count;
}

// console.log(getPath(2))	  // 2
// console.log(getPath(3))	  // 5
// console.log(getPath(4))	  // 12
// console.log(getPath(5))	  // 30
// console.log(getPath(6))	  // 73
// console.log(getPath(7))	  // 183
// console.log(getPath(8))	  // 456
// console.log(getPath(9))	  // 1151
// console.log(getPath(10))	// 2900
// console.log(getPath(11))	// 7361
// console.log(getPath(12))	// 18684
// console.log(getPath(13))	// 47652
// console.log(getPath(14))	// 121584
// console.log(getPath(15))	// 311259
// console.log(getPath(16))	// 797311
// console.log(getPath(17))	// 2047384
// console.log(getPath(18))	// 5260692
// console.log(getPath(19))	// 13542718
var t1 = Date.now();
console.log(getPath(20))	// 34884239
var t2 = Date.now();
console.log(`耗时：${t2 - t1} ms`);
// console.log(getPath(21))	// 89991344
// console.log(getPath(22))	// 232282110
// console.log(getPath(23))	// 600281932
// console.log(getPath(24))	// 1552096361
// console.log(getPath(25))	// 4017128206