<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
    </div>
    <br />
    <GmapMap
      ref="map"
      :center="position"
      :zoom="18"
      style="width: 100%; height: 400px"
      @click="addMarker"
    >
      <GmapMarker :position="position" :clickable="true" @click="center = position" />
      <GmapMarker v-if="newMarker" :position="newMarker" :clickable="true" @click="center = newMarker" />
    </GmapMap>
  </div>
</template>

<script>
import PostCodeApi from "../api/postcodes";
import { gmapApi } from "vue2-google-maps";
export default {
  name: "GoogleMap",
  data() {
    return {
      PostCodeApi,
      position: { lat: 0, lng: 0 },
      newMarker: null
    };
  },
  computed: {
    google: gmapApi,
  },
  async created() {
    const res = await this.PostCodeApi.getPostCode("cm27pj");
    this.position["lat"] = res.result.latitude;
    this.position["lng"] = res.result.longitude;
  },
  methods: {
    addMarker(event) {
        const marker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        }
        this.newMarker = marker
    },
  },
};
</script>