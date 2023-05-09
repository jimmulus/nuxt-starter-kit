<template>
  <div class="flex-row">
    <div class="source">
      <vue-drawing-canvas
        ref="VueCanvasDrawing"
        :image.sync="image"
        :width="600"
        :height="400"
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
        :additional-images="additionalImages"
      />
      <div class="button-container">

        <v-btn @click.prevent="$refs.VueCanvasDrawing.reset()">
          Reset
        </v-btn >
      </div>
    </div>
  </div>
</template>

<script type="module">
import VueDrawingCanvas from "vue-drawing-canvas/dist/vue-drawing-canvas.esm";

export default {
  components: {
    "vue-drawing-canvas": VueDrawingCanvas,
  },
  setup: () => {},
  data() {
    return {
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
      line: 5,
      color: "#000000",
      strokeType: "dash",
      lineCap: "square",
      lineJoin: "miter",
      backgroundColor: "#FFFFFF",
      backgroundImage: null,
      watermark: null,
      additionalImages: [],
    };
  },
  mounted() {
    if ("vue-drawing-canvas" in window.localStorage) {
      this.initialImage = JSON.parse(
        window.localStorage.getItem("vue-drawing-canvas")
      );
    }
  },
  methods: {
    async setImage(event) {
      let URL = window.URL;
      this.backgroundImage = URL.createObjectURL(event.target.files[0]);
      await this.$refs.VueCanvasDrawing.redraw();
    },
    getStrokes() {
      window.localStorage.setItem(
        "vue-drawing-canvas",
        JSON.stringify(this.$refs.VueCanvasDrawing.getAllStrokes())
      );
      alert(
        "Strokes saved, reload your browser to see the canvas with previously saved image"
      );
    },
    removeSavedStrokes() {
      window.localStorage.removeItem("vue-drawing-canvas");
      alert("Strokes cleared from local storage");
    },
  },
};
</script>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: row;
}
.button-container {
  display: flex;
  flex-direction: row;
}
.button-container > * {
  margin-top: 5px;
  margin-right: 10px;
}
</style>
