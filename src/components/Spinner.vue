<template>
  <half-circle-spinner
    class="center"
    :animation-duration="1000"
    :size="60"
    color="#725ac1"
  />
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
export default {
  name: "Spinner",
  components: {
    HalfCircleSpinner,
  },
};
</script>

<style>
.center {
  margin: 300px auto;
}
</style>
