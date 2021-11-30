
const auth = require('./auth'); // 1.注册
const inviteCode = require('./invite-code') // 邀请码
const book = require('./book');// 书籍管理
const inventoryLog = require('./inventory-log'); // 书入库
const user = require('./user');

// 1.接收app（koa实例）
module.exports = (app) => {
    // 注册路由
    app.use(auth.routes());  // 注册路由
    app.use(inviteCode.routes()); // 邀请码路由
    app.use(book.routes()); // 图书管理路由
    app.use(inventoryLog.routes()); //
    app.use(user.routes()); //

};