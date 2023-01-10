<template>
  <v-app :style="{ backgroundColor: '#C4C4C4' }">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2 ml-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />

        <h1>Kelly Calculator</h1>
      </div>
    </v-app-bar>
    <v-main>
      <Main />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Main from './components/Main.vue'
</script>
