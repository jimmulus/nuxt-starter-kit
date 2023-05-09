<template>

     <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules" :vid="vid">
        <v-textarea
          v-model="currentValue"
          :error-messages="errors"
          :label="label"
          :hint="hint"
          :prepend-icon="prepend"
          outlined
        ><template v-slot:label>
          {{ label }} <span class="red--text" v-if="rules.includes('required')">*</span>
        </template>
        </v-textarea>
        </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'TextareaInput',
  components: {
    ValidationProvider
  },
  props: {
    prepend: {
      type: String,
      default: ''
    },
    value: {
      type: String,
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
    hint: {
      type: String,
      default: ''
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
