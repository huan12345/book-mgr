const Router = require('@koa/router'); // 路由   
const mongoose = require('mongoose'); // 连接db
const { v4: uuidv4 } = require('uuid'); // 生成邀请码
//const { getBody } = require('../../helpers/utils');

const InviteCode = mongoose.model('InviteCode'); // 注册InviteCode.model
// 生成邀请码头
const router = new Router({
    prefix: '/invite',
});

// 路由/invite/add生成随机数
router.get('/add', async (ctx) => {
    const code = new InviteCode({
        code: uuidv4(), // 生成随机数
        user:'',
    });
    // 创建信息
    const saved = await code.save();

    ctx.body = {
        code: 1,
        data: saved, // 创建内容
        msg: '创建成功',
    };
});

//导出exports
module.exports = router;