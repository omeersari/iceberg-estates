import Vue from "vue";
import Vuex from "vuex";
import api from "../api/service";
import PostCodeApi from "../api/postcodes";
import createPersistedState from 'vuex-persistedstate' // create a local storage

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
    error: "",
    updatingAdress: null,
    loading: false,
  },
  getters: {
    AllAppointments: (state) => state.allAppointments,
    Appointments: (state) => state.appointments,
    Len: (state) => state.len,
    Offset: (state) => state.offset,
    ShowMenu: (state) => state.showMenu,
    Agents: (state) => state.agents,
    Contacts: (state) => state.contacts,
    AgentsTimes: (state) => state.agentsTimes,
    Error: (state) => state.error,
    UpdatingAdress: (state) => state.updatingAdress
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
    AGENTS_TIME(state) {
      if (state.allAppointments) {
        state.allAppointments.forEach(item => {
          const myObj = state.agentsTimes.find(obj => obj.id == item.id)
          if (!myObj) {
            state.agentsTimes.push(
              {
                id: item.id,
                agent_id : item["fields"].agent_id[0],
                busyTime : item["fields"].appointment_date
              }
            )
          }
          
        })
      }
    },
    MAKE_ERROR(state, payload) {
      state.error = payload
    },
    GET_UPDATE_ADRESS(state, payload) {
      if (payload.status == 200) {
        const data = payload.result
      state.updatingAdress = {
        lat: data.latitude,
        lng: data.longitude
      }
      }
        
    },
    CLEAR_UPDATE_ADDRESS(state) {
      state.updatingAdress = null
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    DELETE_OBJ(state, index) {
      state.agentsTimes.splice(index, 1)
    }
  },
  actions: {
    async getAllAppointments({commit}) {
      const response = await api.getAllAppointments();
      commit("GET_ALL_APPOINMENTS", response)
      commit("AGENTS_TIME")
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
    },
    async getContacts({commit}) {
      const response = await api.getContacts();
      commit("GET_CONTACTS", response)
    },
    async getUpdatingAdress({commit}, postcode) {
        try {
          const response = await PostCodeApi.getPostCode(postcode)
          commit("GET_UPDATE_ADRESS", response) 
        } catch (error) {
          commit("GET_UPDATE_ADRESS", error) 
        }
        
    },
    clearUpdateAddress({commit}) {
      commit("CLEAR_UPDATE_ADDRESS")
    },
    createError({commit}, err) {
      commit("MAKE_ERROR", err )
    },
    setLoading({commit}, newVal) {
      commit("SET_LOADING", newVal)
    },
    deleteObj({commit}, index) {
      commit("DELETE_OBJ", index)
    }
  },
  plugins: [createPersistedState()]
});
