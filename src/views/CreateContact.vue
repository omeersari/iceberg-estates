<template>
  <div class="page">
    <h2>Create Contact</h2>
    <form class="application-form">
      <div class="user-input">
        <my-label :label="'Name'" />
        <input type="text" v-model="contactForm.name" class="primary" />
      </div>
      <div class="user-input">
        <my-label :label="'Surname'" />
        <input type="text" v-model="contactForm.surname" class="primary" />
      </div>
      <div class="user-input">
        <my-label :label="'Phone'" />
        <input type="tel" v-model="contactForm.phone" class="primary" />
      </div>
      <div class="user-input">
        <my-label :label="'Email'" />
        <input type="email" v-model="contactForm.email" class="primary" />
      </div>
      <submit
        :submit="createContact"
        :buttonText="'Create Contact'"
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
      contactForm: {
        name: "",
        surname: "",
        phone: "",
        email: "",
      },
    };
  },
  created () {
    this.$store.dispatch("showMenu", false);
  },
  computed: {
    error() {
      return this.$store.getters.Error;
    },
  },
  methods: {
    async createContact() {
      if (
        this.contactForm.name &&
        this.contactForm.surname &&
        this.contactForm.email &&
        this.contactForm.phone
      ) {
        this.$store.dispatch("createError", "");
        const data = {
          fields: {
            contact_name: this.contactForm.name,
            contact_surname: this.contactForm.surname,
            contact_email: this.contactForm.email,
            contact_phone: this.contactForm.phone,
          },
        };
        await this.api.createContact(data);
        this.resetForm();
      } else {
        this.$store.dispatch(
          "createError",
          "Please make sure all fields are filled"
        );
      }
    },
    resetForm() {
      this.contactForm = {
        name: "",
        surname: "",
        phone: "",
        email: "",
      };
    },
  },
  beforeDestroy() {
    this.$store.dispatch('createError', '')
  }
};
</script>