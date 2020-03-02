import axios from 'axios'
import store from '@/store'
import Router from '@/router/index'
const baseURL = process.env.BASE_URL
class Axios {
  constructor(props) {
    this.instance = axios.create({
      // baseURL:store.state.apiGateway?store.state.apiGateway:baseURL,  //这里使用传过来的网关
      baseURL,
      timeout: 60000,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Scope-Authorization',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        // 'Scope-Authorization':"", //这里使用传过来的token
        // appName,
        // 'x-app-code': appName,
        ...props
      }
    })
  }
  updateProps(props) {
    this.instance.defaults.headers = {...this.instance.defaults.headers, ...props}
  }
  updateBaseURL(){
    let url = store.state.apiGateway;
    if(!url){
      url = baseURL;
    };
    this.instance.defaults.baseURL=url;
  }
  redirectTokenPastPage(){
    store.commit('CLEAR_BACK_APP_URL');
    store.commit('CLEAR_ACCESS_TOKEN');
    store.commit('CLEAR_API_GATEWAY');
    Router.replace('/error');
  }
  post(path, params) {
    return new Promise((resolve, reject) => {
      console.log('store==>', store)
      let accessToken = store.state.accessToken ? store.state.accessToken : '';
      this.updateProps({ 'Scope-Authorization' : accessToken}); //xhq 更新token
      this.updateBaseURL();  //动态替换地址
      this.instance.post(path, {...params},{headers:{}})
        .then((res) => {
          //1.请求正常正常
          if ( res && res.data && Number(res.data.status) === 0 ) {
            resolve(res.data.data || {})

            return;
          };

          //2.token 过期
          if( res.data.msg == 'token check fail' ) {
            //TODO 这里重定向 统一 token 过期页面
            this.redirectTokenPastPage();
            return;
          };
          //3.异常状态
          reject(res.data.msg || '系统错误') ;
        })
        .catch((e) => {
          let msg = e + ''
          if (msg.indexOf('timeout') > -1) {
            reject('网络超时,请稍后重试')
            return
          }
          reject(e || '系统错误')
        })
    })
  }
  // 暂时所有的请求 都用post get请求 暂时没有处理逻辑 如果之后需要 再加
  get(path) {
    return new Promise((resolve, reject) => {
      this.instance.get(path)
        .then((res) => {
          if (res.data.status === 'SUCCESS') {
            resolve(res.data.returnData || {})
            return
          }
          reject(res.message || '系统错误')
        })
        .catch((e) => {
          let msg = e + '';
          if (msg.indexOf('timeout') > -1) {
            reject('网络超时,请稍后重试')
            return;
          }
          reject(e || '系统错误')
        })
    })
  }

  getWeiXin(path) {
    return new Promise((resolve, reject) => {
      this.instance.get(path)
        .then((res) => {
          if (res.status === '200') {
            console.log('res2==>', res.data)
            resolve(res.data || {})
            return
          }
          reject(res.statusText || '系统错误')
        })
        .catch((e) => {
          let msg = e + ''
          if (msg.indexOf('timeout') > -1) {
            reject('网络超时,请稍后重试')
            return
          }
          reject(e || '系统错误')
        })
    })
  }

  postWeiXin(path, params) {
    return new Promise((resolve, reject) => {
      this.instance.post(path, {...params}, {headers: {}})
        .then((res) => {
          if (res.status === '200') {
            console.log('res2==>', res.data);
            resolve(res.data || {});
            return
          }
          reject(res.statusText || '系统错误');
        })
        .catch((e) => {
          let msg = e + ''
          if (msg.indexOf('timeout') > -1) {
            reject('网络超时,请稍后重试')
            return;
          }
          ;
          reject(e || '系统错误');
        })
    })
  }

  // 这里只是用来写测试掉接口用的
  testPost(path, params, {success, error}) {
    success && success()
  }
}

let axiosIns = new Axios({})
export default axiosIns
