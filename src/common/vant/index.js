import Vue from 'vue'
import 'vant/lib/index.css';
import {
  Swipe,
  SwipeItem,
  Toast,
  Field,
  Cell,
  CellGroup,
  Popup,
  DatetimePicker,
  List,
  SwipeCell,
  Button,
  Rate,
  Dialog,
  Loading,
  Picker,
  ImagePreview,
} from 'vant';
import VueKeepScrollPosition from 'vue-keep-scroll-position';
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(VueKeepScrollPosition);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Field);
Vue.use(Cell).use(CellGroup);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(List);
Vue.use(SwipeCell); //滑动单元格
Vue.use(Button);
Vue.use(Rate);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Picker);
Vue.use(ImagePreview);
Vue.prototype.$imagePreview = ImagePreview;
Vue.prototype.$toast = Toast;
Vue.prototype.$loading = (param) => {
  if (!param) {
    Toast.loading({duration: 0, forbidClick: true, message: "加载中..."});
    return;
  }
  ;
  Toast.loading({...param, duration: 0, forbidClick: true});
};
Vue.prototype.$clear = Toast.clear;
Vue.prototype.$dialog = Dialog;
