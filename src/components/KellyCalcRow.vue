<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <Form
          @input="$emit('input', $event)"
          @delete="$emit('delete', $vnode.key)"
          @copy="$emit('copy', $event)"
          :initFormData="initFormData"
        />
      </v-col>
      <v-col>
        <Results :results="results" v-if="computed" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Chart />
      </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
  </v-container>
</template>

<script>
import Results from "@/components/Results";
import Form from "@/components/Form";
import Chart from "@/components/Chart";

export default {
  name: "KellyCalcRow",
  props: {
    initFormData: Object,
    results: Object,
    computed: Boolean
  },
  components: { Results, Form, Chart },
  mounted() {
    if (this.initFormData) this.$emit("input", this.initFormData);
  }
};
</script>
