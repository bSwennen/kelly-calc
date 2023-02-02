<template>
  <v-form lazy-validation>
    <v-row>
      <v-col cols="2">
        <v-text-field
          v-model="formData.numSims"
          label="Number of simulations"
          required
          color="primary"
          variant="underlined"
          :rules="[(v) => v >= 1 || 'Number of simulations must be at least 1']"
          @input="onInput"
        >
        </v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="formData.numSteps"
          label="Number of time steps"
          required
          color="primary"
          variant="underlined"
          :rules="[(v) => v >= 1 || 'Number of time steps must be at least 1']"
          @input="onInput"
        >
        </v-text-field>
      </v-col>
      <v-col cols="2">
        <v-switch
          v-model="formData.isLogScale"
          label="Log scale"
          @change="onInput"
          color="primary"
          :inline="true"
        ></v-switch>
      </v-col>
      <v-spacer></v-spacer>
      <v-btn
        icon="mdi-refresh"
        dark
        color="primary lighten"
        small
        @click="$emit('refresh')"
        class="mx-2 my-2"
      >
      </v-btn>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { SimFormData } from "../../types";

const props = defineProps<{
  initNumSims: number;
  initNumSteps: number;
}>();

const emits = defineEmits<{
  (e: "input", formData: SimFormData): void;
  (e: "refresh"): void;
}>();

const formData: Ref<SimFormData> = ref({
  numSims: props.initNumSims,
  numSteps: props.initNumSims,
  isLogScale: true,
});

function onInput() {
  if (formData.value.numSims) {
    formData.value.numSims = Number(formData.value.numSims);
  }
  if (formData.value.numSteps) {
    formData.value.numSteps = Number(formData.value.numSteps);
  }
  emits("input", formData.value);
}
</script>
