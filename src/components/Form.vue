<template>
  <v-card class="mx-auto" tile>
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
        label="Odds"
        required
        type="number"
        :rules="[v => v >= 1 || 'Odds must be at least 1']"
        v-on:input="onInput"
      >
      </v-text-field>
      <v-text-field
        v-model="formData.winChance"
        label="Win chance (%)"
        required
        type="number"
        :rules="[
          v => (v >= 0 && v <= 100) || 'win chance must be between 0% and 100%'
        ]"
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
        winChance: ""
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
