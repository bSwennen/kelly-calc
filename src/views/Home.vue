<template>
  <v-container fluid class="py-8 px-6">
    <KellyCalcRow
      v-for="row in this.rows"
      :key="row.key"
      v-on:delete="onDelete(row)"
      v-on:copy="onCopy"
      :initFormData="row.formData"
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
      rows: []
    };
  },
  methods: {
    onAdd() {
      this.addRow({});
    },
    addRow(initFormData) {
      if (this.rows.length === 0)
        this.rows = [{ key: 0, formData: initFormData }];
      else {
        const newKey = this.rows[this.rows.length - 1].key + 1;
        this.rows.push({ key: newKey, formData: initFormData });
      }
    },
    onCopy(copyFormData) {
      this.addRow(copyFormData);
    },
    onDelete(row) {
      this.rows = this.rows.filter(value => value.key !== row.key);
    }
  },
  mounted() {
    this.addRow({});
  }
};
</script>
