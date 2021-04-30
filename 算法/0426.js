// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan('Hank')
// 输出:
// Hi! This is Hank!

// LazyMan('Hank').sleep(10).eat('dinner')
// 输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~


// LazyMan('Hank').sleep(10).eat('dinner').eat('supper')
// 输出
// Wake up after 10
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan('Hank').sleepFirst(5).eat('supper')
// 输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper~

// 以此类推。
class Person {
  constructor(name) {
    this.task = [];
    console.log(`Hi! This is ${name}!`);
    this.timer = null;
    this.exec();
  }
  sleep(sec) {
    this.task.push(() => {
      console.log(`//等待${sec}s`);
      return new Promise((r, j) => {
        setTimeout(() => {
          r();
          console.log(`Wake up after ${sec}s!`);
        }, sec * 1000);
      })
    })
    this.exec();
    return this;
  }
  sleepFirst(sec) {
    this.sleep(sec);
    return this;
  }
  eat(thing) {
    this.task.push(()=>{
      console.log(`Eat ${thing}~`);
    })
    this.exec();
    return this;
  }
  exec(){
    const doTask =  () => {
      const t = this.task.shift();
      if(t){
        const res = t();
        if(res !== undefined){
          res.then(doTask)
        } else{
          doTask()
        }
      }
    }
    if(this.timer){
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      doTask()
    }, 10);
  }
}

function LazyMan(name) {
  return new Person(name)
}
let res = LazyMan('Hank').sleepFirst(1).eat('super').sleep(2).eat('dinner');