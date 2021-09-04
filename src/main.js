import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VCalendar from "v-calendar";
import Paginate from "vuejs-paginate";

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.component("paginate", Paginate);

Vue.use(VCalendar, {
  componentPrefix: "vc",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
