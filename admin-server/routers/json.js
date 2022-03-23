/*
用来定义路由的路由器模块
 */
const express = require('express')
const JsonModel = require('../models/JsonModel')
const FormModel = require('../models/FormModel')

// 得到路由器对象
const router = express.Router()

// 添加data数据
router.post('/add', async (req, res) => {
    const data = req.body;
    data.createdAt = new Date();
    JsonModel.create(data)
        .then(data => {
            res.send({status: 0, data: data})
        })
        .catch(error => {
            console.error('添加数据异常', error);
            res.send({status: 1, msg: '添加数据异常, 请重新尝试'})
        })
});

// 获取数据列表
router.get('/list', (req, res) => {
    const {formId} = req.query
    JsonModel.find().where({
        formId
    })
        .then(datas => {
            FormModel.find().where({
                formId
            }).then(form => {
                res.send({
                    status: 0,
                    data: {
                        formName: form.name,
                        formId: form._id,
                        data: datas,
                    }
                })
            })
        })
        .catch(error => {
            console.error('获取数据列表异常', error)
            res.send({status: 1, msg: '获取数据列表异常, 请重新尝试'})
        })
})

/*
得到指定数组的分页信息对象
 */
function pageFilter(arr, pageNum, pageSize) {
    pageNum = pageNum * 1
    pageSize = pageSize * 1
    const total = arr.length
    const pages = Math.floor((total + pageSize - 1) / pageSize)
    const start = pageSize * (pageNum - 1)
    const end = start + pageSize <= total ? start + pageSize : total
    const list = []
    for (var i = start; i < end; i++) {
        list.push(arr[i])
    }

    return {
        pageNum,
        total,
        pages,
        pageSize,
        list
    }
}

module.exports = router
