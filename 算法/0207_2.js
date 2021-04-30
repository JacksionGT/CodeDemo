// 4. 其中，rc > beta > alpha，major > minor > patch；
// 5. 例子，1.2.3 < 1.2.4 < 1.3.0-alpha.1 < 1.3.0-alpha.2 < 1.3.0-beta.1 < 1.3.0-rc.1 < 1.3.0

// 1.3.0-beta.1
// 1.2.0-rc.1
const patchMap = new Map([['', 4], ['alpha', 1], ['beta', 2], ['rc', 3]]);

const compare = (str1, str2) => {
  // 转换成 {MAJOR}.{MINOR}.{PATCH}-{alpha|beta|rc}.{number} 格式
  // eg： 1.2.3 --> 1.2.3-.
  const separator = /[\.-]/;
  const transformPatch = num => Number.isNaN(parseInt(num)) ? patchMap.get(num) : parseInt(num);
  const ver1 = (str1.includes('-') ? str1.split(separator): `${str1}-.`.split(separator)).map(transformPatch);
  const ver2 = (str2.includes('-') ? str2.split(separator): `${str2}-.`.split(separator)).map(transformPatch);
  let res = 0;
  for (let i = 0; i < ver1.length; i++) {
    const temp1 = ver1[i], temp2 = ver2[i];
    if(temp1 === temp2) continue;
    res = temp1 - temp2 > 0 ? 1 : -1;
    return res
  }
  return res;
}
console.log(compare('1.2.3','1.2.4'));
console.log(compare('1.2.4','1.3.0-alpha.1'));
console.log(compare('1.3.0-alpha.1','1.3.0-alpha.2'));
console.log(compare('1.3.0-alpha.2','1.3.0-beta.1'));
console.log(compare('1.3.0-beta.1','1.3.0-rc.1'));
console.log(compare('1.3.0-rc.1','1.3.0'));
console.log(compare('1.3.0-beta.1','1.4.0'));