/*
 Navicat Premium Data Transfer

 Source Server         : mongo
 Source Server Type    : MongoDB
 Source Server Version : 40405
 Source Host           : localhost:27017
 Source Schema         : web-form

 Target Server Type    : MongoDB
 Target Server Version : 40405
 File Encoding         : 65001

 Date: 07/03/2022 00:23:31
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
    _id: ObjectId("6224d836c2bddc2128a8ef6a"),
    formId: "6224d7f6c2bddc2128a8ef5e",
    tabs: [
        "姓名",
        "学号",
        "班级",
        "专业",
        "宿舍"
    ],
    info: {
        inputName: "11",
        "input_Ls9zcZ": "22",
        "input_GCe5iT": "33",
        "input_epklle": "44",
        "input_crazVB": "55"
    },
    createdAt: "Sun Mar 06 2022 23:50:14 GMT+0800 (GMT+08:00)",
    __v: NumberInt("0")
} ]);
db.getCollection("datas").insert([ {
    _id: ObjectId("6224d876c2bddc2128a8ef82"),
    formId: "6224d85ec2bddc2128a8ef77",
    tabs: [
        "第一个输入框",
        "第二个",
        "编辑框",
        "日期选择",
        "是否选择"
    ],
    info: {
        "input_t5l7fo": "第一",
        "input_lKMnkI": "第二",
        "textarea_V30YXV": "第三编辑",
        "date_POD3T2": "2022-03-10",
        "checkbox_AqrGiE": true
    },
    createdAt: "Sun Mar 06 2022 23:51:18 GMT+0800 (GMT+08:00)",
    __v: NumberInt("0")
} ]);
db.getCollection("datas").insert([ {
    _id: ObjectId("6224d8c4c2bddc2128a8ef8d"),
    formId: "6224d85ec2bddc2128a8ef77",
    tabs: [
        "第一个输入框",
        "第二个",
        "编辑框",
        "日期选择",
        "是否选择"
    ],
    info: {
        "input_t5l7fo": "11",
        "input_lKMnkI": "22",
        "textarea_V30YXV": "33",
        "date_POD3T2": "2022-03-30",
        "checkbox_AqrGiE": false
    },
    createdAt: "Sun Mar 06 2022 23:52:36 GMT+0800 (GMT+08:00)",
    __v: NumberInt("0")
} ]);
db.getCollection("datas").insert([ {
    _id: ObjectId("6224df1dc2bddc2128a8f030"),
    formId: "6224d7f6c2bddc2128a8ef5e",
    tabs: [
        "姓名",
        "学号",
        "班级",
        "专业",
        "宿舍"
    ],
    info: {
        inputName: "第一个",
        "input_Ls9zcZ": "123123",
        "input_GCe5iT": "7版",
        "input_epklle": "通信",
        "input_crazVB": "2023"
    },
    createdAt: "Mon Mar 07 2022 00:19:41 GMT+0800 (GMT+08:00)",
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
    _id: ObjectId("6224d7f6c2bddc2128a8ef5e"),
    name: "第一个表单",
    schemas: {
        type: "object",
        properties: {
            inputName: {
                title: "姓名",
                placeholder: "请输入姓名",
                type: "string"
            },
            "input_Ls9zcZ": {
                title: "学号",
                type: "string"
            },
            "input_GCe5iT": {
                title: "班级",
                type: "string"
            },
            "input_epklle": {
                title: "专业",
                type: "string"
            },
            "input_crazVB": {
                title: "宿舍",
                type: "string"
            }
        },
        labelWidth: NumberInt("120"),
        displayType: "row",
        preview: "true"
    },
    createdAt: "Sun Mar 06 2022 23:49:10 GMT+0800 (GMT+08:00)",
    __v: NumberInt("0")
} ]);
db.getCollection("forms").insert([ {
    _id: ObjectId("6224d85ec2bddc2128a8ef77"),
    name: "第二个",
    schemas: {
        type: "object",
        properties: {
            "input_t5l7fo": {
                title: "第一个输入框",
                type: "string"
            },
            "input_lKMnkI": {
                title: "第二个",
                type: "string"
            },
            "textarea_V30YXV": {
                title: "编辑框",
                type: "string",
                format: "textarea"
            },
            "date_POD3T2": {
                title: "日期选择",
                type: "string",
                format: "date"
            },
            "checkbox_AqrGiE": {
                title: "是否选择",
                type: "boolean",
                widget: "checkbox"
            }
        },
        labelWidth: NumberInt("120"),
        displayType: "row",
        preview: "true"
    },
    createdAt: "Sun Mar 06 2022 23:50:54 GMT+0800 (GMT+08:00)",
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
    _id: ObjectId("6224d836c2bddc2128a8ef6c"),
    formId: "6224d7f6c2bddc2128a8ef5e",
    json: [
        {
            label: "姓名",
            value: "11",
            key: "inputName"
        },
        {
            label: "学号",
            value: "22",
            key: "input_Ls9zcZ"
        },
        {
            label: "班级",
            value: "33",
            key: "input_GCe5iT"
        },
        {
            label: "专业",
            value: "44",
            key: "input_epklle"
        },
        {
            label: "宿舍",
            value: "55",
            key: "input_crazVB"
        }
    ],
    createdAt: "Sun Mar 06 2022 23:50:14 GMT+0800 (GMT+08:00)",
    __v: NumberInt("0")
} ]);
db.getCollection("jsons").insert([ {
    _id: ObjectId("6224d877c2bddc2128a8ef84"),
    formId: "6224d85ec2bddc2128a8ef77",
    json: [
        {
            label: "第一个输入框",
            value: "第一",
            key: "input_t5l7fo"
        },
        {
            label: "第二个",
            value: "第二",
            key: "input_lKMnkI"
        },
        {
            label: "编辑框",
            value: "第三编辑",
            key: "textarea_V30YXV"
        },
        {
            label: "日期选择",
            value: "2022-03-10",
            key: "date_POD3T2"
        },
        {
            label: "是否选择",
            value: true,
            key: "checkbox_AqrGiE"
        }
    ],
    createdAt: "Sun Mar 06 2022 23:51:19 GMT+0800 (GMT+08:00)",
    __v: NumberInt("0")
} ]);
db.getCollection("jsons").insert([ {
    _id: ObjectId("6224d8c4c2bddc2128a8ef8f"),
    formId: "6224d85ec2bddc2128a8ef77",
    json: [
        {
            label: "第一个输入框",
            value: "11",
            key: "input_t5l7fo"
        },
        {
            label: "第二个",
            value: "22",
            key: "input_lKMnkI"
        },
        {
            label: "编辑框",
            value: "33",
            key: "textarea_V30YXV"
        },
        {
            label: "日期选择",
            value: "2022-03-30",
            key: "date_POD3T2"
        },
        {
            label: "是否选择",
            value: "无",
            key: "checkbox_AqrGiE"
        }
    ],
    createdAt: "Sun Mar 06 2022 23:52:36 GMT+0800 (GMT+08:00)",
    __v: NumberInt("0")
} ]);
db.getCollection("jsons").insert([ {
    _id: ObjectId("6224df1dc2bddc2128a8f032"),
    formId: "6224d7f6c2bddc2128a8ef5e",
    json: [
        {
            label: "姓名",
            value: "第一个",
            key: "inputName"
        },
        {
            label: "学号",
            value: "123123",
            key: "input_Ls9zcZ"
        },
        {
            label: "班级",
            value: "7版",
            key: "input_GCe5iT"
        },
        {
            label: "专业",
            value: "通信",
            key: "input_epklle"
        },
        {
            label: "宿舍",
            value: "2023",
            key: "input_crazVB"
        }
    ],
    createdAt: "Mon Mar 07 2022 00:19:41 GMT+0800 (GMT+08:00)",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("621df6ca8f19111024db3213"),
    username: "admin",
    password: "21232f297a57a5a743894a0e4a801fc3",
    "create_time": 1646130890185,
    __v: NumberInt("0")
} ]);
