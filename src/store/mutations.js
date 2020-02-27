import {setToken, removeToken,setBackAppUrl,removeBackAppUrl} from '../common/utils/localStorage';


export default {
  changeTransition(state, transitionName) {
    state.transitionName = transitionName
  },
  UPDATE_TOKEN(state, token) {

  },
  CLEAR_TOKEN(state) {

  },
  UPDATE_BACK_APP_URL(state,value){
    setBackAppUrl(value||'')
    state.backAppUrl=value||'';

  },
  CLEAR_BACK_APP_URL(state){
    removeBackAppUrl();
    state.backAppUrl='';
  }

}
