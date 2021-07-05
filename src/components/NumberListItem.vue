<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title
        >{{ label }}: {{ formattedValue }}{{ isPercentage ? "%" : "" }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "NumberListItem",
  props: { label: String, value: Number, isPercentage: Boolean },
  computed: {
    formattedValue() {
      return (this.value * (this.isPercentage ? 100 : 1)).toLocaleString(
        undefined,
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      );
    }
  }
};
</script>
