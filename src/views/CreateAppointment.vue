<template>
  <div class="app-form">
    <application-form :agents="Agents" />
    <div class="map">
      <GoogleMap
        @getDuration="getDuration"
        :travelMode="travelMode"
        @markerSelected="showTravelMode = true"
        :showMarker="showMarker"
        @getDestination="getDestination"
      />
      <div>
        <input type="checkbox" v-model="showMarker" /> Only show the destination
        point
      </div>
      <select v-if="showTravelMode" v-model="travelMode">
        <option value="DRIVING">DRIVING</option>
        <option value="TRANSIT">TRANSIT</option>
        <option value="BICYCLING">BICYCLING</option>
        <option value="WALKING">WALKING</option>
      </select>
      <div v-if="dist && dur">
        <p>
          Distance between two locations with {{ travelMode }} is: {{ dist }}
        </p>
        <p>Duration with {{ travelMode }} is: {{ dur }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ApplicationForm from "../components/ApplicationForm.vue";
import { mapActions, mapGetters } from "vuex";
import GoogleMap from "../components/GoogleMap.vue";
import api from "../api/service";

export default {
  components: {
    GoogleMap,
    ApplicationForm,
  },
  data() {
    return {
      api,
      showMarker: false,
      dist: "",
      dur: "",
      durSecond: "",
      showTravelMode: false,
      travelMode: "DRIVING",
      destination: "",
    };
  },
  created() {
    this.$store.dispatch("showMenu", false);
    this.getAgents();
  },
  methods: {
    ...mapActions(["getAgents"]),
    getDuration(dist, dur) {
      this.dist = dist;
      this.dur = dur["text"];
      this.durSecond = dur["value"];
    },
    getDestination(marker) {
      this.destination = marker;
    },
  },
  computed: {
    ...mapGetters(["Agents"]),
  },
};
</script>
