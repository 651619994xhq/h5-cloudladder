export default {
  SEND_SMS_CODE:'/api/user/sendSmsCode', //注册发送短信验证码
  GET_BANNER_LIST:'/api/banner/listValidBanner', //获取头部列表
  GET_EMPLOYEE_LIST:'/api/employee/listValidEmployee', //移动端-首页-阿姨列表接
  REGISTER:'/api/user/register', //移动端-注册接口
  LOGIN:'/api/user/login', //移动端 登录接口
  GET_EMPLOYEE_INFO:'/api/employee/getEmployeeById', //获取阿姨详情
  GET_MY_INFO:'/api/user/userInfo', //获取自己的信息
  GET_USER_INFO:'/api/user/getUserInfo', //获取自己的信息
  GET_MY_COLLECT_LIST:'/api/user/selectCollections', //我的收藏列表
  DELETE_COLLECT:'/api/user/deleteCollection', //取消收藏
  COLLECT:'/api/user/collectionEmployee', //收藏雇员
  UPDATE_PHONE:'/api/user/updatePhone', //修改手机号
  GET_ORDER_LIST:'api/order/orderList', //获取订单列表
  GET_ORDER_DETAIL:'/api/order/getOrderById', //获取订单详情
  CANCEL_INTERVIEW:'api/order/cancelInterview',//取消预约
  UPDATE_USER_INFO:'/api/user/updateUserInfo', //更新用户信息
  GET_EMPLOYEE_BASE_INFO:'/api/employee/employeeBaseInfo', // 获取阿姨基本信息
  GET_OCCUPY_TIME:'/api/order/occupyTime',//预约面试时间
  APPOINT_INTERVIEW:'/api/order/appointmentInterview',//预约面试
  ADD_COMMENTS:'/api/comments/add', //雇主添加评论
  SIGN:'/api/order/sign', //签约
  IS_HAS_INFO:'/api/user/isHasInfo', //判断是否有信息
  GET_SCHEDULE_TIME:'/api/order/employeeCalendar', //获取档期
}
