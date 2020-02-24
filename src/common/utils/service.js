import awaitWrap from './awaitWrap';
import axios from './Axios';
import api from './api';

//发送注册验证码
export const sendRegisterCode =(param={})=>{
  let phone=param.phone?param.phone:'',time=param.time?param.time:'',sign=param.sign?param.sign:'';
  return awaitWrap(axios.post(api.SEND_SMS_CODE,{phone,time,sign,type:1}))
};
//发送修改手机号代码
export const sendUpdatePhoneCode =(param={})=>{
  let phone=param.phone?param.phone:'',time=param.time?param.time:'',sign=param.sign?param.sign:'';
  return awaitWrap(axios.post(api.SEND_SMS_CODE,{phone,time,sign,type:2}))
};
//移动端注册接口
export const register =(param={})=>{
  let phone=param.phone?param.phone:'',smsCode=param.smsCode?param.smsCode:'',identityType=param.identityType?param.identityType:'';
  return awaitWrap(axios.post(api.REGISTER,{phone,smsCode,identityType}))
};
//登录接口
export const login =(param={})=>{
  let code=param.code?param.code:'';
  return awaitWrap(axios.post(api.LOGIN,{code}))
};

//获取头部的轮播图
export const getBannerList =(param={})=>{
  return awaitWrap(axios.post(api.GET_BANNER_LIST,{}))
};

//首页雇员列表
export const getEmployeeList=(param={})=>{
  let pageNum=param.pageNum?param.pageNum:1,pageSize=param.pageSize?param.pageSize:10,type=param.type?param.type:'';//类型1月嫂2.保姆3.育儿嫂
  return awaitWrap(axios.post(api.GET_EMPLOYEE_LIST,{pageNum,pageSize,type}))
};

//获取阿姨详情
export const getEmployeeInfo=(param={})=>{
  let id=param.id?param.id:'';
  return awaitWrap(axios.post(api.GET_EMPLOYEE_INFO ,{id}))
};

//获取我的用户信息
export const getMyInfo =(param={})=>{
  return awaitWrap(axios.post(api.GET_MY_INFO,{}))
};

export const getUserInfo =(param={})=>{
  return awaitWrap(axios.post(api.GET_USER_INFO,{}))
};

//获取我的收藏列表
export const getMyCollectList=(param={})=>{
  let pageNum=param.pageNum?param.pageNum:1,pageSize=param.pageSize?param.pageSize:10;
  return awaitWrap(axios.post(api.GET_MY_COLLECT_LIST,{pageNum,pageSize}))
};

//取消收藏
export const deleteCollect=(param={})=>{
  let employeeIds=param.employeeIds?param.employeeIds:[];
  return awaitWrap(axios.post(api.DELETE_COLLECT,{employeeIds}))
};
//收藏
export const collect=(param={})=>{
  let employeeId=param.employeeId?param.employeeId:'';
  return awaitWrap(axios.post(api.COLLECT,{employeeId}))
};

//修改手机号
export const updatePhone=(param={})=>{
  let checkCode=param.checkCode?param.checkCode:'',phone=param.phone?param.phone:'';
  return awaitWrap(axios.post(api.UPDATE_PHONE,{checkCode,phone}));
};
//跟新用户信息
export const updateUserInfo=(param={})=>{
  let babyBirthday=param.babyBirthday?param.babyBirthday:'',birthday=param.birthday?param.birthday:'',identityType=param.identityType?param.identityType:'',address=param.address?param.address:'';
  let $param={babyBirthday,birthday,identityType,address};
  let _param={};
  for(let i in $param){
    if($param[i]){
      _param[i]=$param[i];
    }
  }
  return awaitWrap(axios.post(api.UPDATE_USER_INFO,{..._param}))
};
//我的订单列表
export const getMyOrderList=(param={})=>{
  let pageNum=param.pageNum?param.pageNum:1,pageSize=param.pageSize?param.pageSize:10;
  return awaitWrap(axios.post(api.GET_ORDER_LIST,{pageNum,pageSize}))
};
//获取订单详情
export const getOrderDetail=(param={})=>{
  let orderId=param.orderId?param.orderId:'';
  return awaitWrap(axios.post(api.GET_ORDER_DETAIL,{orderId}))
};
//取消预约
export const cancelInterview=(param={})=>{
  let orderId=param.orderId?param.orderId:'';
  return awaitWrap(axios.post(api.CANCEL_INTERVIEW,{orderId}))
};
//雇主添加评论
export const addComments=(param={})=>{
  let employeeId=param.employeeId?param.employeeId:'',comment=param.comment?param.comment:'',starClass=param.starClass?param.starClass:'';
  return awaitWrap(axios.post(api.ADD_COMMENTS,{employeeId,comment,starClass,source:1}))
};
//获取阿姨基本信息
export const getEmployeeBaseInfo=(param={})=>{
  let auntId=param.auntId?param.auntId:'';
  return awaitWrap(axios.post(api.GET_EMPLOYEE_BASE_INFO,{auntId}))
};
//获取预约面试时间
export const getOccupyTime=(param={})=>{
  let auntId=param.auntId?param.auntId:'';
  return awaitWrap(axios.post(api.GET_OCCUPY_TIME,{auntId}))
};
//获取档期
export const getScheduleTime=(param={})=>{
  let auntId=param.auntId?param.auntId:'',yearMonth=param.yearMonth?param.yearMonth:'';
  return awaitWrap(axios.post(api.GET_SCHEDULE_TIME,{auntId,yearMonth}))
};
//预约面试
export const appointInterview=(param={})=>{
  let auntId=param.auntId?param.auntId:'',interviewType=param.interviewType?param.interviewType:'',interviewTime=param.interviewTime?param.interviewTime:'',remark=param.remark?param.remark:'',interviewAddress=param.interviewAddress?param.interviewAddress:'';
  return awaitWrap(axios.post(api.APPOINT_INTERVIEW,{auntId,interviewType,interviewTime,remark,interviewAddress}));
};
//签约
export const sign=(param={})=>{
  let auntId=param.auntId?param.auntId:'',signCycle=param.signCycle?param.signCycle:'',
    startTime=param.startTime?param.startTime:'',serverType=param.serverType?param.serverType:'',orderId=param.orderId?param.orderId:'';
  return awaitWrap(axios.post(api.SIGN,{auntId,signCycle,startTime,serverType,orderId}))
};

//获取access_token
// export const getAccessToken=(param={})=> {
//   let path='/test/cgi-bin/token?grant_type=client_credential&appid=wx9e4e8c44087bd7ca&secret=4efbebf29a4b179376a9964ae1d33016';
//   return awaitWrap(axios.getWeiXin(path));
// };
//获取openId
// export const getOpenId=(param={})=> {
//   let path=`/test/cgi-bin/user/info/updateremark?access_token=${param.access_token}`;
//   return awaitWrap(axios.postWeiXin(path,{}));
// };
//获取用户信息
// export const getUserInfo=(param={})=> {
//   let path=`/test/cgi-bin/user/info?access_token=${param.access_token}&openid=${param.openId}&lang=zh_CN`;
//   return awaitWrap(axios.reqWeiXin(path));
// };
//是否去补充信息
export const isGoSupplementInfo=()=>{
  return awaitWrap(axios.post(api.IS_HAS_INFO,{}))
};
