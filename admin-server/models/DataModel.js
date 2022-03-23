/*
能操作datas集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose');

// 2.字义Schema(描述文档结构)
const dataSchema = new mongoose.Schema({
    createdAt: {type: String, required: false},
    formId: {type: String, required: true, default: '0'},
    info: {type: Object, required: true},
    tabs: {type: Array, required: false},
});

// 3. 定义Model(与集合对应, 可以操作集合)
const DataModel = mongoose.model('datas', dataSchema);

// 4. 向外暴露Model
module.exports = DataModel;
