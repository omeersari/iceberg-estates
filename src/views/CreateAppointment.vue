<template>
  <div class="app-form">
    <div class="form">
      <h2>Create application</h2>
      <form class="application-form" action="">
      <def-input :type="'text'" :placeholder="'Post Code'" />
      <div class="user-input">
        <label for="">Date</label>
      <vc-date-picker class="inline-block h-full" v-model="date" mode="dateTime" is24hr :minute-increment="5">
        <template v-slot="{ inputValue, inputEvents }">
          <input
            placeholder="Pick a Date"
            class="bg-white border px-2 py-1 rounded"
            :value="inputValue"
            v-on="inputEvents"
          />
        </template>
      </vc-date-picker>
      </div>
      
      <def-input :type="'text'" :placeholder="'Name'" />
      <def-input :type="'text'" :placeholder="'Surname'" />
      <def-input :type="'email'" :placeholder="'Email'" />
      <def-input :type="'tel'" :placeholder="'Phone'" />
      <div class="user-input">
        <label for="">Agent</label>
      <select>
        <option value="" selected disabled>Please assign an agent</option>
        <option v-for="(agent, index) in Agents" :key="index" :value="agent.id"> {{agent['fields'].agent_name}} {{agent['fields'].agent_surname}}</option>
      </select>
      </div>
      <div class="user-input">
        <button>CREATE</button>
      </div>
    </form>
    </div>
    <div class="map">
      <GoogleMap @getDuration="getDuration" :travelMode="travelMode" />
      <select v-model="travelMode">
        <option value="DRIVING">DRIVING</option>
        <option value="TRANSIT">TRANSIT</option>
        <option value="BICYCLING">BICYCLING</option>
        <option value="WALKING">WALKING</option>
      </select>
      <div v-if="dist && dur">
        <p>Distance between two locations with {{travelMode}} is: {{dist}}</p>
        <p>Duration with {{travelMode}} is: {{dur}} </p>
      </div>
    </div>
  </div>
</template>

<script>
import DefInput from '../components/DefInput.vue'
import api from "../api/service";
import { mapActions, mapGetters } from 'vuex';
import moment from "moment";
import GoogleMap from '../components/GoogleMap.vue'

export default {
  components: {
    DefInput,
    GoogleMap
  },
  data() {
    return {
      moment,
      date: moment(new Date()).format("DD-MM-YYYY HH:mm"),
      api,
      dist: "",
      dur: "",
      travelMode: "DRIVING"
    };
  },
  created () {
    this.$store.dispatch('showMenu', false)
    this.getAgents()
  },
  methods: {
    ...mapActions(['getAgents']),
    getDuration(dist, dur) {
      this.dist = dist;
      this.dur = dur;
    }
  },
  computed: {
    ...mapGetters(['Agents'])
  }
};
</script>
