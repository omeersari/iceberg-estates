<template>
  <div class="form">
    <h2>Create application</h2>
    <form class="application-form" @submit.prevent="createApplication">
      <div class="user-input">
        <my-label :label="'Post Code'" />
        <input type="text" disabled v-model="dataForm.postCode" />
      </div>
      <div class="user-input">
        <my-label :label="'Date'" />
        <vc-date-picker
          class="inline-block h-full"
          v-model="dataForm.date"
          mode="dateTime"
          is24hr
          :minute-increment="5"
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
        <my-label :label="'Name'" />
        <input type="text" v-model="dataForm.name" />
      </div>
      <div class="user-input">
        <my-label :label="'Surname'" />
        <input type="text" v-model="dataForm.surname" />
      </div>
      <div class="user-input">
        <my-label :label="'Email'" />
        <input type="email" v-model="dataForm.email" />
      </div>
      <div class="user-input">
        <my-label :label="'Phone'" />
        <input type="tel" v-model="dataForm.phone" />
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
  },
  data() {
    return {
      moment,
      api,
      dataForm: {
        postCode: "",
        date: moment(new Date()).format("DD-MM-YYYY HH:mm"),
        name: "",
        surname: "",
        email: "",
        phone: "",
        agent: "",
      },
    };
  },
  methods: {
    createApplication() {
      console.log(this.dataForm);
    },
  },
};
</script>
