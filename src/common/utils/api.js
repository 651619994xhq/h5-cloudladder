export default {
  GET_TASK_PROCESS:'/api/queuer/getTaskProcess', //推荐队列查询
  ADD_TASK_PROCESS:'/api/queuer/addTaskProcess', //推荐队列添加
  GET_ORDER_PROCESS:'/api/orderProcess/getOrderProcess', //订单流程查询
  GET_PRODUCT:'/api/product/getProduct', //获取产品信息
  UPLOAD_IDENTITY_PHOTOS:'/identity/uploadIdentityPhotos', //上传身份证正返面
  GET_ORDER_BANK_CARD:'/api/getOrderBankCard', //获取用户已绑定的银行卡
  GET_ORDER_BANK_LIST:'/api/getOrderBankList', //获取支持的银行卡
  SET_ORDER_PROCESS:'/api/setOrderProcess', //添加银行卡
  SUBMIT_USER_INFO:'/api/order/submitUserInfo' // app提交借款申请
}
