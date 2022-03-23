import request from '../common/request';
/**
 *
 * @param values
 * @returns
 */
const getHomeInfo = function (values) {
    return request({
        method: "get",
        url: '/home/info',
        params: values
    }).then(resp => {
        return resp.data;
    });
}
/**
 *
 * @param values
 */
const getDashboardInfo = function (values) {
    return request({
        method: 'GET',
        url: '/dashboard/info',
        data: values
    }).then(resp => {
        return resp.data
    })
}
/**
 *
 * @param values
 */
const getDashboardAll = function (values) {
    return request({
        method: 'GET',
        url: '/dashboard/all',
        data: values
    }).then(resp => {
        return resp.data
    })
}
/**
 *
 * @param values 本表单
 */
const getPieInfo = function (values) {
    return request({
        method: 'GET',
        url: '/dashboard/pie',
        data: values
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
    getHomeInfo,
    getDashboardInfo,
    getDashboardAll,
    getPieInfo,
    getFormById,
    deleteForm,
}
export default formApi
