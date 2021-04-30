var a = [[1,4],[3,8], [10,15], [11,18], [20,27], [14,15],[19,28]];
// [1,4], [3,8], [10,15], [11,18], [14,15], [19,28], [20,27]
// [[1, 8], [10,18],[19,28]]

function merge(arr){
  let src = arr.sort((a, b) => a[0] - b[0]);
  const dest = [];
  let temp, ps, pe, s, e;
  if(arr instanceof Array){
    while(src[0]){
      temp = src.shift();
      [ps, pe] = temp;
      if(src[0]){
        [s, e] = src[0];
        if((pe >= s && pe <= e) || e <= pe){
          src[0] = [ps, pe];
        } else {
          dest.push(temp)
        }
      } else {
        dest.push(temp)
      }
    }
    return dest;
  }
  return [];
}

console.log(merge(a));