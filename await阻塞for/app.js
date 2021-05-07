const Koa = require('koa');
const Router = require('@koa/router');
const fs = require('fs');

const router = new Router();
const app = new Koa();

router.get('/', (ctx) => {
    ctx.body = fs.readFileSync('index.html');
    ctx.response.type = 'html';
});
router.get('/get', async (ctx) => {
    ctx.body = await new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('res ok')
        }, 3000);
    })
});
app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => {
    console.log(`kao2 应用启动在 http://localhost:8080`);
});