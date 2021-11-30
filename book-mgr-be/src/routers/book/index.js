// 获取book请求体ctx
const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');

// 区别出入库操作
const BOOK_CONST = {
    IN: 'IN_COUNT',
    OUT: 'OUT_COUNT',
};

const Book = mongoose.model('Book'); // 书籍管理
const InventoryLog = mongoose.model('InventoryLog'); // 出入库日志

// 寻找书籍方法
const fineBookOne = async (id) => {
    const one = await Book.findOne({
        _id: id,
    }).exec();

    return one;
};

const router = new Router({
    prefix: '/book',
});

// 获取添加书籍http请求的ctx中书籍数据
router.post('/add',async (ctx) => {
    const {
        name,
        price,
        author,
        publishDate,
        classify,
        count,
    } = getBody(ctx);

    // 本地获取book数据
    const book = new Book({
        name,
        price,
        author,
        publishDate,
        classify,
        count,
    });
    // 同步mogondb
    const res = await book.save();
    // 响应
    ctx.body = {
        data: res,
        code: 1,
        msg: '添加成功',
    };
});

// http获取书籍信息列表请求的ctx
router.get('/list', async (ctx) => {
    // https://aa.cc.com/user?page=1&size=10&keyword=书名#fdsafds
    const {
        page = 1, // 第几页
        keyword = '', // 书名
    } = ctx.query;

    // 几条
    let = {
        size = 10,
    } = ctx.query;

    // 字符串string 转 Num （URL在传递时是字符串类型，所以要转）
    size = Number(size);

    // 寻书
    const query = {};
    // 如果有keyword，赋值query
    if (keyword) {
        query.name = keyword;
    }

    // 分页功能
    const list = await Book
        // 找数据
        .find(query) // 书名
        .skip((page - 1) * size) // skip：跳过前面的条数
        .limit(size) // 当前查询条数
        .exec();
    
    // 获取Book书籍总数（前端分页用）
    const total = await Book.countDocuments();
    
    // 响应
    ctx.body = {
        data: {
            total, // 书籍总数
            list, // 列表信息
            page, // 页码
            size, // 一页的条数
        },
        code: 1,
        msg: '获取列表成功',
    };
});

// 删除书籍
router.delete('/:id',async (ctx) => {
    // 获取书籍id
    const {
        id,
    } = ctx.params; // 参数
    
    // 删除响应 && 删除
    const delMsg = await Book.deleteOne({
        _id: id,
    });
    
    // 删除响应
    ctx.body = {
        data: delMsg,
        msg: '删除成功',
        code: 1,
    };
});

// 出入库
router.post('/update/count',async (ctx) => {
    const {
        id, // 书籍id
        type, // 区分出入库
    } = ctx.request.body;

    // 让num可修改
    let {
        num,
    } = ctx.request.body;

    // num改成数字
    num = Number(num);

    // 找书
    const book = await fineBookOne(id);

    // 响应：没有找到书籍
    if (!book) {
        ctx.body = {
            code: 0,
            msg: '没有找到书籍',
        };
        return;
    }

    // 找到书
    if (type === BOOK_CONST.IN) {
        // 入库操作
        num = Math.abs(num);
    } else {
        // 出库操作
        num = -Math.abs(num);
    }

    // 出入库数值增减
    book.count = book.count + num;

    // 出库书超量
    if  (book.count < 0) {
        // 响应
        ctx.body = {
            code: 0,
            msg: '剩下的量不足以出库',
        }
        return;
    }
    
    // 同步数据库
    const res = await book.save();
    
    // 出入库日志信息
    const log = new InventoryLog({
        id,
        num: Math.abs(num), // 正数
        type,
    });

    // 日志同步数据库
    log.save();

    // 响应操作成功
    ctx.body = {
        data: res,
        code: 1,
        msg: '操作成功',
    };

});

// 修改书籍信息
router.post('/update', async (ctx) => {
    const {
        id,
        ...others //各要修改属性
    } = ctx.request.body;

    // 找书
    const one = await fineBookOne(id);
    
    // 未有找到书
    if (!one) {
        ctx.body = {
            msg: '没有找到书籍',
            code: 0,
        }
        return;
    }

    // 创建修改书籍表单
    const newQuery = {};

    // others：书籍信息
    Object.entries(others).forEach(([key, value]) => {
        
        // 如果value有值，赋值
        if (value) {
            newQuery[key] = value;
        }
    });

    // 对象合并新数据到旧数据中
    Object.assign(one, newQuery);

    const res = await one.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '保存成功',
    };
});

// 书籍详细信息
router.get('/detail/:id', async (ctx) => {
    const {
        id,
    } = ctx.params;

    const one = await fineBookOne(id);

     // 未有找到书
     if (!one) {
        ctx.body = {
            msg: '没有找到书籍',
            code: 0,
        };
        return;
    }

    ctx.body = {
        msg: '查询成功',
        data: one,
        code: 1,
    };
});

module.exports = router;