<template>
  <v-card class="mx-auto" tile min-height="400">
    <v-form lazy-validation class="py-8 px-6">
      <v-text-field
        v-model="formData.bankroll"
        label="Bankroll"
        required
        type="number"
        :rules="[v => v >= 0 || 'Bankroll must be positive']"
        v-on:input="onInput"
      >
      </v-text-field>
      <v-text-field
        v-model="formData.odds"
        label="Bookmaker odds"
        required
        type="number"
        :rules="[v => v > 1 || 'Bookmaker odds must be more than 1']"
        v-on:input="onInput"
      >
      </v-text-field>
      <v-text-field
        v-model="formData.assumedOdds"
        label="My odds"
        required
        type="number"
        :rules="[v => v >= 1 || 'My odds must be at least 1']"
        v-on:input="onInput"
      >
      </v-text-field>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "Form",

  data() {
    return {
      formData: {
        bankroll: "",
        odds: "",
        assumedOdds: ""
      }
    };
  },
  methods: {
    onInput() {
      this.$emit("input", this.formData);
    }
  }
};
</script>
