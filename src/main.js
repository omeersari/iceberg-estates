import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VCalendar from "v-calendar";
import Paginate from "vuejs-paginate";
import * as VueGoogleMaps from "vue2-google-maps";
import { control } from "./plugins/controlAgentTime";
import moment from "moment-timezone";
import Notifications from "vue-notification";

Vue.config.productionTip = false;

moment.tz.setDefault("UTC");

Vue.prototype.$control = control;
Vue.component("paginate", Paginate);

Vue.use(VCalendar, {
  componentPrefix: "vc",
});

Vue.use(Notifications);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCg3-__IKh_PtnT7zsS6KIyJP4cguyZt6o",
    libraries: "places",
    region: "GB",
    language: "en",
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
