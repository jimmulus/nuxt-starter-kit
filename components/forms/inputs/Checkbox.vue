<template>
      <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules" :vid="vid" >
      <v-row dense>
        <v-col cols="12" :class="label === '' ? 'pa-0' : ''">
        <label v-if="label !== ''">{{ label }} <span class="red--text" v-if="rules.includes('required')">*</span></label>
        <div :error-messages="errors" class="v-messages__message theme--light error--text">
          {{ errors[0] ? errors[0].replace('_', ' ') : '' }}
        </div>

        </v-col>
        <v-col sm="3" v-for="(option, index) in options" :key="index">

          <v-checkbox
            v-model="currentValue"
            :label="option"
            :value="option"
            class="no-margin-top"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>
        </ValidationProvider>
</template>

<script>

import { ValidationProvider } from 'vee-validate';

export default {
  name: 'CheckboxInput',
  components: {
    ValidationProvider
  },
  props: {
    value: {
      type: [String, Array],
        default() {
            return []
        }
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
    }
  },
  data: () => ({
    currentValue: []
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
      // allows us to use v-model on our input.
      this.$emit('input', val);
    }
  }
};
</script>
<style scoped>
  .no-margin-top {
    margin: 0
  }
</style>
