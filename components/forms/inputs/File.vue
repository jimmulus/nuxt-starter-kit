<template>

    <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules" mode="eager">
        <v-file-input
          v-for="(n, i) in fieldCount"
          :key="i"
          outlined
          hide-details
          v-model="currentValue[i]"
          :error-messages="errors"
          :label="label"
          :prepend-icon="prepend"
          capture="user"
          >
        >
        <template v-slot:label>
          {{ label }} <span class="red--text" v-if="rules.includes('required')">*</span>
        </template></v-file-input>

        </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'FileInput',
  components: {
    ValidationProvider
  },
  props: {
    prepend: {
      type: String,
      default: ''
    },
    value: {
      type: Array,
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
    amount: {
      type: Number,
      default: 1
    },

  },

  data: () => ({
    currentValue: [],
    fieldCount: 1
  }),
  mounted () {
    this.amount > 1 ? this.fieldCount = this.amount : false
  },
  watch: {
    currentValue (val) {
      console.log({val})
      // allows us to use v-model on our input.
      this.$emit('field', val);
    }
  },
methods: {
  addField(e) {
    this.fieldCount++
  },
  removeField(e) {
    if(this.fieldCount > 1)
    this.fieldCount--
    this.currentValue.splice(-1)
  }
}

};
</script>
