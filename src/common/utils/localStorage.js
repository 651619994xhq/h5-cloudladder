import Cookies from 'js-cookie'
const UserToken='User-Token'; //token
const backAppUrl='Back-App-Url'; //app url
export function getToken(){
  if(window.localStorage){
    return  localStorage.getItem(UserToken)||'';
  }else{
    return  Cookies.get(UserToken)||'';
  }
}
export function setToken(token){
  if(window.localStorage){
    localStorage.setItem(UserToken,token)
  }else{
    Cookies.set(UserToken, token)
  }
}
export function removeToken(){
  if(window.localStorage){
    localStorage.removeItem(UserToken)
  }else{
    Cookies.remove(UserToken)
  }
}

export function getBackAppUrl(){
  if(window.localStorage){
    return  localStorage.getItem(backAppUrl)||'';
  }else{
    return  Cookies.get(backAppUrl)||'';
  }
}
export function setBackAppUrl(value){
  if(window.localStorage){
    localStorage.setItem(backAppUrl,value)
  }else{
    Cookies.set(backAppUrl, value)
  }
}
export function removeBackAppUrl(){
  if(window.localStorage){
    localStorage.removeItem(backAppUrl)
  }else{
    Cookies.remove(backAppUrl)
  }
}
