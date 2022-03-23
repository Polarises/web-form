/*
能操作datas集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose');

// 2.字义Schema(描述文档结构)
const jsonSchema = new mongoose.Schema({
    createdAt: {type: String, required: false},
    formId: {type: String, required: true, default: '0'},
    json: {type: Object, required: true},
});

// 3. 定义Model(与集合对应, 可以操作集合)
const JsonModel = mongoose.model('jsons', jsonSchema);

// 4. 向外暴露Model
module.exports = JsonModel;
