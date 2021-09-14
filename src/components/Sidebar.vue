<template>
  <div class="sidebar-menu">
    <div class="hamburger-menu" @click="openMenu">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="logo">ICEBERG ESTATES</div>
    <div class="menu" :class="ShowMenu ? 'responsive-menu' : ''">
      <router-link class="menu-link" to="/dashboard">Dashboard</router-link>
      <router-link class="menu-link" to="/appointments"
        >Appointments</router-link
      >
      <router-link class="menu-link" to="/createappointment"
        >Create Appointment</router-link
      >
      <router-link class="menu-link" to="/createcontact"
        >Create Contact</router-link
      >
      <router-link class="menu-link" to="/createagent"
        >Create Agent</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      menuClicked: false,
    };
  },
  computed: {
    ...mapGetters(["ShowMenu"]),
  },
  methods: {
    ...mapActions(["showMenu"]),
    openMenu() {
      this.menuClicked = this.ShowMenu;
      this.menuClicked = !this.menuClicked;
      this.showMenu(this.menuClicked);
    },
  },
};
</script>
