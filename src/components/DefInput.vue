<template>
  <div class="user-input">
    <label for=""> {{ placeholder }}</label>
    <input :type="type" :disabled="isDisabled" />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
