const Router = require('@koa/router'); // 路由   
const mongoose = require('mongoose'); // 连接db
const User = mongoose.model('User'); // model
const config = require('../../project.config');

const router = new Router({
    prefix: '/user',
  });

// 获取请求的ctx
router.get('/list', async (ctx) => {
    let {
      page = 1,
      size = 10,
      keyword,
    } = ctx.query;

    // 字符数字化
    page = Number(page);
    size = Number(size);

    // 创建空对象
    const query = {};

    // 若用户存在，则放入空对象
    if (keyword) {
      query.account = keyword;
    };

    // 列表格式化
     const list = await User
        .find(query) // 查
        .sort({
          _id: -1,
        })
        .skip((page - 1) * size) // 分页
        .limit(size)
        .exec(); 

    const total = await User.countDocuments().exec();

    // 返回体
    ctx.body = {
        msg: '获取列表成功',
        data: {
            list,
            page,
            size,
            total,
        },
        code: 1,
    };
});

// 删除用户
router.delete('/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;
  
  // 搜用户
  const delMsg = await User.deleteOne({
    _id: id,
  });

  ctx.body = { 
    data: delMsg,
    code: 1,
    msg: '删除成功',
  };
});

  // 添加用户
router.post('/add', async (ctx) => {
  const {
    account,
    password,
  } = ctx.request.body;

  // db添加用户
  const user = new User({
    account,
    password: password || '123123',
  });

  // db保存
  const res = await user.save()

  // 响应
  ctx.body = { 
    data: res,
    code: 1,
    msg: '添加成功',
  };
});

// 重置密码
router.post('/reset/password', async (ctx) => {
  const {
    id,
  } = ctx.request.body;
  
  // 找用户
  const user = await User.findOne({
    _id: id,
  }).exec();
  
  //找不到 
  if (!user) {
    ctx.body = {
      msg: '找不到用户',
      code: 0,
    };
    
    return;
  }

  // 重置密码
  user.password = config.DEFAULT_PASSWORD;

  // 保存
  const res = await user.save();

  // 响应
  ctx.body = {
    msg: '修改成功',
    data: {
      account: res.account,
      _id: res._id,
    },
    code: 1, 
  };

});

//导出exports
module.exports = router;