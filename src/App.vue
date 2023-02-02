<template>
  <v-app :theme="theme">
    <!-- <v-app-bar app color="primary" dark> -->
    <v-app-bar>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2 ml-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <h1>Kelly Calculator</h1>
      </div>
      <v-spacer></v-spacer>
      <v-btn :icon="icon()" @click="onClick"></v-btn>
    </v-app-bar>
    <v-main>
      <KellyCalc :theme="theme" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import KellyCalc from "./components/KellyCalc.vue";

const theme = ref("light");

function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
}

function icon() {
  return theme.value === "light" ? "mdi-weather-sunny" : "mdi-weather-night";
}
</script>
