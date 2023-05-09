<template>
  <v-app>
    <div class="d-flex justify-center pa-2 white">
      <Logo />
    </div>
    <v-main>
      <v-container>
        <Nuxt :title="title" />
      </v-container>
      <Snackbar></Snackbar>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from "~/components/Snackbar.vue";
export default {
  name: "LoginLayout",
  components: { Snackbar },
  data() {
    return {
      title: "PROJECT NAAM",
    };
  },
};
</script>

<style lang="scss" scoped>
#app {
  background-image: url(/images/background.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
