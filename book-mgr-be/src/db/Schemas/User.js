//     Schemas(映射了MongoDB下的一个集合UserSchema，并且他的内容就是集合下文档的构成User)  
//     Modal(可以理解成是根据Schema生成的一套方法，这套方法用来操作MongoDB下的集合和集合下的文档)
const mongoose = require('mongoose');//连接数据库
const { getMeta } = require('../helpers');// 导入Schemas创建修改时间
// Schema 集合模板
// Modal 模板利用（'名字'，模板）
//创建User Schema
const UserSchema = new mongoose.Schema({
   account: String,//账户  
   password: String,//密码
   //创建修改时间
   meta: getMeta(),
});
//model注册User Schema
mongoose.model('User', UserSchema);