<template>
  <ValidationObserver ref="observer">
    <v-form ref="registerForm" v-model="valid">
      <v-overlay :value="overlay">
        <v-progress-circular
          indeterminate
          color="white"
          size="64"
          style="position: absolute"
        ></v-progress-circular>
      </v-overlay>
      <v-row>
        <v-col cols="12">
          <ValidationProvider
            name="E-mailadres"
            rules="required|email"
            vid="email"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="email"
              :error-messages="errors"
              :success="valid"
              required
            >
            <template v-slot:label>E-mail <span class="red--text">*</span></template>
          </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12">
          <ValidationProvider
            name="Wachtwoord"
            rules="required|min:8"
            vid="password"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="password"
              :error-messages="errors"
              :success="valid"
              type="password"
              required
            >
            <template v-slot:label>Herhaal Wachtwoord <span class="red--text">*</span></template>
          </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12">
          <ValidationProvider
            name="Herhaal wachtwoord"
            rules="required|password"
            vid="passwordRepeat"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="passwordRepeat"
              :error-messages="errors"
              :success="valid"
              type="password"
              required
            >
            <template v-slot:label>Herhaal Wachtwoord <span class="red--text">*</span></template>
          </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="6" xsm="12" align-end>
          <NuxtLink to="/login">
            <v-btn block text>Naar Login</v-btn>
          </NuxtLink>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6" align-end>
          <v-btn block :disabled="!valid" color="success" @click="validate">
            Login
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </ValidationObserver>
</template>


<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    overlay: false,
    valid: true,
    password: "",
    passwordRepeat: "",
    email: "",
    show1: false,
  }),
  computed: {
    passwordMatch() {
      return () =>
        this.password === this.confirmPassword ||
        "Wachtwoorden komen niet overeen";
    },
  },
  methods: {
    async validate() {
      if (await  this.$refs.observer.validate()) {
        const credentials = {
          email: this.email,
          password: this.password,
        };
        try {
          await this.$store.dispatch("csrf/getCSRF");
          const response = await this.$axios.post("/api/register", credentials);
          this.$notifier.showMessage({
            content: response.data.message,
            color: "success",
            timeout: 6000,
          });
          this.$router.push("/");
        } catch (e) {
          if (e.response.status == 422) {
            this.$notifier.showMessage({
              content: "Niet alle velden zijn correct ingevuld.",
              color: "error",
              timeout: 6000,
            });
            console.log(e.response.data.errors);
            this.$refs.form.setErrors(e.response.data.errors);
          } else {
            this.$notifier.showMessage({
              content: e.response.data.message,
              color: "error",
              timeout: 6000,
            });
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
