const pointInPath = (point, path) => {
  const [px, py] = point;
  const temp = path.find(item => {
    const [x, y] = item;
    // console.log(`px=${px}, py=${py}, x=${x}, y=${y}`);
    const res = x === px && y === py;
    // console.log(`res = ${res}`);
    return res;
  })
  return Boolean(temp);
}

const getPath = (stepCount, passedPoints = [[0, 0], [0, 1]]) => {
  if (stepCount < 2) return 1;
  let count = 0, [x, y] = passedPoints.slice(-1)[0];
  const nextStepPoints = [], stepIndex = passedPoints.length - 1;
  if (stepIndex < stepCount) {
    let tempPoint = [x - 1, y],
      notExist = !pointInPath(tempPoint, passedPoints);
    if (tempPoint[0] >= 0 && notExist) {
      nextStepPoints.push(tempPoint);
      count += 1;
      console.log(`tempPoint = ${tempPoint},notExist = ${notExist},count = ${count}`);
    }
    tempPoint = [x + 1, y];
    notExist = !pointInPath(tempPoint, passedPoints);
    if (tempPoint[0] <= stepCount && notExist) {
      nextStepPoints.push(tempPoint)
      count += 1;
      console.log(`tempPoint = ${tempPoint},notExist = ${notExist},count = ${count}`);
    }
    tempPoint = [x, y - 1];
    notExist = !pointInPath(tempPoint, passedPoints);
    if (tempPoint[1] >= 0 && notExist) {
      nextStepPoints.push(tempPoint)
      count += 1;
      console.log(`tempPoint = ${tempPoint},notExist = ${notExist},count = ${count}`);
    }
    tempPoint = [x, y + 1];
    notExist = !pointInPath(tempPoint, passedPoints);
    if (tempPoint[1] <= stepCount && notExist) {
      nextStepPoints.push(tempPoint)
      count += 1;
      console.log(`tempPoint = ${tempPoint},notExist = ${notExist},count = ${count}`);
    }
  }
  const nextStepIndex = passedPoints.length;
  console.log(passedPoints);
  console.log(nextStepPoints);
  if (nextStepPoints.length > 0 && nextStepIndex < stepCount) {
    const pointsCount = nextStepPoints.map(item => {
      return getPath(stepCount, [...passedPoints, item])
    })
    console.log(pointsCount);
    return pointsCount.reduce((last, current) => last + current, 0);
  }
  return count;
}

console.log(getPath(4));