const mongoose = require('mongoose');// 连接db
const { getMeta } = require('../helpers');// Schemas创建修改时间
// 邀请码Schema
const InviteCodeSchema = new mongoose.Schema({
   // 邀请码
   code: String,
   // 对应用户
   user: String,
   // 创建修改时间
   meta: getMeta(),
});

// 注册Schema模型
mongoose.model('InviteCode', InviteCodeSchema);