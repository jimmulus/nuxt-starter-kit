<template>

     <ValidationProvider :name="name" :rules="rules" :vid="vid" v-slot="{ errors }">
      <!-- TODO @change="currentValue = $currencyChange(parseInt(currentValue.toString().replace(',', ':').replace('.', '')))" -->
      <v-text-field
      dense
      outlined
      v-model="currentValue"
      hide-details
      :error-messages="errors"
      :type="type"
      :prepend-icon="prepend"
      :append-icon="append"
      :disabled="disabled"
      :readonly="readonly"
      :filled="readonly"
      :prefix="prefix"
      :suffix="suffix"
      :label="label"
      @change="change"
    >
    <template v-slot:label>
          {{ label }} <span class="red--text" v-if="rules.includes('required')">*</span>
        </template>
    </v-text-field>





        </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'TextInput',
  components: {
    ValidationProvider
  },
  props: {
    groupName: {
      type: String,
      default: ''
    },
    group: {
      type: Number,
      default: 0
    },

    prepend: {
      type: String,
      default: ''
    },
    append: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    prefix: {
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
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    change: {
      type: Function,
      default: () => {
      }
    }
  },
  data: () => ({
    currentValue: ''
  }),
  mounted() {
    this.currentValue = this.value
  },
  watch: {

    value (val) {
      this.currentValue = val
    },
      currentValue (val) {
      // allows us to use v-model on our input.
      this.$emit('input', val);
    }
  }
};
</script>
