function sqrt(n, p) {
  if (typeof n === 'number') {
    let res = 1, o = n + '';
    let int = o.split('.')[0],
      decimal = o.split('.')[1],
      p = 0,
      b = 1,
      intLen = int.length,
      intPos = Math.ceil(intLen / 2);
    let initP = int.substr(0, intPos % 2),
      res = getQuotient(initP),
      int = int.substr(intPos % 2);
    while (precision < p) {
      for (; b < 10; b++) {
        if ((res * 20 + b) * b > initP - res * res){
          res = +`${res}${b}`
          break;
        }
      }
      b = 1;
      initP = int.substr(0, 2);
      int = int.substr(2);
      if(initP.length  1){

      }
    }

    console.log(int);
    console.log(intLen);
    console.log(intPos);

  }
  return 0;
}

function getQuotient(dest) {
  let quotient = 1;
  while (quotient * quotient <= dest) {
    quotient += 1;
  }
  return quotient - 1;
}



// console.log(sqrt(1));
// console.log(sqrt(2));
// console.log(sqrt(4));
console.log(sqrt(8649));

// console.log(getQuotient(9));

function getNear(base, dest) {
  let dest = 1;
  while ()
    return base
}

var getNear = (b, s) => (b * 10 + s) * s;