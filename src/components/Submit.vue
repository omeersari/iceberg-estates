<template>
  <button
    class="btn primary"
    @click="onSubmit"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: ["buttonText", "submit"],
  methods: {
    onSubmit(e) {
        e.preventDefault();
        this.submit();
    }
  }
};
</script>