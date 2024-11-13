# 理解KOA原码
最有效率的学习是教会别人。为了理解KOA的逻辑，可以带着问题，实现一个自己的koa，并对比源码，从而学习到更新的技巧。

## KOA API分析
* KOA是一个类，通过new调用，返回一个实例
* KOA暴漏了use、listen接口
基于以上分析，初步建立KOA入口代码如下
``` js
const EventEmitter = require('events');
const http = require('http');

class Application extends EventEmitter {
    constructor() {
        super();
        this.middlewares = [];
    }
    use(middleware) {
        this.middlewares.push(middleware);
    }
    listen(...args) {
        const server = http.createServer();
        server.listen(...args)
    }
}

module.exports = Application;
```

有了以上代码尝试在业务代码app.js中调用一下，发现浏览器发出的请求一直在pending状态。当然因为app.js未对请求做任何处理
``` js
const KOA = require('./lib/application');

const app = new KOA();

const port = 3000;

app.listen(port,()=>{
    console.log(`Server listen on ${port}`);
})
```


### KOA 的洋葱模型
下面的代码像官方KOA框架一样使用use API
``` js
app.use(async (ctx, next) => {
    console.log('入口1');
    await next();
    console.log('出口1');
})

app.use(async (ctx, next) => {
    console.log('入口2');
    await next();
    console.log('出口2');
})
```

为了让这些中间件能够按照正确的顺序执行，我期望代码被转换成下面这样
``` js
async (ctx, next) => {
    console.log('入口1');
    await (async (ctx, next) => {
        console.log('入口2');
        await next();
        console.log('出口2');
    })
    console.log('出口1');
}
```
于是，编写Application类compose函数像下面这样
``` js
class Application extends EventEmitter {
    // ... 其他代码
    compose() {
        return async ctx => {

            function createNext(middleware, oldNext) {
                return async () => {
                    await middleware(ctx, oldNext)
                }
            }
            let next = () => Promise.resolve();
            let len = this.middlewares.length;
            for (let index = 0; index < len; index++) {
                const currentMiddleware = this.middlewares[index];
                next = createNext(currentMiddleware, next);
            }
            await next();
        }
    }
    callback() {
        return (req, res) => {
            let fn = this.compose();
            res.end('test ok');
        }
    }
    listen(...args) {
        const server = http.createServer(this.callback());
        server.listen(...args)
    }
}
```