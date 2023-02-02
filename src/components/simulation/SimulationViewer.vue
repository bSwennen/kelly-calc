<template>
  <v-card variant="outlined">
    <v-card-title>Simulations</v-card-title>
    <v-card-text>
      <SimulationForm
        :initNumSims="initNumSims"
        :initNumSteps="initNumSteps"
        @refresh="refresh"
        @input="onFormInput($event)"
      />
    </v-card-text>
    <LineChart
      v-if="labels && dataSets"
      :labels="labels"
      :data-sets="dataSets"
      :isLogScale="isLogScale"
    />
  </v-card>
</template>

<script setup lang="ts">
import LineChart from "./LineChart.vue";
import Simulator from "../../model/simulator";
import SimulationForm from "./SimulationForm.vue";
import KellyCalc from "../../model/kelly-calc";
import { onMounted, ref, type Ref, watch } from "vue";
import { DataSet, SimFormData } from "../../types";

const props = defineProps<{
  kellyCalc: KellyCalc;
  theme: string;
}>();

const initNumSteps = 100;
const initNumSims = 10;
let simulator: Simulator;
let labels: Ref<number[]> = ref([]);
let dataSets: Ref<DataSet[]> = ref([]);
let numSteps = ref(0);
let numSims = ref(0);
let isLogScale = ref(true);

watch(
  () => props.theme,
  (newTheme) => {
    reColorChart(newTheme);
  }
);

function reColorChart(theme: string): void {
  const newDataSets: DataSet[] = [];

  dataSets.value.forEach((dataSet) => {
    if (dataSet.borderColor !== "red") {
      dataSet.borderColor = chartColor(theme);
    }
    newDataSets.push(dataSet);
  });
  dataSets.value = newDataSets;
}

function chartColor(theme: string): string {
  return theme == "dark" ? "#93e8d3" : "black";
}

function generateAverageGrowthData(numSteps: number): number[] {
  if (props.kellyCalc) {
    const result: number[] = [];
    result.push(props.kellyCalc.getBankroll());

    for (let i = 0; i < numSteps; i++) {
      result.push(result[i] * (1 + props.kellyCalc.getBankrollGrowthRate()));
    }
    return result;
  }
  return [];
}

function generateDataSets(numSims: number, numSteps: number): DataSet[] {
  const result: DataSet[] = [];

  result.push({
    data: generateAverageGrowthData(numSteps),
    borderColor: "red",
    borderWidth: 1,
    pointRadius: 0,
  });

  for (let i = 0; i < numSims; i++)
    result.push({
      data: simulator.simulate(numSteps),
      borderColor: chartColor(props.theme),
      borderWidth: 0.7,
      pointRadius: 0,
    });

  return result;
}

function refresh() {
  if (numSims && numSteps) {
    labels.value = [];
    dataSets.value = [];
    labels.value = [...Array(numSteps.value + 1).keys()];
    dataSets.value = generateDataSets(numSims.value, numSteps.value);
  }
}

function onFormInput(formData: SimFormData) {
  if (formData.numSims) {
    numSims.value = formData.numSims;
  }
  if (formData.numSteps) {
    numSteps.value = formData.numSteps;
  }
  if (formData.isLogScale !== undefined) {
    isLogScale.value = formData.isLogScale;
  }
}

onMounted(() => {
  numSims.value = initNumSims;
  numSteps.value = initNumSteps;

  if (props.kellyCalc) {
    simulator = new Simulator(props.kellyCalc);
  } else {
    throw Error("KellyCalc should exist");
  }
  refresh();
});
</script>
