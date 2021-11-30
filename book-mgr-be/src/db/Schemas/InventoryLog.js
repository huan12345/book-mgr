// 出入库日志
const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');// 导入Schemas创建修改时间

// 出入库日志Schema
const InventoryLogSchema = new mongoose.Schema({
    id: String,
    type: String, // 出库或者入库
    num: Number, // 数量
    user: String, // 出入库用户
   meta: getMeta(), // 出入库时间
});
InventoryLogSchema.pre ('save', preSave);
//model注册User Schema
mongoose.model('InventoryLog', InventoryLogSchema);