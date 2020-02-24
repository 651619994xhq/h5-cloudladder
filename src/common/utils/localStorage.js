import Cookies from 'js-cookie'
const UserToken='User-Token'; //token
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
