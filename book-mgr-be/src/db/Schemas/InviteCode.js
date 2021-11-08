//     Schemas(映射了MongoDB下的一个集合InviteCodeSchema，并且他的内容就是集合下文档的构成InviteCode)  
//     Modal(可以理解成是根据Schema生成的一套方法，这套方法用来操作MongoDB下的集合和集合下的文档)
const mongoose = require('mongoose');// 连接db
const { getMeta } = require('../helpers');// Schemas创建修改时间
// 邀请码Schema
const InviteCodeSchema = new mongoose.Schema({
   // 邀请码
   code: String,
   // 用来注册哪个账户
   user: String,
   //创建修改时间
   meta: getMeta(),
});
//注册Schema模型
mongoose.model('InviteCode', InviteCodeSchema);