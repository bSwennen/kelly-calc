<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <Form @input="$emit('input', $event)" @delete="$emit('delete', $.vnode.key)" @copy="$emit('copy', $event)"
          @simulate="showSims = !showSims" :initFormData="initFormData" :computed="computed" :canDelete="canDelete" />
      </v-col>
      <v-col>
        <Results :kellyCalc="kellyCalc" :isBestBet="isBestBet" v-if="computed" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <SimulationViewer v-if="showSims" :kellyCalc="kellyCalc" />
      </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
  </v-container>
</template>

<script lang="ts">
import Results from "./Results.vue";
import Form from "./Form.vue";
import { FormData } from "../types";
import { defineComponent, PropType } from "vue";
import SimulationViewer from "./simulation/SimulationViewer.vue";
import KellyCalc from "@/model/kelly-calc";

export default defineComponent({
  name: "KellyCalcRow",
  props: {
    initFormData: { type: Object as PropType<FormData> },
    kellyCalc: { type: Object as PropType<KellyCalc> },
    isBestBet: Boolean,
    computed: Boolean,
    canDelete: Boolean,
  },
  components: { Results, Form, SimulationViewer },
  data() {
    return {
      showSims: false as Boolean,
    };
  },
  mounted() {
    if (this.initFormData) this.$emit("input", this.initFormData);
  },
});
</script>
