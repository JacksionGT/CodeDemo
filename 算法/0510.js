// 实现maxDeep()

// maxDeep([1,2,3,4,5]) // 1

// maxDeep([1,[2,3],4,[5,6],[7]]) // 2

// maxDeep([1,[2,[3],4],[5,6],[7]]) // 3

// // 解法1:深度递归
// 失败的想法：遍历输入数组中的每一项，如果当前想不是数组深度为1，如果是当前项数组则得递归调用当前函数，返回1+当前项数组的深度，得到数组的深度。最后比较输入数组每一项的深度。
// function maxDeep1(arr) {
//     if(arr instanceof Array){
//         let depth = 1, next = null;
//         // console.log(arr,depth);
//         for (let index = 0; index < arr.length; index++) {
//             next = arr[index];
//             let currentDepth = 1;
//             if (next instanceof Array) {
//                 while(next){
//                     currentDepth += 1;
//                     console.log(next,depth);
//                     const temp = next;
//                     next = null;
//                     for (let j = 0; j < temp.length; j++) {
//                         const item = temp[j];
//                         if(item instanceof Array){
//                             next = item;
//                             currentDepth += 1;
//                             break;
//                         }
//                     }
//                 }
//                 if(depth < currentDepth){
//                     depth = currentDepth;
//                 }
//             }
//         }
//         return depth;
//     }
//     return 0;
// }

//解法2：广度递归
function maxDeep(arr) {
    let deep = 0, deepArr = arr;
    while(deepArr && deepArr.length > 0){
        deep ++;
        deepArr = deepArr.filter(i => i instanceof Array).reduce((p,c)=> p.concat(c),[])
    }
    return deep
}


//解法3:转字符串，回文算法
// 失败： 
// 无法将[1,[2,[3],4],[5,6],[7]] 转换成字符串"[1,[2,[3],4],[5,6],[7]]"
function maxDeep3(arr) {
    let deep = 0, deepArr = arr;
    while(deepArr && deepArr.length > 0){
        deep ++;
        deepArr = deepArr.filter(i => i instanceof Array).reduce((p,c)=> p.concat(c),[])
    }
    return deep
}

console.log(maxDeep([1,2,3,4,5]));
console.log(maxDeep([1,[2,3],4,[5,6],[7]]));
console.log(maxDeep([1,[2,[3],4],[5,6],[7]]));
 // 3
