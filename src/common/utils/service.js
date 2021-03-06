import awaitWrap from "./awaitWrap";
import axios from "./Axios";
import api from "./api";

//查询任务进程
export const getTaskProcess = (param = {}) => {
  return awaitWrap(axios.post(api.GET_TASK_PROCESS, {}));
};
//增加任务
export const addTaskProcess = (param = {}) => {
  return awaitWrap(axios.post(api.ADD_TASK_PROCESS, {}));
};
//订单流程查询
export const getOrderProcess = (param = {}) => {
  return awaitWrap(axios.post(api.GET_ORDER_PROCESS, {}));
};

//获取登录信息接口
export const apiGetOrderProcess = (param = {}) => {
  return awaitWrap(axios.post(api.API_GET__ORDER_PROCESS, {}));
};

//验证码登陆接口
export const apiSetOrderProcess = (param = {}) => {
  return awaitWrap(axios.post(api.API_SET__ORDER_PROCESS, {}));
};

//获取产品信息
export const getProduct = (param = {}) => {
  return awaitWrap(axios.post(api.GET_PRODUCT, {}));
};
//上传身份证正反面
export const uploadIdentityPhotos = (param = {}) => {
  return awaitWrap(axios.post(api.UPLOAD_IDENTITY_PHOTOS, {}));
};
