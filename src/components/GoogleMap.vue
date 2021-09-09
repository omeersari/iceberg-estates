<template>
  <div>
    <div>
      <h2>Please Select The Place</h2>
    </div>
    <GmapMap
      ref="map"
      :center="position"
      :zoom="18"
      class="google-map"
      style="width: 100%; height: 400px"
      @click="addMarker"
    >
      <GmapMarker
        v-if="!newMarker"
        :position="position"
        :clickable="true"
        @click="center = position"
      />
      <!-- Directions Renderer Also mark the map but it shows where the agent can go-->
      <!-- Our marker marks the exact location on the map. If wanted as disabled we can easily comment the line below-->
      <GmapMarker
        v-if="newMarker && !showMarker"
        :position="newMarker"
        :clickable="true"
        @click="center = newMarker"
      />
      <DirectionsRenderer
        :origin="position"
        :destination="newMarker"
        :travelMode="travelMode"
      />
    </GmapMap>
    <button @click="resetMap()">reset map</button>
  </div>
</template>

<script>
import PostCodeApi from "../api/postcodes";
import { gmapApi } from "vue2-google-maps";
import DirectionsRenderer from "../components/DirectionsRenderer.vue";

export default {
  name: "GoogleMap",
  data() {
    return {
      PostCodeApi,
      position: { lat: 0, lng: 0 },
      newMarker: null,
      distance: "",
      duration: "",
    };
  },
  components: {
    DirectionsRenderer,
  },
  computed: {
    google: gmapApi,
    
  },
  props: {
    travelMode: {
      type: String,
      default: "DRIVING",
      required: false,
    },
    showMarker: {
      type: Boolean,
      required: false,
    },
  },
  async created() {
    this.showOurLocation()
    
  },
  methods: {
    async showOurLocation() {
      const res = await this.PostCodeApi.getPostCode("cm27pj");
      this.position["lat"] = res.result.latitude;
      this.position["lng"] = res.result.longitude;
    },
    addMarker(event) {
      const marker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.newMarker = marker;
      this.$emit("markerSelected", true);
      this.$emit("getDestination", marker);
      this.calculateDistance();
    },
    async calculateDistance() {
      const service = new this.google.maps.DistanceMatrixService();
      const res = await service.getDistanceMatrix({
        origins: [this.position],
        destinations: [this.newMarker],
        travelMode: this.travelMode,
      });
      this.distance = res.rows[0].elements[0].distance["text"];
      this.duration = res.rows[0].elements[0].duration;
      this.$emit("getDuration", this.distance, this.duration);
    },
    resetMap() {
      // will be improved
    }
  },
  watch: {
    travelMode: function () {
      this.calculateDistance();
    },
  },
};
</script>
