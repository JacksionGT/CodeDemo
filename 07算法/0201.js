var nums = [0,1,2,2,3,0,4,2];

const removeElement = (nums, val) => {
  let matchElementCount = 0;
  for (let index = 0; index < nums.length; index++) {
    const element = nums[index];
    if(element === val){
      matchElementCount++;
    }
    if(index > 0 && element !== val){
      nums[index - matchElementCount] = nums[index];
    }
  }
  return nums.length = nums.length - matchElementCount;
}

let len = removeElement(nums, 2);
console.log(len);
console.log(nums);