<template>
  <v-app>
    <v-app-bar>
      <template #prepend>
        <v-app-bar-nav-icon />
      </template>
      <v-app-bar-title>Estudo NPI 2026.1</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
</script>
