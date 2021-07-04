<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title
        >{{ this.label }}:
        {{
          (this.value * (isPercentage ? 100 : 1)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        }}{{ isPercentage ? "%" : "" }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "NumberListItem",
  props: { label: String, value: Number, isPercentage: Boolean }
};
</script>
