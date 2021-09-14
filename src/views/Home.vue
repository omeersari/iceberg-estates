<template>
  <div class="homepage">
    <div class="login-card">
      <div class="logo">
        <p class="f-center">ICEBERG ESTATES</p>
      </div>
      <div class="login-form">
        <input class="primary" type="text" placeholder="Username" v-model="form.username" />
        <input class="primary" type="password" placeholder="Password" v-model.number="form.password"/>
        <div class="f-center">
          <button class="secondary" @click="gotoHomepage">LOGIN</button>
        </div>
      </div>
      <div class="error mt-20" v-if="this.$store.getters.Error">
      {{this.$store.getters.Error}}
    </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      form: {
        username: "",
        password: null,
      }
    }
  },
  methods: {
    gotoHomepage() {
      if (this.form.username == this.$store.getters.Account.username && this.form.password == this.$store.getters.Account.password) {
        this.$store.dispatch('createError', '')
        this.$router.push("/dashboard");
      } else {
        this.$store.dispatch('createError', 'Username or password is incorrect.')
      }
    },
  },
  created() {
    this.$store.dispatch('createError', '')
  }
};
</script>

