import Cookies from 'js-cookie'
const accessToken='Access-Token'; //token
const backAppUrl='Back-App-Url'; //app url
const apiGateway='Api-Gateway'
export function getAccessToken(){
  if(window.localStorage){
    return  localStorage.getItem(accessToken)||'';
  }else{
    return  Cookies.get(accessToken)||'';
  }
}
export function setAccessToken(value){
  if(window.localStorage){
    localStorage.setItem(accessToken,value)
  }else{
    Cookies.set(accessToken, value)
  }
}
export function removeAccessToken(){
  if(window.localStorage){
    localStorage.removeItem(accessToken)
  }else{
    Cookies.remove(accessToken)
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

export function getApiGateway(){
  if(window.localStorage){
    return  localStorage.getItem(apiGateway)||'';
  }else{
    return  Cookies.get(apiGateway)||'';
  }
}
export function setApiGateway(value){
  if(window.localStorage){
    localStorage.setItem(apiGateway,value)
  }else{
    Cookies.set(apiGateway, value)
  }
}
export function removeApiGateway(){
  if(window.localStorage){
    localStorage.removeItem(apiGateway)
  }else{
    Cookies.remove(apiGateway)
  }
}
