<template>
  <v-list-item>
    {{ label }}: {{ formattedValue }}{{ isPercentage? "%": "" }}
  </v-list-item>
</template>

<script lang="ts">
export default {
  name: "NumberListItem",
  props: {
    label: String,
    value: Number,
    isPercentage: Boolean,
  },
  computed: {
    formattedValue(): string {
      return (this.value ?? 0 * (this.isPercentage ? 100 : 1)).toLocaleString(
        undefined,
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      );
    },
  },
};
</script>
