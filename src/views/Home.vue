<template>
  <v-container fluid class="py-8 px-6">
    <KellyCalcRow
      v-for="row in this.rows"
      :key="row"
      v-on:delete="rows = rows.filter(value => value !== row)"
      v-on:copy="onCopy"
    />
    <v-btn fab dark color="red" v-on:click="onAdd" class="my-2">
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import KellyCalcRow from "@/components/KellyCalcRow";

export default {
  name: "Home",
  components: { KellyCalcRow },
  data() {
    return {
      rows: [0]
    };
  },
  methods: {
    onAdd() {
      if (this.rows.length === 0) this.rows = [0];
      else this.rows.push(this.rows[this.rows.length - 1] + 1);
    },
    onCopy(formData) {
      // TODO
      console.log(formData);
    }
  }
};
</script>
