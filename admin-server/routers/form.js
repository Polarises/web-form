/*
用来定义路由的路由器模块
 */
const express = require('express')
const FormModel = require('../models/FormModel')

// 得到路由器对象
const router = express.Router()

// 添加表单
router.post('/add', async (req, res) => {
    const form = req.body;
    const formName = form.name;
    form.createdAt = new Date();
    const result = await FormModel.findOne({name: formName});
    if (result !== null) {
        res.send({status: 1, msg: '已有重名表单, 请重新命名'})
    } else {
        FormModel.create(form)
            .then(form => {
                res.send({status: 0, data: form})
            })
            .catch(error => {
                console.error('添加表单异常', error);
                res.send({status: 1, msg: '添加表单异常, 请重新尝试'})
            })
    }
});

// 获取表单列表
router.get('/list', (req, res) => {
    const parentId = req.query.parentId || '0'
    FormModel.find()
        .then(forms => {
            res.send({status: 0, data: forms})
        })
        .catch(error => {
            console.error('获取表单列表异常', error)
            res.send({status: 1, msg: '获取表单列表异常, 请重新尝试'})
        })
})

// 删除表单
router.post('/delete', (req, res) => {
    const {_id} = req.body
    FormModel.deleteOne({_id: _id})
        .then((doc) => {
            res.send({status: 0})
        })
        .catch(error => {
            console.error('删除表单异常', error)
            res.send({status: 1, msg: '删除表单异常, 请重新尝试'})
        })
})

// 更新表单
router.post('/update', (req, res) => {
    const form = req.body
    FormModel.findOneAndUpdate({_id: form._id}, form)
        .then(oldProduct => {
            res.send({status: 0})
        })
        .catch(error => {
            console.error('更新表单异常', error)
            res.send({status: 1, msg: '更新表单异常, 请重新尝试'})
        })
})

// 根据表单ID获取表单
router.get('/info', (req, res) => {
    FormModel.findOne(req.query)
        .then(form => {
            res.send({status: 0, data: form})
        })
        .catch(error => {
            console.error('获取表单信息异常', error)
            res.send({status: 1, msg: '获取表单信息异常, 请重新尝试'})
        })
})

// 搜索表单列表
router.get('/search', (req, res) => {
    const {pageNum, pageSize, searchName, productName, productDesc} = req.query;
    let contition = {}
    if (productName) {
        contition = {name: new RegExp(`^.*${productName}.*$`)}
    } else if (productDesc) {
        contition = {desc: new RegExp(`^.*${productDesc}.*$`)}
    }
    FormModel.find(contition)
        .then(forms => {
            res.send({status: 0, data: pageFilter(forms, pageNum, pageSize)})
        })
        .catch(error => {
            console.error('搜索表单列表异常', error);
            res.send({status: 1, msg: '搜索表单列表异常, 请重新尝试'})
        })
});


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
