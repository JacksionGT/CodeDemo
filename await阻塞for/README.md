# 关于 await是否会阻塞循环

这里分别测试node环境和浏览器环境
* node版本 v12.14.0
* chrome版本 90.0.4430.93（正式版本） (x86_64)

## Node 环境代码
index.js  代码如下，在命令行中执行`node index.js`即可验证结果。
``` js
(async () => {
    const ids = [1, 2, 3];

    const request = (item) => {
        console.log(`start - ${item}`);

        return new Promise((res, rej) => {
            setTimeout(() => {
                res(item);
            }, 2000);
        });

    }

    for (let item of ids) {
        await request(item);
        console.log(`end - ${item}`);
    };
})()

// 打印信息如下
start - 1
end - 1
start - 2
end - 2
start - 3
end - 3
```

## 浏览器环境
由于需要发送请求，使用koa提供/get接口api，并新建html做为入口测试。
* index.html 入口文件，测试代码在script标签中
* app.js koa服务入口：提供html文件访问/接口get访问服务
测试步骤:
* 进入文件夹
* npm i
* 打开浏览器控制台，访问`http://localhost:8080`