const auth = require('./auth/index');

//导出auth，注册路由
module.exports = (app) => {
    app.use(auth.routes());
};