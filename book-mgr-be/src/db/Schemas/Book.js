const mongoose = require('mongoose');
const { getMeta } = require('../helpers');

const BookSchema = new mongoose.Schema({
    // 书名
    name: String,
    // 价格
    price: Number,
    // 作者
    author: String,
    // 出版日期
    publishDate: String,
    // 分类
    classify: String,
    // 库存
    count: Number,
    
   meta: getMeta(),
});
//model注册User Schema
mongoose.model('Book', BookSchema);