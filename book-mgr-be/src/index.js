const Koa = require('koa'); // 引入koa：开发服务端
const koaBody = require('koa-body');// 处理请求体
const { connect } = require('./db');// 暴露连接数据库方法
const registerRoutes = require('./routers');// 1.routers.index
const cors = require('@koa/cors'); // 允许跨域

//实例化一个koa（抽象-->具体）
const app = new Koa();

// then先连接数据库再监听端口
connect().then(() => {

    // 通过app.use注册中间件，本质上是使用koa的各种函数，每次http请求进来都执行一次

    app.use(cors()); // 允许跨域
    
    app.use(koaBody());// 处理请求体
    
    registerRoutes(app);// 1.总路由routers.index
    
    // listen方法，开启http服务，监听3000端口发来的http请求并做处理
    app.listen(3000, () => {
        console.log('监听3000端口启动成功');
    });
});



