<template>
  <div class="page">
    <form @submit.prevent="createContact()" class="application-form">
      <div class="user-input">
        <my-label :label="'Name'" />
        <input type="text" v-model="contactForm.name" />
      </div>
      <div class="user-input">
        <my-label :label="'Surname'" />
        <input type="text" v-model="contactForm.surname" />
      </div>
      <div class="user-input">
        <my-label :label="'Phone'" />
        <input type="tel" v-model="contactForm.phone" />
      </div>
      <div class="user-input">
        <my-label :label="'Email'" />
        <input type="email" v-model="contactForm.email" />
      </div>
      <button> Create Contact</button>
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
            contactForm: {
                name: "",
                surname: "",
                phone: "",
                email: "",
            }
        }
    },
    methods: {
        async createContact() {
            const data = {
                fields: {
                    contact_name : "",
                    contacT_surname: "",
                    contact_email: "",
                    contact_phone: ""
                }
            }
            await this.api.createContact(data) 
            this.resetForm()
        },
        resetForm() {
            this.contactForm = {
                name: "",
                surname: "",
                phone: "",
                email: "",
            }
        }
    }

    
}
</script>