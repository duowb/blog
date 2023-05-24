<template>
  <button class="dark:i-carbon-moon i-carbon:sun" @click="toggleDark()"></button>
</template>
<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>