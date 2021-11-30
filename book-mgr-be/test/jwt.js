var jwt = require('jsonwebtoken');// jwt用于http认证，json秘钥放在用户本地，每次请求带上加密后的信息，服务端拿到后再解密
var token = jwt.sign({ 
    account: 'a.cc.com',
    _id: '123',
}, 'aaaa');// 秘钥

console.log(token);// token：令牌：服务端发给客户端，客户端每次发送信息带上token，服务端便可确认其身份
// 解密，（成功，失败）
jwt.verify(token,'aaaa',(err,payload) => {
    console.log(err, payload);
})
// token组成：
//      header
//          加密算法
//      jwt
//          信息
//      payload
//          秘钥    