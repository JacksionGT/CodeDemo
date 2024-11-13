function trans(num) {

  const c1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  const c2 = ['', '十', '百', '千'];
  const c3 = ['', '万', '亿'];

  if (typeof num === 'number') {
    const str = `${num}`;
    const l = str.length;
    const res = str
      .split('')
      .reverse()
      .map((p, i) => {
        const parts = [c1[p - 0]];
        parts.push(p - 0 === 0 ? '' : c2[i])
        if (i % 4 === 0) {
          parts.push(c3[Math.floor(i % 4)])
        }
        if (i % 8 === 0) {
          parts.push(c3[2])
        }
        return parts.join('')
      })
      .reverse()
      .join('')
      .replace(/零+/g, c1[0])
    return res
  }
  return '';
}


console.log(trans(1234));