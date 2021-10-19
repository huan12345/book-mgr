const mongoose = require('mongoose');

// 1.给哪个数据库的
// 那个集合
// 添加什么格式的文档

// Schema 集合模板
// Modal 模板利用（'名字'，模板）


const UserSchema = new mongoose.Schema({
    nickname:String,
    password:String,
    age:Number,
});

const UserModal = mongoose.model('User',UserSchema);

const connect = () => {
    // 去连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017');

    // 当数据库被打开的时候 做一些事情
    mongoose.connection.on('open', () => {
        console.log('连接成功');

        // 添加用户
        const user = new UserModal({
            nickname:'小红',
            password:'123456',
            age:12,
        });

        user.age = 99;

        // 保存，同步到 MongoDB
        user.save();
    });
};




connect();