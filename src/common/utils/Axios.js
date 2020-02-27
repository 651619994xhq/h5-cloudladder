import axios from 'axios';
import store from '@/store';
import Router from '@/router'; //引入router模块
const baseURL = process.env.BASE_URL;
import Vue from 'vue';

class Axios {
    constructor (props) {
        this.instance = axios.create({
            // baseURL:store.state.apiGateway?store.state.apiGateway:baseURL,  //这里使用传过来的网关
            baseURL,
            timeout: 60000,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'Content-Type, Scope-Authorization',
                'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
                // 'Scope-Authorization':"", //这里使用传过来的token
                // appName,
                // 'x-app-code': appName,
                ...props
            }
        })
    }

    updateProps (props) {
        this.instance.defaults.headers = {...this.instance.defaults.headers, ...props}
    }
    post (path, params) {
        var self=this;
        return new Promise((resolve, reject)=>{
           console.log('store==>',store);
           let token=store.state.token?store.state.token:'';
            this.instance.post(path,{...params,token},{headers:{}})
              .then((res)=>{
                  console.log('res==>',res);
                  if(res.data.status=='SUCCESS'){
                        resolve(res.data.returnData||{});
                        return;
                  };
                  let $status=res.data.status;
                  if($status==9999){
                    store.commit('CLEAR_TOKEN');
                    return;
                  }

                  reject(res.data.message||'系统错误');

              })
              .catch((e)=> {
                  let msg=e+'';
                  if( msg.indexOf('timeout') > -1){
                      reject('网络超时,请稍后重试');
                      return;
                  };
                  reject(e||'系统错误');
              })
        });

    }

    //暂时所有的请求 都用post get请求 暂时没有处理逻辑 如果之后需要 再加
    get (path) {
      return new Promise((resolve, reject)=>{
        this.instance.get(path)
          .then((res)=>{
            if(res.data.status=='SUCCESS'){
              resolve(res.data.returnData||{});
              return;
            };
            reject(res.message||'系统错误');
          })
          .catch((e)=> {
            let msg=e+'';
            if( msg.indexOf('timeout') > -1){
              reject('网络超时,请稍后重试');
              return;
            };
            reject(e||'系统错误');
          })
      })

    }
    getWeiXin (path) {
      return new Promise((resolve, reject)=>{
        this.instance.get(path)
          .then((res)=>{
            if(res.status=='200'){
              console.log('res2==>',res.data);
              resolve(res.data||{});
              return;
            };
            reject(res.statusText||'系统错误');
          })
          .catch((e)=> {
            let msg=e+'';
            if( msg.indexOf('timeout') > -1){
              reject('网络超时,请稍后重试');
              return;
            };
            reject(e||'系统错误');
          })
      })

    }

  postWeiXin (path, params) {
    var self=this;
    return new Promise((resolve, reject)=>{
      this.instance.post(path,{...params},{headers:{}})
        .then((res)=>{
          if(res.status=='200'){
            console.log('res2==>',res.data);
            resolve(res.data||{});
            return;
          };
          reject(res.statusText||'系统错误');

        })
        .catch((e)=> {
          let msg=e+'';
          if( msg.indexOf('timeout') > -1){
            reject('网络超时,请稍后重试');
            return;
          };
          reject(e||'系统错误');
        })
    });

  }
    //这里只是用来写测试掉接口用的
    testPost (path,params, {success, error}) {
        success && success()
    }

}
let axiosIns = new Axios({})
export default axiosIns
