<template>
  <div class="page">
    <form class="application-form">
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
      <submit :submit="createContact" :buttonText="'Create Contact'" />
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
                    contact_name : this.contactForm.name,
                    contact_surname: this.contactForm.surname,
                    contact_email: this.contactForm.email,
                    contact_phone: this.contactForm.phone
                }
            }
            //await this.api.createContact(data) 
            console.log(data)
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