import Vue from "vue";
import Vuex from "vuex";
import api from "../api/service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appointments: [],
    len: "",
  },
  getters: {
    Appointments: (state) => state.appointments,
    Len: (state) => state.len,
  },
  mutations: {
    GET_APPOINTMENTS(state, payload) {
      state.appointments = payload;
      state.len = payload.length;
    },
    VIEW_MORE(state, payload) {
      state.appointments = payload;
      state.len = payload.length;
    },
    SORT_BY_DATE(state, payload) {
      state.appointments = payload;
      state.len = payload.length;
    }
  },
  actions: {
    async getAppointments({ commit }) {
      const response = await api.getAppointments();
      commit("GET_APPOINTMENTS", response.records);
    },
    async viewMore({ commit }, data) {
      const response = await api.viewMore(data);
      commit("VIEW_MORE", response.records);
    },
    async sortbyDate({commit}, data) {
      const response = await api.sortDates(data)
      commit("SORT_BY_DATE", response.records)
    }
  },
  modules: {},
});
