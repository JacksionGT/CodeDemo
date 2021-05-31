// ['12a','3b','4c','15d','15e','2a'] 统计这个数组中出现次数最多的字母前的数字和，这个数组就是a, 12+2 = 14

const getSum = arr => {
    const summary = new Map();
    for (let value of arr) {
        const [v, k] = value.split(/(?=(\w$))/)
        if (summary.has(k)) {
            const temp = summary.get(k);
            summary.set(k, { count: temp.count + 1, sum: + v + temp.sum  })
        } else {
            summary.set(k, { count: 1, sum: +v })
        }
    }
    return Array.from(summary).sort((a, b) => b[1].count - a[1].count)[0][1].sum;
}
const data = ['12a', '3a', '4d', '15d', '15e', '2a'];
const res = getSum(data);
console.log(res);