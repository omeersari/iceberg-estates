import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
  },
  {
    path: "/appointments",
    name: "Appointments",
    component: () =>
      import(
        /* webpackChunkName: "appointments" */ "../views/Appointments.vue"
      ),
  },
  {
    path: "/createappointment",
    name: "CreateAppointment",
    component: () =>
      import(
        /* webpackChunkName: "createappointment" */ "../views/CreateAppointment.vue"
      ),
  },
  {
    path: "/createcontact",
    name: "CreateContact",
    component: () =>
      import(/* webpackChunkName: "CreateContact" */ "../views/CreateContact.vue"),
  },
  {
    path: "/createagent",
    name: "CreateAgent",
    component: () =>
      import(/* webpackChunkName: "CreateAgent" */ "../views/CreateAgent.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
