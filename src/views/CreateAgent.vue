<template>
  <div class="page">
    <form class="application-form">
      <div class="user-input">
        <my-label :label="'Name'" />
        <input type="text" v-model="agent_name" />
      </div>
      <div class="user-input">
        <my-label :label="'Surname'" />
        <input type="text" v-model="agent_surname" />
      </div>
      <submit :submit="createAgent" :buttonText="'Create Agent'" />
    </form>
    
  </div>
</template>


<script>
import MyLabel from "../components/MyLabel.vue";
import api from "../api/service"
import Submit from "../components/Submit.vue"

export default {
    components: {
        MyLabel,
        Submit
    },
    data () {
      return {
          api,
          agent_name: "",
          agent_surname: "",

      }
    },
    methods: {
      async createAgent() {
        const data = {
          fields: {
            agent_name : this.agent_name,
            agent_surname: this.agent_surname
          }
        }
        await this.api.createAgent(data)
        this.resetForm()
      },
      resetForm() {
        this.agent_name = "",
        this.agent_surname = ""
      }
    }

    
}
</script>