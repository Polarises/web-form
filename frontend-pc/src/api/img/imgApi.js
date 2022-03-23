import request from '../common/request';

/**
 * 
 * @param {*} name 图片文件名字
 */
const deleteImg = (name) => {
  return request({
    method: 'POST',
    url: '/manage/img/delete',
    data: {
      name
    }
  }).then((resp) => {
    return resp.data
  })
}

const imgApi = {
  deleteImg
}
export default imgApi