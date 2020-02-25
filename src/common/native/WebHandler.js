
export class WebHandler {
  constructor (props) {
  }
  // 模拟原生协议跳转
  navigate (params, {success, error}) {
    console.log(JSON.stringify(params))
  }
  callWebHandler (handlerName, params, {success, error}) {
    let funcName = handlerName.split('.')
    if (funcName.length === 2) {
      this[funcName[1]](params, {success, error})
    } else {
      this[handlerName](params, {success, error})
    }
  }
}
