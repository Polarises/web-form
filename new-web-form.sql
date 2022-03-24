/*
 Navicat Premium Data Transfer

 Source Server         : mongo
 Source Server Type    : MongoDB
 Source Server Version : 50005
 Source Host           : localhost:27017
 Source Schema         : new-web-form

 Target Server Type    : MongoDB
 Target Server Version : 50005
 File Encoding         : 65001

 Date: 24/03/2022 17:26:29
*/


// ----------------------------
// Collection structure for datas
// ----------------------------
db.getCollection("datas").drop();
db.createCollection("datas");

// ----------------------------
// Documents of datas
// ----------------------------
db.getCollection("datas").insert([ {
    _id: ObjectId("623c367f369efe4094f1f8b1"),
    formId: "623c35ec369efe4094f1f88c",
    tabs: [
        "姓名",
        "输入框",
        "日期选择"
    ],
    info: {
        inputName: "董",
        "input_ksYbBh": "1",
        "date_7pEe1-": "2022-03-02"
    },
    createdAt: "Thu Mar 24 2022 17:14:39 GMT+0800 (中国标准时间)",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for forms
// ----------------------------
db.getCollection("forms").drop();
db.createCollection("forms");

// ----------------------------
// Documents of forms
// ----------------------------
db.getCollection("forms").insert([ {
    _id: ObjectId("623c35ec369efe4094f1f88c"),
    name: "表单",
    schemas: {
        type: "object",
        labelWidth: NumberInt("120"),
        displayType: "row",
        preview: "true",
        properties: {
            inputName: {
                title: "姓名",
                placeholder: "请输入姓名",
                type: "string"
            },
            "input_ksYbBh": {
                title: "输入框",
                type: "string"
            },
            "date_7pEe1-": {
                title: "日期选择",
                type: "string",
                format: "date"
            }
        }
    },
    createdAt: "Thu Mar 24 2022 17:12:12 GMT+0800 (中国标准时间)",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for jsons
// ----------------------------
db.getCollection("jsons").drop();
db.createCollection("jsons");

// ----------------------------
// Documents of jsons
// ----------------------------
db.getCollection("jsons").insert([ {
    _id: ObjectId("623c367f369efe4094f1f8b3"),
    formId: "623c35ec369efe4094f1f88c",
    json: [
        {
            label: "姓名",
            value: "董",
            key: "inputName"
        },
        {
            label: "输入框",
            value: "1",
            key: "input_ksYbBh"
        },
        {
            label: "日期选择",
            value: "2022-03-02",
            key: "date_7pEe1-"
        }
    ],
    createdAt: "Thu Mar 24 2022 17:14:39 GMT+0800 (中国标准时间)",
    __v: NumberInt("0")
} ]);
