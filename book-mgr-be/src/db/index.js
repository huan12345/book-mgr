// 执行以下Schemas文件
require('./Schemas/User');
require('./Schemas/InviteCode');
require('./Schemas/Book');
require('./Schemas/InventoryLog');

// mongoose用于连接mongodb
const mongoose = require('mongoose');

// 连接数据库
const connect = () => {

    // Promise先连接数据库再监听端口
    return new Promise((resolve) => {
        
        // 所连接的数据库
        mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');
        
        // 连接成功后数据库打开时的函数
        mongoose.connection.on('open', () => {
            console.log('连接数据库成功');
            resolve();
        });
    });
};

// 暴露连接数据库方法
module.exports = {
    connect,
};