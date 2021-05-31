// 数组全排列
// var arr = [1, 2, 3]
// // 预期结果
// const res = [
//     [1, 2, 3],
//     [1, 3, 2],
//     [2, 1, 3],
//     [2, 3, 1],
//     [3, 1, 2],
//     [3, 2, 1]
// ];

const arr = [1, 2, 3]

function allSort(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        const rest = arr.filter(i => i !== element);
        res.push([element, ...rest]);
        if (rest.length > 1) {
            const temp = allSort(rest);
            for (let j = 0; j < temp.length; j++) {
                const nextRest = temp[j];
                const tempRes = [element, ...nextRest];
                if(tempRes.join('') !== [element, ...rest].join('')){
                    res.push(tempRes);
                }
            }
        }
    }
    return res;
}

console.log(allSort(arr));

