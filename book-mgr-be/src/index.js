const Koa = require('koa');

const app = new Koa();

//开启 http，接收3000端口http请求并响应
app.listen(3000, () => {
    console.log('启动成功');
});

console.log('1233');