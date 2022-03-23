/*
能操作forms集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose');

// 2.字义Schema(描述文档结构)
const formSchema = new mongoose.Schema({
    name: {type: String, required: true},
    createdAt: {type: String, required: false},
    schemas: {
        type: Object, required: true
    },
    /*schemas: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
    }],*/
});

// 3. 定义Model(与集合对应, 可以操作集合)
const FormModel = mongoose.model('forms', formSchema);

// 初始化默认超级管理员用户: admin/admin
FormModel.findOne({name: '第一个表单'}).then(form => {
    if(!form) {
        // FormModel.create({name: '第一个表单', schemas: {name: 'zs', class: '计算机'}})
        FormModel.create({name: '第一个表单',
            schemas: {
                "type": "object",
                "properties": {
                    "inputName": {
                        "title": "姓名",
                        "placeholder": "请输入姓名",
                        "type": "string",
                        "props": {}
                    },
                    "input_Ls9zcZ": {
                        "title": "学号",
                        "type": "string",
                        "props": {}
                    },
                    "input_GCe5iT": {
                        "title": "班级",
                        "type": "string",
                        "props": {}
                    },
                    "input_epklle": {
                        "title": "专业",
                        "type": "string",
                        "props": {}
                    },
                    "input_crazVB": {
                        "title": "宿舍",
                        "type": "string",
                        "props": {}
                    }
                },
                "labelWidth": 120,
                "displayType": "row",
                "preview": "true"
            }
        })
            .then(form => {
                console.log('初始化表单: 表单名称: 第一个表单 schemas: []')
            })
    }
});

// 4. 向外暴露Model
module.exports = FormModel;
