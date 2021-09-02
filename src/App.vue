<template>
  <div id="app">
    <div>
      <side-bar />
    </div>
    <div class="main">
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
</style>>

