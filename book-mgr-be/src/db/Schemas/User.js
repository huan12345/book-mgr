// 连接数据库步骤：1. 给哪个数据库的；2. 哪个集合（Schema）；3. 添加什么格式的文档（Schema的内容）；
// Schema 映射了MongoDB下的一个集合，并且他的内容就是集合下文档的构成；
// Model 根据schema生成的一套方法，这套方法用来操作MongoDB集合和集合下的文档；

const mongoose = require('mongoose');// mongoose用于连接mongodb

const { getMeta, preSave } = require('../helpers');// getMeta创建更新时间

// 创建UserSchema
const UserSchema = new mongoose.Schema({

   account: String, // 账户
   password: String,// 密码
   
   meta: getMeta(),// 创建更新时间
});

UserSchema.pre('save', preSave);

// 注册UserSchema的Model
mongoose.model('User', UserSchema);