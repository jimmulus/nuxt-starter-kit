<template>
  <v-snackbar v-model="show" :color="color" :timeout="timeout" top>
    {{ message }}
    <v-spacer></v-spacer>

    <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="show = false"
        >
          Sluiten
        </v-btn>
      </template>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: '',
      timeout: -1,
      color: ''
    }
  },

  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.message = state.snackbar.content
        this.color = state.snackbar.color
        this.timeout = state.snackbar.timeout
        this.show = true
      }
    })
  }
}
</script>
