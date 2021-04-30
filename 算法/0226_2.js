
const multi = (n1, n2) => {
  if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    return NaN;
  }
  if (n1 === 0 || n2 === 0) {
    return 0;
  }
  if (n1 === 1) return n2;
  if (n2 === 1) return n1;

  if (`${n1}`.length > 15 || `${n2}`.length > 15) {
    throw new new RangeError('out of range')
  }

  const resArr = [];
  let carryFlag = 0,
    factorNum = 0,
    initial = `${n1}`.split('').map(i => i * 1),
    factors = `${n2}`.split('').map(i => i * 1);
  let cursor = factors.length - 1;
  while (factors.length > 0) {
    factorNum = factors.pop();
    const tempResArr = initial.map(num => {
      const tempRes = factorNum * num + carryFlag;
      carryFlag = tempRes > 9 ? parseInt(tempRes / 10) : 0;
      const res = tempRes % 10;
      return res;
    });
    const padding = Array(factors.length - 1 - cursor).fill(0);
    console.log(padding);
    resArr.push(tempResArr.concat(padding));
    cursor--;
  }

  console.log(resArr);
  return 'res';
}

const num1 = 6349526719336;
const num2 = 1865459497823;
const res = multi(num1, num2);
// const res2 = multi(num2, num1);
// console.log(res);
// console.log(res2);

// 限制：超过15位数无法计算
