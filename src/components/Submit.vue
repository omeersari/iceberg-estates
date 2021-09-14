<template>
  <button
    :class="className"
    @click="onSubmit"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: ["buttonText", "submit", "className"],
  methods: {
    onSubmit(e) {
        e.preventDefault();
        this.submit();
    }
  }
};
</script>