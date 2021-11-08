// 获取book请求体ctx
const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
// 出入库书本数
const BOOK_CONST = {
    IN: 'IN_COUNT',
    OUT: 'OUT_COUNT',
};

const Book = mongoose.model('Book');

const router = new Router({
    prefix: '/book',
});
// 通过http获得添加书籍的ctx
router.post('/add',async (ctx) => {
    const {
        name,
        price,
        author,
        publishDate,
        classify,
        count,
    } = getBody(ctx);
    // 本地带取book数据
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

    ctx.body = {
        data: res,
        code: 1,
        msg: '添加成功',
    };
});
// 获取列表信息
router.get('/list', async (ctx) => {
    // https://aa.cc.com/user?page=1&size=10&keyword=书名#fdsafds
    const {
        page = 1,// 几页
        keyword = '',// 书名
    } = ctx.query;
    // 几条
    let = {
        size = 10,
    } = ctx.query;
    // string 转 Num
    size = Number(size);

    const query = {};
    // 如果query有keyword，赋值name
    if (keyword) {
        query.name = keyword;
    }

    // 分页功能
    const list = await Book
        // 找数据
        .find(query)
        .skip((page - 1) * size)// skip忽然：跳过前面的条数
        .limit(size)// 当前查询条数
        .exec();
    
    // 获取Book的文档数
    const total = await Book.countDocuments();
    
    ctx.body = {
        data: {
            total,// 总条数
            list,// 列表信息
            page,// 页码
            size,// 条数
        },
        code: 1,
        msg: '获取列表成功',
    };
});
// 删除接口
router.delete('/:id',async (ctx) => {
    const {
        id,
    } = ctx.params;

    const delMsg = await Book.deleteOne({
        _id: id,
    });

    ctx.body = {
        data: delMsg,
        msg: '删除成功',
        code: 1,
    };
});
// 库存接口
router.post('/update/count',async (ctx) => {
    const {
        id,// 书籍id
        type,// 区分出入库
    } = ctx.request.body;
    // 让num可修改
    let {
        num,
    } = ctx.request.body;
    // num改成数字
    num = Number(num);
    // 找书
    const book = await Book.findOne({
        _id: id,
    }).exec();

    // 没有找到书籍
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
        ctx.body = {
            code: 0,
            msg: '剩下的量不足以出库',
        }
        return;
    }
    // 同步数据库
    const res = await book.save();
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
        ...others
    } = ctx.request.body;

    const one = await Book.findOne({
        _id: id,
    }).exec();
    // 未有找到书
    if (!one) {
        ctx.body = {
            msg: '没有找到书籍',
            code: 0,
        }
        return;
    }

    const newQuery = {};
    // 在others中取相同的对象进行赋值
    Object.entries(others).forEach(([key, value]) => {
        if (value) {
            newQuery[key] = value;
        }
    });
    // 对象合并到one
    Object.assign(one, newQuery);

    const res = await one.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '保存成功',
    };
});

module.exports = router;