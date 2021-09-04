<template>
  <div id="app">
    <div v-if="this.$route.path != '/'">
      <side-bar />
    </div>
    <div class="main" :class="[this.$route.path == '/' ? 'all-screen' : '']">
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script>
import SideBar from "./components/Sidebar.vue";
export default {
  components: {
    SideBar,
  },
};
</script>

<style lang="scss">
@import "./assets/scss/app.scss";
</style>
>
