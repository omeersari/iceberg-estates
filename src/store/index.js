import Vue from "vue";
import Vuex from "vuex";
import api from "../api/service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appointments: [],
    len: "",
    offset: "",
    showMenu: false,
    agents: [],
  },
  getters: {
    Appointments: (state) => state.appointments,
    Len: (state) => state.len,
    Offset: (state) => state.offset,
    ShowMenu: (state) => state.showMenu,
    Agents: (state) => state.agents,
  },
  mutations: {
    GET_APPOINTMENTS(state, payload) {
      state.appointments = payload.records;
      state.offset = payload.offset;
      state.len = state.appointments.length;
    },
    VIEW_MORE(state, payload) {
      state.appointments = [...state.appointments, ...payload.records];
      if (payload.offset) {
        state.offset = payload.offset;
      } else state.offset = "";
      state.len = state.appointments.length;
    },
    SORT_BY_DATE(state, payload) {
      state.appointments = payload.records;
      if (payload.offset) {
        state.offset = payload.offset;
      } else state.offset = "";
      state.len = state.appointments.length;
    },
    SHOW_MENU(state, bool) {
      state.showMenu = bool;
    },
    GET_AGENTS(state, payload) {
      state.agents = payload.records;
    },
  },
  actions: {
    async getAppointments({ commit }) {
      const response = await api.getAppointments();
      commit("GET_APPOINTMENTS", response);
    },
    async viewMore({ commit }, data) {
      const response = await api.viewMore(data);
      commit("VIEW_MORE", response);
    },
    async sortbyDate({ commit }, data) {
      const response = await api.sortDates(data);
      commit("SORT_BY_DATE", response);
    },
    showMenu({ commit }, bool) {
      commit("SHOW_MENU", bool);
    },
    async getAgents({ commit }) {
      const response = await api.getAgents();
      commit("GET_AGENTS", response);
    },
  },
  modules: {},
});
