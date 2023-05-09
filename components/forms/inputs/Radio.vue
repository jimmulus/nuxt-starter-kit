<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules" :vid="vid" :inlne="inline">
    <v-row dense>
      <v-col cols="12" lg="12">
        <label v-if="errors" :error-messages="errors">{{ label }} <span class="red--text"
            v-if="rules.includes('required')">*</span></label>
      </v-col>
      <v-col cols="12" lg="12">
        <v-radio-group v-model="currentValue" :row=inline hide-details>
          <v-radio :inline="inline" v-for="(option, index) in options" :key="index" :label="option"
            :value="option"></v-radio>
        </v-radio-group>
        <div class="v-messages theme--light error--text" role="alert">
          <div class="v-messages__wrapper">
            <div class="v-messages__message">
              {{ errors[0] ? errors[0].replace('_', ' ') : '' }}
            </div>
          </div>
        </div>
      </v-col></v-row>
  </ValidationProvider>
</template>
<script>

import { ValidationProvider } from 'vee-validate';

export default {
  name: 'RadioInput',
  components: {
    ValidationProvider
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    rules: {
      type: [String, Object],
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: [String, Number],
      default: ''
    },
    vid: {
      type: String,
      default: undefined
    },
    test: {
      type: String,
      default: ''
    },
    inline: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    this.currentValue = this.value
  },
  data: () => ({
    currentValue: ''
  }),
  watch: {
    value(val) {
      console.log(val)
      this.currentValue = val
    },
    currentValue(val) {
      // allows us to use v-model on our input.
      this.$emit('input', val);
    }
  }
};
</script>


