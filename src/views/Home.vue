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
  async created() {
    const res = await this.$http.post(process.env.VUE_APP_API, {
      fields: {
        appointment_date: "2020-10-14T00:03:00.000Z",
      },
    });
    console.log(res.data);
  },
  methods: {
    gotoHomepage() {
      this.$router.push("/dashboard");
    },
  },
};
</script>
