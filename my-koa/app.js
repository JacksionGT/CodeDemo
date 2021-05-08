const KOA = require('./lib/application');

const port = 3000;

const app = new KOA();
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

app.listen(port, () => {
    console.log(`Server listen on ${port}`);
})