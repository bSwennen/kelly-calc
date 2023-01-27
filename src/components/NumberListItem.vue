<template>
  <v-list-item>
    {{ label }}: {{ formattedValue }}{{ isPercentage ? "%" : "" }}
  </v-list-item>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  label: string;
  value: number;
  isPercentage?: boolean;
}>();

const formattedValue = computed(() => {
  const value = props.value ?? 0 * (props.isPercentage ? 100 : 1);

  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
});
</script>
