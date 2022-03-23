import request from '../common/request';
/**
 *
 * @param parentId 父表单id
 * @returns
 */
const getDataList = function (parentId = 0) {
    return request({
        method: "get",
        url: '/data/list',
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
const addData = function (values) {
    return request({
        method: 'POST',
        url: '/data/add',
        data: values
    }).then(resp => {
        return resp.data
    })
}
/**
 *
 * @param data 本表单
 */
const updateData = function (data) {
    return request({
        method: 'POST',
        url: '/data/update',
        data: data
    }).then(resp => {
        return resp.data
    })
}

/**
 *
 * @param formId 表单的id
 */

const getDataListByFormId = function (formId) {
    return request({
        method: 'GET',
        url: '/data/list',
        params: {
            formId
        }
    }).then(resp => {
        return resp.data
    })
}

/**
 *
 * @param {*} _id data 表单的 _id
 */
const deleteData = (_id) => {
    return request({
        method: 'POST',
        url: '/data/delete',
        data: {
            _id
        }
    }).then((resp) => {
        return resp.data
    })
}

const dataApi = {
    getDataList,
    addData,
    updateData,
    getDataListByFormId,
    deleteData,
}
export default dataApi
