
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
  let carryFlag = 0;
  let initial = `${n1}`.split('').map(i => i * 1);
  let operator = `${n2}`.split('').map(i => i * 1).reverse().map((num, i) => {
    const temp = initial.map((item, wei) => {
      const tempRes = item * num + carryFlag;
      carryFlag = tempRes > 9 ? parseInt(tempRes / 10) : 0;
      const res = tempRes % 10;
      return res;
    });
    const padding = Array(i).fill(0);
    const res = carryFlag === 0 ? temp.concat(padding) : [carryFlag, ...temp.reverse()].concat(padding);
    carryFlag = 0;
    return res;
  })
  const numberLength = operator[operator.length - 1].length;
  operator = operator.map(arr => arr.join('').padStart(numberLength,0).split('').map(i => i * 1));
  let tempSumRes = Array(numberLength).fill(null).map((_,index)=> (numberLength - index - 1)).map(pointer => operator.map(weiArr => weiArr[pointer]));
  tempSumRes = tempSumRes.map(num => {
    const tempRes = num.reduce((sumRes, curr) => (sumRes + curr), 0) + carryFlag;
    carryFlag = tempRes > 9 ? parseInt(tempRes / 10) : 0;
    const res = tempRes % 10;
    return res;
  })
  const res = carryFlag === 0 ? tempSumRes.reverse().join('') : [carryFlag, ...tempSumRes.reverse()].join('');
  return res;
}

const num1 = 6349526719336;
const num2 = 1865459497823;
const res = multi(num1, num2);
const res2 = multi(num2, num1);
console.log(res);
console.log(res2);

// 限制：超过15位数无法计算
