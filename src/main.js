import Vue from 'vue'
import App from './App.vue'
import "./styles/global.less"
import router from '@/router'
import store from '@/store'
import "./mock"

import "./eventBus";
import showMessage from '@/utils/showMessage'
// import vLoading from "@/directives/loading";
import vLoading from "@/directives/loading";
import vLazy from "@/directives/lazy";

store.dispatch('settings/fetchSettings')

Vue.prototype.$showMessage = showMessage
Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);

export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


// import * as API from './api/blog'
// API.getSingleBlog(4).then(res=>console.log(res))
// API.postComment({
//   nickname: "昵称",
// 	content: "评论内容，纯文本",
// 	blogId: 5
// }).then(res=>console.log(res))
// API.getComments(4).then(res=>console.log(res))
