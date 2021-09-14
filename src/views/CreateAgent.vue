<template>
  <div class="page">
    <h2>Create Agent</h2>
    <form class="application-form">
      <div class="user-input">
        <my-label :label="'Name'" />
        <input type="text" v-model="agent_name" class="primary" />
      </div>
      <div class="user-input">
        <my-label :label="'Surname'" />
        <input type="text" v-model="agent_surname" class="primary" />
      </div>
      <submit
        :submit="createAgent"
        :buttonText="'Create Agent'"
        :className="'secondary'"
      />
    </form>
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>


<script>
import MyLabel from "../components/MyLabel.vue";
import api from "../api/service";
import Submit from "../components/Submit.vue";

export default {
  components: {
    MyLabel,
    Submit,
  },
  data() {
    return {
      api,
      agent_name: "",
      agent_surname: "",
    };
  },
  computed: {
    error() {
      return this.$store.getters.Error;
    },
  },
  created () {
    this.$store.dispatch("showMenu", false);
  },
  methods: {
    async createAgent() {
      if (this.agent_name && this.agent_surname) {
        this.$store.dispatch("createError", "");
        const data = {
          fields: {
            agent_name: this.agent_name,
            agent_surname: this.agent_surname,
          },
        };
        await this.api.createAgent(data);
        this.resetForm();
      } else {
        this.$store.dispatch(
          "createError",
          "Please make sure all fields are filled"
        );
      }
    },
    resetForm() {
      (this.agent_name = ""), (this.agent_surname = "");
    },
  },
  beforeDestroy() {
    this.$store.dispatch('createError', '')
  }
};
</script>