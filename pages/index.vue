<template>
  <RouterLink
    v-for="(item, index) in data"
    :key="index"
    :to="item.path"
    :style="{
      '--enter-stage': index,
    }"
    class="m-auto mb-6 block max-w-70ch"
  >
    <div class="animate-delay-500 flex justify-between">
      <span>{{ item.meta.frontmatter.title }}</span>
      <span>{{ item.meta.frontmatter.date }}</span>
    </div>
    <!-- <div class="mt-4">{{ item.meta.frontmatter.description }}</div> -->
  </RouterLink>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
import data from "./dict";
</script>
