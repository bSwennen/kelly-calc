<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <Form
          @input="$emit('input', $event)"
          @delete="$emit('delete', $vnode.key)"
          @copy="$emit('copy', $event)"
          @simulate="showSims = !showSims"
          :initFormData="initFormData"
          :computed="computed"
        />
      </v-col>
      <v-col>
        <Results
          :kellyCalc="kellyCalc"
          :isBestBet="isBestBet"
          v-if="computed"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Simulation v-if="showSims" :kellyCalc="kellyCalc" />
      </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
  </v-container>
</template>

<script>
import Results from "@/components/Results";
import Form from "@/components/Form";
import Simulation from "@/components/simulation/Simulation";

export default {
  name: "KellyCalcRow",
  props: {
    initFormData: Object,
    kellyCalc: Object,
    isBestBet: Boolean,
    computed: Boolean
  },
  data() {
    return {
      showSims: false
    };
  },
  components: { Results, Form, Simulation },
  mounted() {
    if (this.initFormData) this.$emit("input", this.initFormData);
  }
};
</script>
