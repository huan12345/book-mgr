const Router = require('@koa/router');// 路由   
const mongoose = require('mongoose');// 连接db
const { v4: uuidv4 } = require('uuid');// 生成邀请码
//const { getBody } = require('../../helpers/utils');

const InviteCode = mongoose.model('InviteCode');// // 注册Schemas/InviteCode

const router = new Router({
    prefix: '/invite',
});
// 路由/invite/add生成随机数
router.get('/add', async (ctx) => {
    const code = new InviteCode({
        code: uuidv4(),// 生成随机数
        user:'',
    });
    // 获取创建信息
    const saved = await code.save();

    ctx.body = {
        code: 1,
        data: saved,
        msg: '创建成功',
    };
});

//导出exports
module.exports = router;