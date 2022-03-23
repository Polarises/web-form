import request from '../common/request';
/**
 *
 * @param parentId 父表单id
 * @returns
 */
const getJsonList = function (parentId = 0) {
    return request({
        method: "get",
        url: '/json/list',
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
const addJson = function (values) {
    return request({
        method: 'POST',
        url: '/json/add',
        data: values
    }).then(resp => {
        return resp.data
    })
}
/**
 *
 * @param json 本表单
 */
const updateJson = function (json) {
    return request({
        method: 'POST',
        url: '/json/update',
        data: json
    }).then(resp => {
        return resp.data
    })
}

/**
 *
 * @param formId 表单的id
 */

const getJsonListByFormId = function (formId) {
    return request({
        method: 'GET',
        url: '/json/list',
        params: {
            formId
        }
    }).then(resp => {
        return resp.data
    })
}

/**
 *
 * @param {*} _id json 表单的 _id
 */
const deleteJson = (_id) => {
    return request({
        method: 'POST',
        url: '/json/delete',
        data: {
            _id
        }
    }).then((resp) => {
        return resp.data
    })
}

const jsonApi = {
    getJsonList,
    addJson,
    updateJson,
    getJsonListByFormId,
    deleteJson,
}
export default jsonApi
