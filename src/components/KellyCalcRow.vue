<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <DataForm
          @input="$emit('input', $event)"
          @delete="$emit('delete', $.vnode.key)"
          @copy="$emit('copy', $event)"
          @simulate="onSimulate"
          :initFormData="initFormData"
          :computed="computed"
          :canDelete="canDelete"
        />
      </v-col>
      <v-col>
        <ResultsDisplay
          :kellyCalc="kellyCalc"
          :isBestBet="isBestBet"
          v-if="computed"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <SimulationViewer
          :theme="theme"
          v-if="showSims"
          :kellyCalc="kellyCalc"
        />
      </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
  </v-container>
</template>

<script setup lang="ts">
import ResultsDisplay from "./ResultsDisplay.vue";
import DataForm from "./DataForm.vue";
import { FormData, KellyCalcData } from "../types";
import { onMounted, ref } from "vue";
import SimulationViewer from "./simulation/SimulationViewer.vue";
import KellyCalc from "@/model/kelly-calc";

const props = defineProps<{
  initFormData: FormData;
  kellyCalc?: KellyCalc;
  isBestBet: boolean;
  computed: boolean;
  canDelete: boolean;
  theme: string;
}>();

const emits = defineEmits<{
  (e: "input", formData: FormData): void;
  (e: "copy", formData: FormData): void;
  (e: "delete", kellyCalcData: KellyCalcData): void;
}>();

const showSims = ref(false);

function onSimulate() {
  showSims.value = !showSims.value;
}

onMounted(() => {
  if (props.initFormData) {
    emits("input", props.initFormData);
  }
});
</script>
