import {setToken, removeToken} from '../common/utils/localStorage';


export default {
  changeTransition(state, transitionName) {
    state.transitionName = transitionName
  },
  UPDATE_TOKEN(state, token) {
    setToken(token)
    state.token = token;
  },
  CLEAR_TOKEN(state) {
    removeToken();
    state.token = '';
    const h5BaseURL = process.env.H5_BASE_URL;
    // window.location.reload();
    window.location.href=`${h5BaseURL}/#/enterport?time=${new Date().getTime()}`;
  },

}
