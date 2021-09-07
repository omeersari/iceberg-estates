<template>
  <div class="app-form">
    <application-form :agents="Agents" :contacts="Contacts" :postCode="postCode" />
    <div class="map">
      <GoogleMap
        @getDuration="getDuration"
        :travelMode="travelMode"
        @markerSelected="showTravelMode = true"
        :showMarker="showMarker"
        @getDestination="getDestination"
      />
      <div>
        <input type="checkbox" v-model="showMarker" /> 
        Only show the destination
        point
      </div>
      <select v-if="showTravelMode" v-model="travelMode">
        <option value="DRIVING">DRIVING</option>
        <option value="TRANSIT">TRANSIT</option>
        <option value="BICYCLING">BICYCLING</option>
        <option value="WALKING">WALKING</option>
      </select>
      <div v-if="dist && dur" class="desc">
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
import PostCodeApi from "../api/postcodes";

export default {
  components: {
    GoogleMap,
    ApplicationForm,
  },
  data() {
    return {
      api,
      PostCodeApi,
      showMarker: false,
      dist: "",
      dur: "",
      durSecond: "",
      showTravelMode: false,
      travelMode: "DRIVING",
      destination: "",
      postCode: "",
      error: ""
    };
  },
  created() {
    this.$store.dispatch("showMenu", false);
    this.getAgents();
    this.getContacts();
  },
  methods: {
    ...mapActions(["getAgents", "getContacts"]),
    getDuration(dist, dur) {
      this.dist = dist;
      this.dur = dur["text"];
      this.durSecond = dur["value"];
    },
    async getDestination(marker) {
      this.destination = marker;
      const res = await this.PostCodeApi.getNearestPostCode(marker)
      if (res.status == 200) {
        this.postCode = res.result[0].postcode
      }else {
        this.error = "Post Code not found. Please select another location"
      }
    },
  },
  computed: {
    ...mapGetters(["Agents", "Contacts"]),
  },
};
</script>
