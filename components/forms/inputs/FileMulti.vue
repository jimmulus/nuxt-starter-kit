<template>

    <ValidationProvider v-slot="{ errors }" :name="name" rules="">
        <v-row dense>
        <v-col cols="12" lg="9">
        <v-file-input
          v-for="(n, i) in fieldCount"
          col=""
          :key="i"
          outlined
          hide-details
          v-model="currentValue[i]"
          :error-messages="errors"
          :label="label"
          :prepend-icon="prepend">
        <template v-slot:label>
          {{ label }} <span class="red--text" v-if="rules.includes('required')">*</span>
        </template>
        </v-file-input>
        </v-col>
        <v-col cols="12" lg="3"><v-btn v-if="fieldCount < amount" @click="addField()">+</v-btn>
        <v-btn v-if="fieldCount >1"  @click="removeField()">-</v-btn></v-col>
        </v-row>

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
  // mounted () {
  //   this.amount > 1 ? this.fieldCount = this.amount : false
  // },
  watch: {
    currentValue (val) {
      console.log({val})
      // allows us to use v-model on our input.
      this.$emit('field', val);
    }
  },
methods: {
  addField(e) {
    if(this.fieldCount < 5)
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
