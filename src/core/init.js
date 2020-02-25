import '@common/css/base.css'  //导入重置样式
import '@common/utils/touchEvent'; //导出自己的手势库 自定义指令
import '../icons';
import '../filters/index'
// import '@/mockData/index';  //导入mockData 模块
import '@common/vant/index';
import '@common/utils/fastclick';
import '@common/native'

import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
Vue.config.productionTip = false;

class InitManager {
  static init(){
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
