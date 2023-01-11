<template>
  <v-form lazy-validation>
    <v-row>
      <v-col cols="2">
        <v-text-field v-model="formData.numSims" label="Number of simulations" required color="primary"
          variant="underlined" :rules="[(v) => v >= 1 || 'Number of simulations must be at least 1']" @input="onInput">
        </v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field v-model="formData.numSteps" label="Number of time steps" required color="primary"
          variant="underlined" :rules="[(v) => v >= 1 || 'Number of time steps must be at least 1']" @input="onInput">
        </v-text-field>
      </v-col>
      <v-col cols="2">
        <v-switch v-model="formData.isLogScale" :label="`Log scale`" @change="onInput" color="primary"></v-switch>
      </v-col>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-refresh" dark color="primary lighten" small @click="$emit('refresh')" class="mx-2 my-2">
      </v-btn>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { FormData } from '@/types/simulation/form-data';

export default {
  name: "SimulationForm",
  props: {
    initNumSims: Number, initNumSteps: Number
  },
  data() {
    return {
      formData: {
        isLogScale: true,
      } as FormData,
    };
  },
  methods: {
    onInput() {
      if (this.formData.numSims) {
        this.formData.numSims = this.formData.numSims;
      }
      if (this.formData.numSteps) {
        this.formData.numSteps = this.formData.numSteps;
      }
      this.$emit("input", this.formData);
    },
  },
  created() {
    if (this.initNumSims) {
      this.formData.numSims = this.initNumSims;
    }
    if (this.initNumSteps) {
      this.formData.numSteps = this.initNumSteps;
    }
  },
};
</script>
