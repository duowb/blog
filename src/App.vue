<template>
  <NavBar />
  <ClientOnly>
    <Plum />
  </ClientOnly>
  <main class="px-7 py-10 of-x-hidden slide-enter-content">
    <RouterView />
  </main>
</template>