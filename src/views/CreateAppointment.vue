<template>
  <div class="app-form">
    <application-form
      :agents="Agents"
      :contacts="Contacts"
      :postCode="postCode"
      @appCreated="appCreated"
      ref="form"
    />
    <p v-if="error" class="error">
        {{ error }}
    </p>
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
        Only show the destination point
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
      <div v-if="depTime && arrTime">
        Agent should leave office at {{ depTime }} and will be back at the
        office at {{ arrTime }}
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
import moment from "moment";

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
      error: "",
      depTime: "",
      arrTime: "",
    };
  },

  created() {
    this.$store.dispatch("showMenu", false);
    this.getAgents();
    this.getContacts();
    this.error = "";
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
      const res = await this.PostCodeApi.getNearestPostCode(marker);
      if (res.status == 200 && res.result) {
        this.postCode = res.result[0].postcode;
        this.error = "";
      } else {
        this.postCode = "";
        this.error = "Post Code not found. Please select another location";
      }
    },

    appCreated(data) {
      let appTime = data["fields"].appointment_date;
      const depTime = moment(appTime)
        .subtract(this.durSecond, "seconds")
        .toDate();
      const arrTime = moment(appTime)
        .add(1, "hours")
        .add(this.durSecond, "seconds")
        .toDate();
      this.depTime = moment(depTime).format("DD/MM/YYYY HH:mm");
      this.arrTime = moment(arrTime).format("DD/MM/YYYY HH:mm");
      const result = this.$control.controlTime(data, this.AgentsTimes);
      if (result) {
        this.AgentsTimes.push({
          agent_id: data["fields"].agent_id[0],
          busyTime: data["fields"].appointment_date,
          depTime,
          arrTime,
        });
        this.$refs.form.resetForm();
        this.postCode = "";
      } else {
        this.error =
          "This agent is not avaliable during this time. Please select another date or time";
      }
    },
  },
  computed: {
    ...mapGetters(["Agents", "Contacts", "AgentsTimes"]),
  },
};
</script>
