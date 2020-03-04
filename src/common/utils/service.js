import awaitWrap from './awaitWrap'
import axios from './Axios'
import api from './api'

// 查询任务进程
export const getTaskProcess = (param = {}) => {
  return awaitWrap(axios.post(api.GET_TASK_PROCESS, {}))
}
// 增加任务
export const addTaskProcess = (param = {}) => {
  return awaitWrap(axios.post(api.ADD_TASK_PROCESS, {}))
}
// 订单流程查询
export const getOrderProcess = (param = {}) => {
  return awaitWrap(axios.post(api.GET_ORDER_PROCESS, {}))
}
// 获取产品信息
export const getProduct = (param = {}) => {
  return awaitWrap(axios.post(api.GET_PRODUCT, {}))
}
// 上传身份证正反面
export const uploadIdentityPhotos = (param = {}) => {
  return awaitWrap(axios.post(api.UPLOAD_IDENTITY_PHOTOS, {}))
}
// 获取绑定银行卡
export const getOrderBankCard = (param = {}) => {
  return awaitWrap(axios.post(api.GET_ORDER_BANK_CARD, param))
}
// 获银支持行卡
export const getOrderBankList = (param = {}) => {
  return awaitWrap(axios.post(api.GET_ORDER_BANK_LIST, param))
}

// 添加银行卡
export const addBankCard = (param = {}) => {
  return awaitWrap(axios.post(api.SET_ORDER_PROCESS, param))
}
// 提交借款申请
export const submitUserInfo = (param = {}) => {
  return awaitWrap(axios.post(api.SUBMIT_USER_INFO, param))
}



