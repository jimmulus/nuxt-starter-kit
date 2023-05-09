<template>
  <v-app>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        color="white"
        size="64"
        style="position: absolute"
      ></v-progress-circular>
    </v-overlay>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <logo />
      <v-spacer />
      <v-btn v-if="loggedIn" @click="logout" text>Logout</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
      <Snackbar></Snackbar>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Snackbar from "~/components/Snackbar.vue";
export default {
  name: "DefaultLayout",
  middleware: "loadInitialData",
  components: { Snackbar },
  data() {
    return {
      overlay: false,
      clipped: true,
      miniVariant: false,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/",
        },
        {
          icon: "mdi-account",
          title: "Mijn Account",
          to: "/account",
        },
        {
          icon: "mdi-folder",
          title: "Data tabel",
          to: "/data",
        },
        {
          icon: "mdi-form-select",
          title: "Formulieren",
          to: "/form",
        },
        {
          icon: "mdi-login",
          title: "Login",
          to: "/login",
        },
      ],
      title: this.$config.PROJECT_Name,
    };
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn;
    },
    user() {
      return this.$auth.user;
    },
  },
  methods: {
    async logout() {
      this.overlay = true
      await this.$auth.logout();
      await this.$notifier.showMessage({
        content: `Succesvol uitgelogd!`,
        color: "success",
        timeout: 6000,
      });
      setTimeout(() => {
        this.overlay = false
        this.$router.replace("/login");
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
