function LazyMan(name) {
  console.log(`Hi! This is ${name}!`);
  const task = [];
  const doTask = () => {
    if (task.length > 0) {
      const res = task.shift()();
      if (res !== undefined) {
        res.then(doTask)
      } else {
        doTask()
      }
    }
  }
  const _LazyMan = {
    sleep(sec) {
      task.push(() => {
        console.log(`//等待${sec}s`);
        return new Promise((r, j) => {
          setTimeout(() => {
            console.log(`Wake up after ${sec}s!`);
            r();
          }, sec * 1000);
        })
      })
      return _LazyMan;
    },
    sleepFirst(sec) {
      return this.sleep(sec);
    },
    eat(thing) {
      task.push(() => {
        console.log(`Eat ${thing}~`);
      })
      return _LazyMan;
    }
  }
  setTimeout(doTask,0);
  return _LazyMan;
}

LazyMan('Jerry').sleepFirst(1).eat('super').sleep(2).eat('dinner');