// 1.给哪个数据库： mongodb://127.0.0.1:27017/book-mgr
// 2.哪个集合： 
//     Schemas(映射了MongoDB下的一个集合，并且他的内容就是集合下文的构成)  
//     Modal(可以理解成是根据Schema生成的一套方法，这套方法用来操作MongoDB下的集合和集合下的文档)
// 3.添加什么格式的文档

//Schemas集合
require('./Schemas/User');// db注册Schemas/User
require('./Schemas/InviteCode');// db注册Schemas/InviteCode
require('./Schemas/Book');
//引进mongoose，因为node.js连接数据库需要mongoose
const mongoose = require('mongoose');
//连接mongodb数据库
const connect = () => {
    //Promise：时序，先连接后监听端口
    return new Promise((resolve) => {
        // 连接数据库，地址mongodb://127.0.0.1:27017/book-mgr
        mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');
        // 当数据库被打开的时候 做一些事情
        mongoose.connection.on('open', () => {
            console.log('连接数据库成功');
            resolve();
        });
    });
} ;

module.exports = {
    connect,
};