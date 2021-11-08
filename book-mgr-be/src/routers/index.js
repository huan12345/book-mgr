// 注册路由以提供使用
const auth = require('./auth');//引进auth，认证
const inviteCode = require('./invite-code')//引进invite-code，邀请码
const book = require('./book');// 书籍管理

//用koa的中间件routes函数注册路由
module.exports = (app) => {
    app.use(auth.routes());
    app.use(inviteCode.routes());
    app.use(book.routes());
};