import request from '../common/request';
/**
 * 
 * @param {*} username:用户名 
 * @param {*} password:密码
 * @returns 
 */
const userLogin = function (username, password) {
    return request({
        method: "POST",
        url: '/login',
        data: {
            username,
            password
        }
    }).then(resp => {
        return resp.data;
    });
}
const loginApi = {
    userLogin
}
export default loginApi