<template>
  <div class="form">
    <h2>Create application</h2>
    <form class="application-form" action="">
      <def-input :type="'text'" :placeholder="'Post Code'" :isDisabled="true" />
      <div class="user-input">
        <label for="">Date</label>
        <vc-date-picker
          class="inline-block h-full"
          v-model="date"
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

      <def-input :type="'text'" :placeholder="'Name'" />
      <def-input :type="'text'" :placeholder="'Surname'" />
      <def-input :type="'email'" :placeholder="'Email'" />
      <def-input :type="'tel'" :placeholder="'Phone'" />
      <div class="user-input">
        <label for="">Agent</label>
        <select>
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
import DefInput from "../components/DefInput.vue";
import api from "../api/service";
import moment from "moment";

export default {
  components: {
    DefInput,
  },
  props: {
    agents: {
      type: Array,
    },
  },
  data() {
    return {
      moment,
      date: moment(new Date()).format("DD-MM-YYYY HH:mm"),
      api,
      dataForm: {
        postCode: "",
        date: "",
        name: "",
        surname: "",
        email: "",
        phone: "",
        agent: "",
      },
    };
  },
};
</script>
