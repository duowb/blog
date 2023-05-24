<template>
  <header class="flex z-40">
    <RouterLink class="w-10 h-10 absolute lg:fixed m-6 select-none outline-none" to="/" focusable="false">
      <img v-if="isDark" src="/logo-dark.svg" alt="">
      <img v-else src="/favicon.svg" alt="">
    </RouterLink>
    <nav class="nav">
      <div class="spacer" />
      <div class="right">
        <!-- <RouterLink to="/blog" title="博客">
          <span class="lt-md:hidden">博客</span>
        </RouterLink> -->
        <!-- <RouterLink to="/projects" title="Projects">
          <span class="lt-md:hidden">项目</span>
        </RouterLink> -->
        <toggle-theme />
      </div>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { useDark } from '@vueuse/core';

const isDark =  useDark();
</script>
<style scoped>
.header h1 {
  margin-bottom: 0;
}

.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>