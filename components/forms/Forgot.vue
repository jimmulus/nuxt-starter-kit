<template>
  <ValidationObserver ref="observer">
    <v-form ref="forgotForm" v-model="valid" lazy-validation>
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


        <v-col class="d-flex" cols="12" sm="12" xsm="12">
          <NuxtLink to="/login">
            <v-btn block text>Naar Login</v-btn>
          </NuxtLink>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="d-flex" cols="12">
          <v-btn block :disabled="!valid" color="success" @click="validate">
            Versturen
          </v-btn>
        </v-col>


      </v-row>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  components: { ValidationProvider, ValidationObserver },
  data: () => ({
    redirect: "",
    valid: true,
    email: "",
  }),
  methods: {
    async validate() {
      if (this.$refs.observer.validate()) {
        const data = {
          email: this.email,
        };
        try {
          await this.$store.dispatch("csrf/getCSRF");
          const login = await this.$axios.$post("/api/forgot", data);
          this.$notifier.showMessage({
            content: login.message,
            color: "success",
            timeout: 6000,
          });
          this.$router.push("/login");
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

<style lang="css" scoped>
</style>
