// 写一个柯里化函数

function add(a, b) {
    return a + b
}
// function curry(fn){}
// curry(add)(a)(b) === 3

// 答案：
const curry = fn => a => b => fn.apply(null, [a, b]);

const res = curry(add)(1)(2);
console.log(res);