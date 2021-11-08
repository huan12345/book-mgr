const Router = require('@koa/router');//引进@koa/router
const mongoose = require('mongoose');//引进mongoose，连接数据库db
const { getBody } = require('../../helpers/utils');//ctx.request.body
const jwt = require('jsonwebtoken');//jwt用于http认证，json秘钥放在用户本地，每次请求带上加密后的信息，服务端拿到后再解密

//取出Schemas
const User = mongoose.model('User');//User Schemas
const InviteCode = mongoose.model('InviteCode');// 邀请码Schemas

const router = new Router({
    prefix: '/auth',//表示当前router实例都是在处理auth请求
});
//router实例各接口逻辑，取ctx中account,password,inviteCode,
router.post('/register', async (ctx) => {
    const {
        account,
        password,
        inviteCode,
    }  = getBody(ctx);

//做表单校验，禁止输入为空，防黑客，后端拦截
    if (account === '' || password === ''|| inviteCode === '') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        }; 

        return;
    }

    //找有没有邀请码
    const findCode = await InviteCode.findOne({
        code: inviteCode,
    }).exec();

    //没找到邀请码或被用过
    if ((!findCode) || findCode.user) {
        ctx.body = {
            code: 0,
            msg: '邀请码不正确',
            data: null,
        };

        return;
    }

    // 去数据库找是否有一个 account 和传上来的“account”重名的用户
    const findUser = await User.findOne({
        account,
    }).exec();//执行

    //如果该用户已存在，返回'已存在该用户'，并退出
    if (findUser) {
        ctx.body = {
            code: 0,
            msg: '已存在该用户',
            data: null,
        }; 
        return;
    }

    // 创建一个用户
    const user = new User({
        account,
        password,
    });

    // 把创建的用户同步到 mongodb
    const res = await user.save();

    findCode.user = res._id;//用户唯一标志
    findCode.meta.updateAt = new Date().getTime();

    await findCode.save();

    //响应成功
    ctx.body = {
        code: 1,
        msg: '注册成功',
        data: res,
    }; 
});
//返回请求文件
router.post('/login', async (ctx) => {
    const {
        account,
        password,
    } = getBody(ctx);
    //禁止输入为空，防黑客
    if (account === '' || password === '') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        }; 

        return;
    }
//请求account与数据库account进行对比，await等后面执行完
    const one = await User.findOne({
        account,
    }).exec();
//该账户找不到
    if (!one) {
        ctx.body = {
            code: 0,//请求失败
            msg: '用户名或密码错误',
            data: null,
        };

        return;
    }
//返回前端用户信息，排除密码
    const user = {
        account: one.account,
        _id: one._id,
    };
//密码一致
    if (one.password === password) {
        ctx.body = {
            code: 1,
            msg: '登录成功',
            data: {
                user,//返回用户信息
                token: jwt.sign(user,'book-mgr'),//秘钥
            },
        };
        return;
    }
//其他，密码错误
    ctx.body = {
        code: 0,
        msg: '用户名或密码错误',
        data: null,
    };

});
//暴露router
module.exports = router;