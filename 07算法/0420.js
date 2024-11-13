function sumFibonacci(n) {
  if (typeof n === 'number') {
    if (n === 0) return '0'
    if (n === 1) return '1'
    let n1 = '0', n2 = '1', n3 = '1',
      l = 3, res = '2';

    while (l < n) {
      n1 = n2;
      n2 = n3;
      n3 = sum(n1, n2);
      res = sum(n3, res);
      l++;
    }
    return res;
  }
}


// 大数相加
// sum(12,13,14)
function sum(...rest) {
  const len = rest.reduce((p,c)=> p > c.length ? p : c.length, 0);
  const arr = rest.map(i=> `${i}`.padStart(len, '0').split(''));
  let carry = 0, res = [];
  for (let i = len - 1; i >= 0; i--) {
    const dest = arr.map(o => o[i]).reduce((p,c)=> +c +p , 0) + carry;
    carry = Math.floor(dest / 10);
    res.unshift(dest % 10);
  }
  if(carry > 0){
    res.unshift(carry);
  }
  return res.join('');
}

console.log(sumFibonacci(4));
console.log(sumFibonacci(10));
console.log(sumFibonacci(100));
console.log(sumFibonacci(1000));
console.log(sumFibonacci(10000));