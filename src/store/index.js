import Vue from "vue";
import Vuex from "vuex";
import api from "../api/service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allAppointments: [],
    appointments: [],
    len: "",
    offset: "",
    showMenu: false,
    agents: [],
    contacts: [],
    agentsTimes: [],
  },
  getters: {
    AllAppointments: (state) => state.allAppointments,
    Appointments: (state) => state.appointments,
    Len: (state) => state.len,
    Offset: (state) => state.offset,
    ShowMenu: (state) => state.showMenu,
    Agents: (state) => state.agents,
    Contacts: (state) => state.contacts,
    AgentsTimes: (state) => state.agentsTimes
  },
  mutations: {
    GET_ALL_APPOINMENTS(state, payload) {
      state.allAppointments = payload.records
    },
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
    GET_CONTACTS(state, payload) {
      const flags = new Set()
      const newContacts = payload.records.filter(item => {
        if (flags.has(item["fields"].contact_phone)) {
          return false;
        }
        flags.add(item["fields"].contact_phone)
        return true;
      })
      state.contacts = newContacts;
    },
    AGENTS_TIME(state, payload) {
      if (state.allAppointments) {
        payload.records.forEach(element => {
          element['fields'].Appointments.forEach(appointment => {
            const app = state.allAppointments.find(el => el.id == appointment)
            const time = app['fields'].appointment_date
            state.agentsTimes.push(
              {
                agent_id : element.id,
                busyTime : time
              }
            )
          })
        });
      }
    }
  },
  actions: {
    async getAllAppointments({commit}) {
      const response = await api.getAllAppointments();
      commit("GET_ALL_APPOINMENTS", response)
    },
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
      commit("AGENTS_TIME", response)
    },
    async getContacts({commit}) {
      const response = await api.getContacts();
      commit("GET_CONTACTS", response)
    }
  },
  modules: {},
});
