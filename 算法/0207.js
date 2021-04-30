// {MAJOR}.{MINOR}.{PATCH}-{alpha|beta|rc}.{number}

// 思路： 根据权重将version计算成数字比较
// 1.3.0-beta.1 权重 = 1×1000 + 3×100 + (0+2)×10 + 1×1
// 假设patch的权重 alpha = 1, beta = 2, rc = 3, '' = 4, 
// patch 1-beta 的权重为 (1+2)×10

// 计算patch
const patchMap = new Map([['', 4], ['alpha', 1], ['beta', 1], ['rc', 3]]);
const getPatchPow = str => {
  const parts = str.split('-');
  return parseInt(parts[0]) + patchMap.get(parts[1] || '');
};

// 计算version大小
const getPower = ver => {
  const ver = ver.split('.').length === 3 ? `${ver}.0` : ver;
  const verArr = ver.split('.').map((part, index) => ({ 
    lever: Math.pow(10, 3 - index),
    val: index === 2 ? getPatchPow(part) : parseInt(part)
  }));
  const power = verArr.reduce((prev, part) => prev + part.val * part.lever, 0)
  return power;
}

const compare = (ver1, ver2) => {
  const res = getPower(ver1) - getPower(ver2);
  console.log(res);
  return res > 0 ? 1 : (res === 0 ? 0 : -1)
}

console.log(compare('2.3.2-alpha.2', '2.3.3.2'));




// console.log(getPatchVersionPower('2-alpha'));
// console.log(getPatchVersionPower('3'));
// console.log(getVersionPower('2.3.2-alpha.2'));
// console.log(getVersionPower('2.3.3.2'));
