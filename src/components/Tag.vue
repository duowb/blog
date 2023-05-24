<template>
  <span class="text">
    {{ text }}
  </span>
</template>
<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
})

</script>