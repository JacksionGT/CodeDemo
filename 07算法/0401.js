function trans(num) {
  const c1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  const c2 = ['', '十', '百', '千'];
  const c3 = ['', '万', '亿']

  const transPart = n => n
    .split('')
    .reverse()
    .map((o, i) => `${c1[o - 0]}${o - 0 === 0 ? '' : c2[i]}`)
    .reverse()
    .join('')
    .replace(/零+/g, c1[0])
    .replace(/(?<!^)零$/g, '');

  if (typeof num === 'number') {
    const str = `${num}`
      .replace(/(?<!^)(?=(\d{8})+$)/g, ',')
      .split(',')
      .reverse()
      .map((p,i) => {
        const res = p.replace(/(?<!^)(?=(\d{4})+$)/g, ',')
          .split(',')
          .map(p => transPart(p))
          .join(c3[1]);
        return res.replace(/(?<!^)零$/g, '');
      })
      .reverse()
      .join(c3[2])
    return str
  }
  return '';
}
// console.log(trans(281234));
// console.log(trans(281204));
// console.log(trans(281004));
// console.log(trans(281000));
// console.log(trans(280));
// console.log(trans(1234));
// console.log(trans(1204));
// console.log(trans(1004));
// console.log(trans(1000));
// console.log(trans(0));

// console.log(trans(700012001234));
// console.log(trans(700012001204));
// console.log(trans(700012001004));
// console.log(trans(700012001000));
// console.log(trans(700012000000));

// console.log(trans(8000012001234));
// console.log(trans(8000012001204));
// console.log(trans(8000012001004));
// console.log(trans(8000012001000));
// console.log(trans(8000012000000));

console.log(trans(100010001));
