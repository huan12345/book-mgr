const mongoose = require('mongoose');
const { getMate } = require('./helpers');
// Schema 集合模板
// Modal 模板利用（'名字'，模板）
const UserSchema = new mongoose.Schema({
   account: String,
   password: String,
   //创建修改时间
   meta: getMate(),
});
//注册Schema
mongoose.model('User', UserSchema);