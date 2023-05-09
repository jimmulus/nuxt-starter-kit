<template>

     <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules" :vid="vid">
        <label v-if="label !== ''">{{ label }} <span class="red--text" v-if="rules.includes('required')">*</span></label>
        <div :error-messages="errors" class="v-messages__message theme--light error--text">
          {{ errors[0] ? errors[0].replace('_', ' ') : '' }}
        </div>
          <input v-model="currentValue" type="hidden" />
        <vue-drawing-canvas
        ref="VueCanvasDrawing"

        :image.sync="image"
        :width="500"
        :height="250"
        :stroke-type="strokeType"
        :line-cap="lineCap"
        :line-join="lineJoin"
        :fill-shape="fillShape"
        :eraser="eraser"
        :lineWidth="line"
        :color="color"
        :background-color="backgroundColor"
        :background-image="backgroundImage"
        :watermark="watermark"
        :initial-image="initialImage"
        saveAs="png"
        :styles="{
          border: 'solid 1px #000',
        }"
        :lock="disabled"
        :additional-images="additionalImages"
      />
      <div class="button-container">

        <v-btn @click.prevent="$refs.VueCanvasDrawing.reset()">
          Reset
        </v-btn >
      </div>
        </ValidationProvider>
</template>

<script type="module">
import VueDrawingCanvas from "vue-drawing-canvas/dist/vue-drawing-canvas.esm";
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'CanvasInput',
  components: {
    ValidationProvider,
    VueDrawingCanvas
  },
  props: {
    value: {
      type: [String, Object],
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
    currentValue: '',
    initialImage: [
        {
          type: "dash",
          from: {
            x: 262,
            y: 154,
          },
          coordinates: [],
          color: "#000000",
          width: 5,
          fill: false,
        },
      ],
      x: 0,
      y: 0,
      image: "",
      eraser: false,
      disabled: false,
      fillShape: false,
      line: 1,
      color: "#000000",
      strokeType: "dash",
      lineCap: "square",
      lineJoin: "miter",
      backgroundColor: "#FFFFFF",
      backgroundImage: null,
      watermark: null,
      additionalImages: [],
  }),
  mounted() {
    this.currentValue = this.image
  },
  watch: {
    image (val) {
      this.currentValue = val
    },
    currentValue (val) {
      // allows us to use v-model on our input.
      this.$emit('input', val);
    }
  }
};
</script>
