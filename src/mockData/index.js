const Mock=require('mockjs');
import api from '@/common/utils/api';
const Random = Mock.Random;
//首页 banner 头部数据
const bannerData = function() {
  let data=[];
  let $data={
      status:1,
      message:'',
      url:'',
      returnData:[
        {
          id:1,
          title:'test',
          pictureUrl:'',
          bannerUrl:'',
          status:'',
          createTime:'',
          upShelfDate:'',
          downShelfDate:'',
          updateTime:''
        },
      ]
  }
  return $data;
};
Mock.mock(api.GET_BANNER_LIST, 'post', bannerData);

//首页数据
const homeEmployeeListData = function() {
  let $data={
    status:1,
    message:'',
    url:'',
    returnData:[
      {
        isSole:1,age:'test',nativePlace:'',workYear:'',oneSentenceEvaluation:'',code:'',label:'',
      },
      {
        isSole:1,age:'test',nativePlace:'',workYear:'',oneSentenceEvaluation:'',code:'',label:'',
      },
      {
        isSole:1,age:'test',nativePlace:'',workYear:'',oneSentenceEvaluation:'',code:'',label:'',
      },
      {
        isSole:1,age:'test',nativePlace:'',workYear:'',oneSentenceEvaluation:'',code:'',label:'',
      },
      {
        isSole:1,age:'test',nativePlace:'',workYear:'',oneSentenceEvaluation:'',code:'',label:'',
      },
      {
        isSole:1,age:'test',nativePlace:'',workYear:'',oneSentenceEvaluation:'',code:'',label:'',
      },
      {
        isSole:1,age:'test',nativePlace:'',workYear:'',oneSentenceEvaluation:'',code:'',label:'',
      },
      {
        isSole:1,age:'test',nativePlace:'',workYear:'',oneSentenceEvaluation:'',code:'',label:'',
      },
      {
        isSole:1,age:'test',nativePlace:'',workYear:'',oneSentenceEvaluation:'',code:'',label:'',
      },

    ]
  }
  return $data;
};
Mock.mock(api.GET_EMPLOYEE_LIST, 'post', homeEmployeeListData);

//注册 发送验证码
const sendSmsCodeData = function() {
  let $data={
    status:1,
    message:'',
    url:'',
    returnData:''
  }
  return $data;
};
Mock.mock(api.SEND_SMS_CODE, 'post', sendSmsCodeData);

//移动端——>给雇员添加评论
const addCommentsData = function() {
  let $data={
    status:1,
    message:'',
    url:'',
    returnData:''
  }
  return $data;
};
Mock.mock(api.ADD_COMMENTS, 'post', addCommentsData);

const getOrderList = function() {
  let $data={
    status:1,
    message:'',
    url:'',
    returnData:{
      list:[
        {
          orderType:'',
          employeeName:'',
          salary:'',
          interviewType:'',
          interviewTime:'',
          status:'',
        },
        {
          orderType:'',
          employeeName:'',
          salary:'',
          interviewType:'',
          interviewTime:'',
          status:'',
        },
        {
          orderType:'',
          employeeName:'',
          salary:'',
          interviewType:'',
          interviewTime:'',
          status:'',
        },
        {
          orderType:'',
          employeeName:'',
          salary:'',
          interviewType:'',
          interviewTime:'',
          status:'',
        },
        {
          orderType:'',
          employeeName:'',
          salary:'',
          interviewType:'',
          interviewTime:'',
          status:'',
        },
        {
          orderType:'',
          employeeName:'',
          salary:'',
          interviewType:'',
          interviewTime:'',
          status:'',
        }
      ],
      totalPage:'',
      pageSize:'',
      totalCount:'',
      currentPage:''
    }
  }
  return $data;
};
Mock.mock(api.GET_ORDER_LIST, 'post', getOrderList);



