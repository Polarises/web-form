/*
用来定义路由的路由器模块
 */
const express = require('express')
const md5 = require('blueimp-md5')

const UserModel = require('../models/UserModel')
// const CategoryModel = require('../models/CategoryModel')
// const RoleModel = require('../models/RoleModel')
const FormModel = require('../models/FormModel')
const DataModel = require('../models/DataModel')


// 得到路由器对象
const router = express.Router()
// console.log('router', router)

// 指定需要过滤的属性
const filter = {password: 0, __v: 0}


// 登陆
router.post('/login', (req, res) => {
  const {username, password} = req.body
  // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
  UserModel.findOne({username, password: md5(password)})
    .then(user => {
      if (user) { // 登陆成功
        // 生成一个cookie(userid: user._id), 并交给浏览器保存
        res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24})
        if (user.role_id) {
          RoleModel.findOne({_id: user.role_id})
            .then(role => {
              user._doc.role = role
              console.log('role user', user)
              res.send({status: 0, data: user})
            })
        } else {
          user._doc.role = {menus: []}
          // 返回登陆成功信息(包含user)
          res.send({status: 0, data: user})
        }

      } else {// 登陆失败
        res.send({status: 1, msg: '用户名或密码不正确!'})
      }
    })
    .catch(error => {
      console.error('登陆异常', error)
      res.send({status: 1, msg: '登陆异常, 请重新尝试'})
    })
})

// 首页的 数据信息
router.get('/home/info', (req, res) => {
    FormModel.findOne(req.query)
        .then(form => {
            res.send({status: 0, data: form})
        })
        .catch(error => {
            console.error('获取数据信息异常', error)
            res.send({status: 1, msg: '获取数据信息异常, 请重新尝试'})
        })
})

// 仪表盘 数据信息
router.get('/dashboard/info', (req, res) => {
    FormModel.findOne(req.query)
        .then(form => {
            res.send({status: 0, data: form})
        })
        .catch(error => {
            console.error('获取数据信息异常', error)
            res.send({status: 1, msg: '获取数据信息异常, 请重新尝试'})
        })
})
//
router.get('/dashboard/all', async (req, res) => {
    const formList = await FormModel.find().catch(error => {
        console.error('获取数据信息异常', error);
        res.send({status: 1, msg: '获取数据信息异常, 请重新尝试'})
    });
    const dataList = await DataModel.find().catch(error => {
        console.error('获取数据信息异常', error);
        res.send({status: 1, msg: '获取数据信息异常, 请重新尝试'})
    });
    res.send({status: 0, data: {formList, dataList}})
});

// 仪表盘 pie 饼图 数据信息
router.get('/dashboard/pie', async (req, res) => {
    let arrList = [];
    FormModel.find().then(formList => {
        DataModel.find().then(dataList => {
            formList.map(form => {
                form.value = 0;
                dataList.map(data => {
                    if (data.formId === form._id) {
                        form.value = form.value + 1;
                    }
                });
                arrList.push({
                    value: form.value,
                    name: form.name,
                });
            });
        }).then((() => {
            res.send({
                data: arrList,
                status: 0,
            });
        }));
    }).catch(error => {
            console.error('获取数据信息异常', error);
            res.send({status: 1, msg: '获取数据信息异常, 请重新尝试'})
        });
});

// 添加角色
// router.post('/manage/role/add', (req, res) => {
//   const {roleName} = req.body
//   RoleModel.create({name: roleName})
//     .then(role => {
//       res.send({status: 0, data: role})
//     })
//     .catch(error => {
//       console.error('添加角色异常', error)
//       res.send({status: 1, msg: '添加角色异常, 请重新尝试'})
//     })
// })

// 获取角色列表
// router.get('/manage/role/list', (req, res) => {
//   RoleModel.find()
//     .then(roles => {
//       res.send({status: 0, data: roles})
//     })
//     .catch(error => {
//       console.error('获取角色列表异常', error)
//       res.send({status: 1, msg: '获取角色列表异常, 请重新尝试'})
//     })
// })

// 更新角色(设置权限)
// router.post('/manage/role/update', (req, res) => {
//   const role = req.body
//   role.auth_time = Date.now()
//   RoleModel.findOneAndUpdate({_id: role._id}, role)
//     .then(oldRole => {
//       // console.log('---', oldRole._doc)
//       res.send({status: 0, data: {...oldRole._doc, ...role}})
//     })
//     .catch(error => {
//       console.error('更新角色异常', error)
//       res.send({status: 1, msg: '更新角色异常, 请重新尝试'})
//     })
// })


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

// require('./file-upload')(router)

module.exports = router
