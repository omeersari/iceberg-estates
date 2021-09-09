<template>
  <div class="homepage">
    <div class="login-card">
      <div class="logo">
        <p>ICEBERG ESTATES</p>
      </div>
      <div class="login-form">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button @click="gotoHomepage">LOGIN</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  methods: {
    gotoHomepage() {
      this.$router.push("/dashboard");
    },
  },
};
</script>
