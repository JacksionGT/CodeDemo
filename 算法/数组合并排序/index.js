var nums1 = [1,2,3];
var nums2 = [2,5,6];

// 合并数组
const merge = (arr1, arr2) => {
  const arr = [];
  let index = 0
  for(; index < arr1.length; index++){
    arr.push(arr1[index]);
  }
  index = 0;
  for(; index < arr2.length; index++){
    arr.push(arr2[index]);
  }
  return arr;
}

// 遍历排序
const sort = (arr) => {
  const orgin = [...arr];
  const tempArr = [];
  let minIndex = 0, index = 0, min;
  while(orgin.length > 0){
    min = orgin[0]
    for (; index < orgin.length; index++) {
      if(orgin[index] < min) {
        min = orgin[index];
        minIndex = index;
      }
    }
    tempArr.push(min);
    orgin.splice(minIndex,1);
    minIndex = 0;
    index = 0;
  }
  return tempArr;
}

const res = sort(merge(nums1, nums2));
console.log(res);
