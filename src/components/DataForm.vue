<template>
  <v-card>
    <v-card-title>Input</v-card-title>
    <v-card-text>
      <v-form lazy-validation>
        <v-text-field
          v-model="formData.bankroll"
          label="Bankroll"
          required
          :rules="[(v: number) => v >= 0 || 'Bankroll must be positive']"
          @input="onInput"
          color="primary"
          variant="underlined"
        >
        </v-text-field>
        <v-text-field
          v-model="formData.odds"
          label="Bookmaker odds"
          required
          :rules="[(v: number) => v >= 1 || 'Bookmaker odds must be at least 1']"
          @input="onInput"
          color="primary"
          variant="underlined"
        >
        </v-text-field>
        <v-text-field
          v-model="formData.assumedOdds"
          label="My odds"
          required
          :rules="[(v: number) => v >= 1 || 'My odds must be at least 1']"
          @input="onInput"
          color="primary"
          variant="underlined"
        >
        </v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        v-if="canDelete"
        text
        @click="$emit('delete')"
        color="primary lighten"
        >Delete</v-btn
      >
      <v-btn text @click="$emit('copy', formData)" color="primary lighten"
        >Copy</v-btn
      >
      <v-btn
        v-if="computed"
        text
        @click="$emit('simulate')"
        color="primary lighten"
      >
        Show simulations
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { FormData } from "../types";
import { Ref, ref } from "vue";

const props = defineProps<{
  initFormData: FormData;
  computed: boolean;
  canDelete: boolean;
}>();

const emits = defineEmits<{
  (e: "input", formData: FormData): void;
  (e: "copy", formData: FormData): void;
  (e: "simulate"): void;
}>();

const formData: Ref<FormData> = ref({
  bankroll: props.initFormData.bankroll,
  odds: props.initFormData.odds,
  assumedOdds: props.initFormData.assumedOdds,
});

function onInput(): void {
  emits("input", formData.value);
}
</script>
