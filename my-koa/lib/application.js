const EventEmitter = require('events');
const http = require('http');

class Application extends EventEmitter {
    constructor() {
        super();
        this.middlewares = [];
    }
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
    use(middleware) {
        this.middlewares.push(middleware);
    }
    listen(...args) {
        const server = http.createServer(this.callback());
        server.listen(...args)
    }
    callback() {
        return (req, res) => {
            let fn = this.compose();
            res.end('test ok');
        }
    }
}

module.exports = Application;
