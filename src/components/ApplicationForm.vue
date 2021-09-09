<template>
  <div class="form">
    <h2>Create application</h2>
    <form class="application-form" @submit.prevent="createApplication">
      <div class="user-input">
        <my-label :label="'Post Code'" />
        <input type="text" disabled v-model="postCode"/>
      </div>
      <div class="user-input">
        <my-label :label="'Date'" />
        <vc-date-picker
          class="inline-block h-full"
          v-model="dataForm.date"
          mode="dateTime"
          is24hr
          :minute-increment="5"
          :min-date='new Date()'
        >
          <template v-slot="{ inputValue, inputEvents }">
            <input
              placeholder="Pick a Date"
              class="bg-white border px-2 py-1 rounded"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </vc-date-picker>
      </div>
      <div class="user-input">
        <my-label :label="'Contact'" />
        <select v-model="dataForm.contact">
          <option value="" selected disabled>Please select a contact</option>
          <option
            v-for="(contact, index) in contacts"
            :key="index"
            :value="contact.id"
          >
            {{ contact["fields"].contact_name }} {{ contact["fields"].contact_surname }}
          </option>
        </select>
        <router-link to="/createcontact" class="minor-link"><i class="fas fa-plus"></i> Create a new contact</router-link>
      </div>
      <div class="user-input">
        <my-label :label="'Agent'" />
        <select v-model="dataForm.agent">
          <option value="" selected disabled>Please assign an agent</option>
          <option
            v-for="(agent, index) in agents"
            :key="index"
            :value="agent.id"
          >
            {{ agent["fields"].agent_name }} {{ agent["fields"].agent_surname }}
          </option>
        </select>
        <router-link to="/createagent" class="minor-link"><i class="fas fa-plus"></i> Create a new agent</router-link>
      </div>
      <div class="user-input">
        <button>CREATE</button>
      </div>
    </form>
  </div>
</template>

<script>
import MyLabel from "./MyLabel.vue";
import api from "../api/service";
import moment from "moment";


export default {
  components: {
    MyLabel,
  },
  props: {
    agents: {
      type: Array,
    },
    postCode: {
        type: String,
        required: false,
    },
    contacts: {
        type: Array,
    }
  },
  data() {
    return {
      moment,
      api,
      dataForm: {
        date: moment(new Date()).format("DD-MM-YYYY HH:mm"),
        contact: "",
        agent: "",
      },
    };
  },
  methods: {
    async createApplication() {
      const data = {
        fields: {
          appointment_date: this.dataForm.date,
          appointment_postcode: this.postCode,
          contact_id: [this.dataForm.contact],
          agent_id: [this.dataForm.agent]
        }
      }
      console.log(data)
      this.resetForm()
      this.$emit('appCreated')
      //await this.api.createAppointment(data)
    },
     resetForm () {
      this.dataForm = {
        date: "",
        contact: "",
        agent: "", 
      }
    }
  }
};
</script>
