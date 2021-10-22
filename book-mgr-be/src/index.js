//每个文件都是一个单独模块，需要module.exports导出才能相互使用
const Koa = require('koa');
const koaBody = require('koa-body');
const Body = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const cors = require('@koa/cors');

const app = new Koa();

//监听端口3000是在数据库连接成功后，防止未连接数据库时请求进入挂掉
connect().then(() => {
    //注册中间件，允许跨域
    app.use(cors());
    //处理请求体
    app.use(koaBody());
    //注册路由
    registerRoutes(app);
    //开启 http，接收3000端口http请求并响应
    app.listen(3000, () => {
        console.log('启动成功');
    });
});



