<template>
      <ValidationProvider v-slot="{ errors }" :name="field" :rules="rules" :vid="vid">
            <v-select
          v-model="currentValue"
          :items="options"
          item-text="value"
          item-value="key"
          :label="label"
          :disabled="disabled"
          dense
          hide-details
          outlined
          :prepend-icon="prepend"
          :error-messages="errors"
          :change="change"

        >

        <!-- <template v-slot:append-outer> <v-btn disabled color="primary"> Maanden </v-btn> </template> -->
        <template v-slot:label>
          {{ label }} <span class="red--text" v-if="rules.includes('required')">*</span>
        </template>
        </v-select>

        </ValidationProvider>
</template>

<script>

import { ValidationProvider } from 'vee-validate';

export default {
  name: 'SelectInput',
  components: {
    ValidationProvider
  },
  props: {
    prepend: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    rules: {
      type: [String, Object],
      default: ''
    },
    field: {
      type: String,
      default: 'Veld'
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    vid: {
      type: String,
      default: undefined
    },
    options: {
      type: Array,
      default: []
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    change: {
      type: Function,
      default: () => {
      }
    },

  },
  readonly: {
      type: Boolean,
      default: false,
    },
  data: () => ({
    currentValue: ''
  }),
  mounted() {
    this.currentValue = this.value
  },
  watch: {
    value (val) {
      console.log(val)
      this.currentValue = val
    },
      currentValue (val) {

      // allows us to use v-model on our input .
      this.$emit('input', val);
      this.$emit('newData', {name: this.name, value: val});
    }
  }
};
</script>


