import {setAccessToken, removeAccessToken,setBackAppUrl,removeBackAppUrl,setApiGateway,removeApiGateway} from '../common/utils/localStorage';


export default {
  changeTransition(state, transitionName) {
    state.transitionName = transitionName
  },
  SET_ACCESS_TOKEN(state, value) {
    setAccessToken(value||'')
    state.accessToken=value||'';

  },
  CLEAR_ACCESS_TOKEN(state) {
    removeAccessToken();
    state.accessToken='';
  },
  SET_BACK_APP_URL(state,value){
    setBackAppUrl(value||'')
    state.backAppUrl=value||'';

  },
  CLEAR_BACK_APP_URL(state){
    removeBackAppUrl();
    state.backAppUrl='';
  },
  SET_API_GATEWAY(state,value){
    setApiGateway(value||'')
    state.apiGateway=value||'';
  },
  CLEAR_API_GATEWAY(state){
    removeApiGateway();
    state.apiGateway='';
  }

}
