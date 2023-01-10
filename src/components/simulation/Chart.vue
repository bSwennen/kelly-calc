<template>
  <v-card>
    <Line class="py-2 px-2" :data="simData" :options="options" :height="100" />
  </v-card>
</template>

<script>
import { defineComponent, computed } from "vue";
import { Line } from "vue-chartjs";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: "Chart",
  components: { Line },
  props: {
    simData: Object,
    isLogScale: Boolean,
  },
  setup(props) {
    const options = computed(() => ({
      scales: {
        y: {
          type: props.isLogScale ? "logarithmic" : "linear",
        },
      },
      responsive: true,
      plugins: {
        legend: false,
      },
    }));
    return { options };
  },
});
</script>
