<template>

    <ValidationProvider v-slot="{ errors }" :name="name" rules="">
        <v-card elevation="1">
        <v-card-title v-if="label !== ''">{{ label }}</v-card-title>
        <v-card-text v-if="check">
        <v-list-item  class="pa-0">
                              <v-list-item-icon>
                                <v-icon color="green">
                                  mdi-checkbox-marked-circle
                                </v-icon>
                              </v-list-item-icon>
                              <v-list-item-content>
                                <v-list-item-title>Bestand is reeds aangeleverd</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
      </v-card-text>
      <v-card-text v-if="!disabled" @drop.prevent="onDrop($event)"
      @dragover.prevent="dragover = true"
      @dragenter.prevent="dragover = true"
      @dragleave.prevent="dragover = false"
      :class="{ 'grey lighten-2': dragover }">


        <v-row class="d-flex flex-column" dense align="center" justify="center">
          <v-icon :class="[dragover ? 'mt-2, mb-6' : 'mt-5']" size="60">
            mdi-cloud-upload
          </v-icon>
          <p>
            Sleep je bestanden hierin of selecteer je bestanden hieronder.
          </p>
        </v-row>
        <v-file-input
          placeholder="Selecteer"
          class=""
          col=""
          outlined
          multiple
          hide-details
          v-model="currentValue"
          :error-messages="errors"

          :prepend-icon="prepend"
          >
        </v-file-input>
        <v-virtual-scroll
          v-if="currentValue && currentValue.length > 0"
          :items="currentValue"
          min-height="75"
          max-height="150"
          item-height="50"
        >
          <template v-slot:default="{ item }">
            <v-list-item dense :key="item.name">
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.name }}
                  <span class="ml-3 text--secondary">
                    {{ item.size }} bytes</span
                  >
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn @click.stop="removeFile(item.name)" icon>
                  <v-icon> mdi-close-circle </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
          </template>
        </v-virtual-scroll>

      </v-card-text>

    </v-card>












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
      default: 'fileupload'
    },
    label: {
      type: String,
      default: ''
    },
    amount: {
      type: Number,
      default: 1
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    check: {
      type: Boolean,
      default: false
    },

  },

  data: () => ({
    currentValue: [],
    fieldCount: 1,
    dragover: false,
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
  },
  removeFile(fileName) {
      // Find the index of the
      const index = this.currentValue.findIndex(
        file => file.name === fileName
      );
      // If file is in uploaded files remove it
      if (index > -1) this.currentValue.splice(index, 1);
    },
    onDrop(e) {
      this.dragover = false;
      // If there are already uploaded files remove them
      if (this.currentValue.length > 0) this.currentValue = [];
      // If user has uploaded multiple files but the component is not multiple throw error
      if (!this.multiple && e.dataTransfer.files.length > 1) {

        this.currentValue = Array.from(e.dataTransfer.files)[0]
      }
      // Add each file to the array of uploaded files
      else {
      console.log(e.dataTransfer.files)
        Array.from(e.dataTransfer.files).forEach(element =>{
            this.currentValue.push(element)

        });
      }
    },
}

};
</script>
