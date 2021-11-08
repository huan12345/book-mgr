// 每个文件都是一个模块
// common.js模块规范：
//      module.exports 导出方法
//      require 导入模块
//      总结：require一个文件，该文件就会被执行一次，而该文件内的方法函数要被其他文件调用，需module.exports导出方法
const Koa = require('koa');//导入koa模块，koa实际是一个类，一个开发网站服务端的框架
const koaBody = require('koa-body');//引进koa-body中间件，能处理请求体上的内容，方便取数据
const { connect } = require('./db');//导入数据库db数据，连接mongodb数据库
const registerRoutes = require('./routers');//引进routers，路由
const cors = require('@koa/cors');//解决跨域问题，8080可以到3000

const app = new Koa();//实例化一个koa，叫app

//监听端口3000是在数据库连接成功后，防止未连接数据库时请求进入挂掉，
connect().then(() => {
//app(koa)提供的一些中间件，通过 app.use()注册中间件，中间件本质上就是一个函数，每次有请求进入就执行一次各下面app.use()函数
    app.use(cors());//允许跨域
    
    app.use(koaBody());//处理请求体
    
    registerRoutes(app);//注册路由
    
    //listen3000端口，开启http服务，接收3000端口http请求并响应
    app.listen(3000, () => {
        console.log('监听3000端口启动成功');
    });
});



