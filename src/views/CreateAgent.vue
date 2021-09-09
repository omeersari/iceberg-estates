<template>
  <div class="page">
    <form @submit.prevent="createAgent()" class="application-form">
      <div class="user-input">
        <my-label :label="'Name'" />
        <input type="text" v-model="agent_name" />
      </div>
      <div class="user-input">
        <my-label :label="'Surname'" />
        <input type="text" v-model="agent_surname" />
      </div>
      <button>Create Agent</button>
    </form>
    
  </div>
</template>


<script>
import MyLabel from "../components/MyLabel.vue";
import api from "../api/service"

export default {
    components: {
        MyLabel
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

      }
    }

    
}
</script>