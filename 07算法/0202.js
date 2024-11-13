// 给定一个整数，返回它在Excel表中相对应的列名称
// 例如：
// 1 -> A, 2 -> B, 3 ->C, ..., 26 -> Z, 27 -> AA, 28 -> AB, ....
// 示例： 输入 1, 输出 "A". 输入 28, 输出 "AB".

const getColumnName = (num) => {
  return String.fromCharCode(num % 26 + 64);
}

console.log(getColumnName(1));
console.log(getColumnName(2));
console.log(getColumnName(16));
console.log(getColumnName(26));
console.log(getColumnName(88));