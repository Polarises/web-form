import request from '../common/request';
/**
 *
 * @param parentId 父表单id
 * @returns
 */
const getFormList = function (parentId = 0) {
    return request({
        method: "get",
        url: '/form/list',
        params: {
            parentId
        }
    }).then(resp => {
        return resp.data;
    });
}
/**
 *
 * @param values
 */
const addForm = function (values) {
    return request({
        method: 'POST',
        url: '/form/add',
        data: values
    }).then(resp => {
        return resp.data
    })
}
/**
 *
 * @param form 本表单
 */
const updateForm = function (form) {
    return request({
        method: 'POST',
        url: '/form/update',
        data: form
    }).then(resp => {
        return resp.data
    })
}

/**
 *
 * @param _id 表单的id
 */

const getFormById = function (_id) {
    return request({
        method: 'GET',
        url: '/form/info',
        params: {
            _id
        }
    }).then(resp => {
        return resp.data
    })
}

/**
 *
 * @param {*} _id form 表单的 _id
 */
const deleteForm = (_id) => {
    return request({
        method: 'POST',
        url: '/form/delete',
        data: {
            _id
        }
    }).then((resp) => {
        return resp.data
    })
}

const formApi = {
    getFormList,
    addForm,
    updateForm,
    getFormById,
    deleteForm,
}
export default formApi
