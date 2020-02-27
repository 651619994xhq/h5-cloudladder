import '@common/css/base.css'  //导入重置样式
import '@common/utils/touchEvent'; //导出自己的手势库 自定义指令
import '../icons';
import '../filters/index'
// import '@/mockData/index';  //导入mockData 模块
import '@common/vant/index';
import '@common/utils/fastclick';
import '@common/native'
import {getAccessToken,getApiGateway,getBackAppUrl} from "@common/utils/localStorage";

import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
Vue.config.productionTip = false;

class InitManager {
  static init(){
    if(getAccessToken()){
      store.commit('SET_ACCESS_TOKEN',getAccessToken());
    };
    if(getApiGateway()){
      store.commit('SET_API_GATEWAY',getApiGateway());
    };
    if(getBackAppUrl()){
      store.commit('SET_BACK_APP_URL',getBackAppUrl());
    };
    new Vue({
      el: '#app',
      router,
      store,
      components: {App},
      template: '<App/>'
    });
  }

}

export default InitManager
