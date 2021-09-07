import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VCalendar from "v-calendar";
import Paginate from "vuejs-paginate";
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.component("paginate", Paginate);

Vue.use(VCalendar, {
  componentPrefix: "vc",
});

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCg3-__IKh_PtnT7zsS6KIyJP4cguyZt6o',
    libraries: 'places',
    region: "GB",
    language: "en"
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
