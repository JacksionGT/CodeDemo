// 判断是否是质数
const isPrimeNumber = num => {
  let index = 2;
  for(; index < num; index++){
    if(num % index === 0){
      return false;
    }
  }
  return true;
}

// 求小于n的正整数中质数的个数
const getPrimeNumberCount = n => {
  let count = 0, index = 2;
  let arr = [];
  for (; index < n; index++) {
    if(index > 2 && index % 2 === 0) continue;
    if(isPrimeNumber(index)){
      count++;
      arr.push(index);
    }
  }
  console.log(arr);
  return count;
}

console.log(getPrimeNumberCount(100));