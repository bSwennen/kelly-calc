<template>
  <v-card>
    <v-card-title>Input</v-card-title>
    <v-card-text>
      <v-form lazy-validation>
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
          :rules="[v => v >= 1 || 'Bookmaker odds must be at least 1']"
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
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="$emit('delete')" color="primary lighten"
        >Delete</v-btn
      >
      <v-btn text @click="$emit('copy', formData)" color="primary lighten"
        >Copy</v-btn
      >
      <v-btn
        v-if="computed"
        text
        @click="$emit('simulate')"
        color="primary lighten"
      >
        Show simulations
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Form",
  props: { initFormData: Object, computed: Boolean },

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
  },
  created() {
    if (this.initFormData.bankroll)
      this.formData.bankroll = this.initFormData.bankroll;

    if (this.initFormData.odds) this.formData.odds = this.initFormData.odds;

    if (this.initFormData.assumedOdds)
      this.formData.assumedOdds = this.initFormData.assumedOdds;
  }
};
</script>
