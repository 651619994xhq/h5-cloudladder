import {INTERVIEW_TYPE,WORK_TYPE,ORDER_STATUS,IDENTITY_TYPE,SERVICE_TYPE,WORK_STATUS,ORDER_DETAIL_STATUS,SELECT_SERVICE_TYPE} from '../common/utils/constants';
import Vue from 'vue';
Vue.filter('INTERVIEW_TYPE_FILTER',function (value) {
   for(let i=0,len=INTERVIEW_TYPE.length;i<len;i++){
     if(value==INTERVIEW_TYPE[i]['id']){
       return INTERVIEW_TYPE[i]['name']
     };
   };
   return '';
});
Vue.filter('WORK_TYPE_FILTER',function (value) {
  for(let i=0,len=WORK_TYPE.length;i<len;i++){
    if(value==WORK_TYPE[i]['id']){
      return WORK_TYPE[i]['name']
    };
  };
  return '';
});
Vue.filter('ORDER_STATUS_FILTER',function (value) {
  for(let i=0,len=ORDER_STATUS.length;i<len;i++){
    if(value==ORDER_STATUS[i]['id']){
      return ORDER_STATUS[i]['name']
    };
  };
  return '';
});
Vue.filter('ORDER_DETAIL_STATUS_FILTER',function (value) {
  for(let i=0,len=ORDER_DETAIL_STATUS.length;i<len;i++){
    if(value==ORDER_DETAIL_STATUS[i]['id']){
      return ORDER_DETAIL_STATUS[i]['name']
    };
  };
  return '';
});
Vue.filter('IDENTITY_TYPE_FILTER',function (value) {
  for(let i=0,len=IDENTITY_TYPE.length;i<len;i++){
    if(value==IDENTITY_TYPE[i]['id']){
      return IDENTITY_TYPE[i]['name']
    };
  };
  return '';
});
Vue.filter('SERVICE_TYPE_FILTER',function (value) {
  for(let i=0,len=SERVICE_TYPE.length;i<len;i++){
    if(value==SERVICE_TYPE[i]['id']){
      return SERVICE_TYPE[i]['name']
    };
  };
  return '';
});
Vue.filter('WORK_STATUS_FILTER',function (value) {
  for(let i=0,len=WORK_STATUS.length;i<len;i++){
    if(value==WORK_STATUS[i]['id']){
      return WORK_STATUS[i]['name']
    };
  };
  return '';
});
Vue.filter('SELECT_SERVICE_TYPE_FILTER',function (value) {
  for(let i=0,len=SELECT_SERVICE_TYPE.length;i<len;i++){
    if(value==SELECT_SERVICE_TYPE[i]['id']){
      return SELECT_SERVICE_TYPE[i]['name']
    };
  };
  return '';
});
