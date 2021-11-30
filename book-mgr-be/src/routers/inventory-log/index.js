// 出入库日志
const Router = require('@koa/router'); // 路由   
const mongoose = require('mongoose'); // 连接db

const InventoryLog = mongoose.model('InventoryLog'); // model

// 路径头
const router = new Router({
    prefix: '/inventory-log',
});

// 路径
router.get('/list', async (ctx) => {
    // 常量
    const {
        id,
        type, // 出库或入库
    } = ctx.query;

    // 变量
    let {
        size,
        page,
    } = ctx.query;

    // 数字化
    size = Number(size);
    page = Number(page);

    // 出入库日志信息分页
    const list = await InventoryLog
        .find({
            id,
            type,
        })
        // 按时间排序
        .sort({
            _id: -1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    // 出入库日志记录条数
    const total = await InventoryLog.find({
        type,
    }).countDocuments().exec();

    // 响应
    ctx.body = {
        data: {
            total,
            list,
            page,
            size,
        },
        code: 1,
        msg: '获取列表成功',
    };
});

module.exports = router;