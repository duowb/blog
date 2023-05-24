<template>
  <div class="prose m-auto mb-8" :class="frontmatter.wrapperClass">
    <h1 class="mb-0 slide-enter">
      {{ frontmatter.title }}
    </h1>
    <span v-if="frontmatter.date" class="opacity-50 mt-2 slide-enter">
      {{ frontmatter.date }}
    </span>
    <tag text="123"></tag>
    <p v-if="frontmatter.subtitle" class="opacity-50 mt-6 italic slide-enter">
      {{ frontmatter.subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
import  Tag from  './Tag.vue'

const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})
</script>