const Router = require('@koa/router');// 1.引进 router
const mongoose = require('mongoose');// 引进mongoose，连接数据库db
const { getBody } = require('../../helpers/utils');// ctx.request.body 请求体
const jwt = require('jsonwebtoken');// jwt用于http加密，json秘钥放在用户本地，每次请求带上加密后的信息，服务端拿到后再解密

// 获取model
const User = mongoose.model('User');// User model
const InviteCode = mongoose.model('InviteCode');// 邀请码model

// 实例化一个Router, 
const router = new Router({
    prefix: '/auth',// 前缀
});

// /auth/register路径实现
router.post('/register', async (ctx) => {
    // 取出请求中的account,password,inviteCode,
    const {
        account,
        password,
        inviteCode,
    }  = getBody(ctx);

// 做表单校验，禁止输入为空，防黑客，后端拦截
    if (account === '' || password === ''|| inviteCode === '') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        }; 
        return;
    }

    // db找有没有邀请码
    const findCode = await InviteCode.findOne({
        code: inviteCode,
    }).exec();

    // 没找到邀请码或被用过
    if ((!findCode) || findCode.user) {
        ctx.body = {
            code: 0,
            msg: '邀请码不正确',
            data: null,
        };

        return;
    }

    // findUser：去数据库找是否有一个 account 和传上来的“account”重名的用户
    const findUser = await User.findOne({
        account,
    }).exec();//执行

    // 如果该用户已存在，返回'已存在该用户'，并退出
    if (findUser) {
        ctx.body = {
            code: 0,
            msg: '已存在该用户',
            data: null,
        }; 
        return;
    }

    // 创建一个新user，保存其account,password,
    const user = new User({
        account,
        password,
    });

    // 保存user信息到 mongodb
    const res = await user.save();

    findCode.user = res._id; // 让邀请码.用户 = 用户id
    findCode.meta.updateAt = new Date().getTime(); // 更新时间戳

    await findCode.save(); // 保存

    // 返回响应成功
    ctx.body = {
        code: 1,
        msg: '注册成功',
        data: res,
    }; 
});

// /auth//login路径实现
router.post('/login', async (ctx) => {
    // 取出请求中的account,password,inviteCode,
    const {
        account,
        password,
    } = getBody(ctx);
    
    // 禁止输入为空，防黑客
    if (account === '' || password === '') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        }; 

        return;
    }

    // 请在数据库找account，await等执行完
    const one = await User.findOne({
        account,
    }).exec();

    // 该账户找不到
    if (!one) {
        // 请求失败返回
        ctx.body = {
            code: 0,
            msg: '用户名或密码错误',
            data: null,
        };
        return;
    }

    // 返回前端用户信息，排除密码
    const user = {
        account: one.account, // 因为客户端传过来的数据因为jwt被处理了，所以需要的账户密码等需要去数据库里面的取
        _id: one._id,
    };

    // 密码一致
    if (one.password === password) {
        // // 登录成功返回
        ctx.body = {
            code: 1,
            msg: '登录成功',
            data: {
                user,// 返回用户信息
                token: jwt.sign(user,'book-mgr'),// 用户信息，秘钥
            },
        };
        return;
    }

//其他，密码错误,// 返回
    ctx.body = {
        code: 0,
        msg: '用户名或密码错误',
        data: null,
    };

});

// 1.暴露authRouter
module.exports = router;