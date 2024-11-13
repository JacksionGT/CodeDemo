function trans(num) {
  if (typeof num === 'number') {
    const c1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    const c2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万'];
    const str = num.toString();
    const len = str.length -1;
    const res = str.split('').map((p,i)=>{
      return p == 0 ?  c1[p -0]: `${c1[p -0]}${c2[len - i]}`;
    })
    return res.join('').replace(/零+/g, c1[0]).replace(/(?<!^)零$/g, '');
  }
  return '';
}

console.log(trans(100010001));

console.log(trans(120010401));
console.log(trans(927348448));
console.log(trans(100000000));
console.log(trans(0));
console.log(trans(9123456789123));