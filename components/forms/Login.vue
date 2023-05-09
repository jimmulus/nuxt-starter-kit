<template>
  <ValidationObserver ref="observer">
    <v-form ref="loginForm" v-model="valid" lazy-validation>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate color="white" size="64" style="position: absolute"></v-progress-circular>
      </v-overlay>
      <v-row>
        <v-col cols="12">
          <ValidationProvider name="E-mailadres" rules="required|email" vid="email" v-slot="{ errors }">
            <v-text-field v-model="email" :error-messages="errors" required>
              <template v-slot:label>E-mail <span class="red--text">*</span></template>
            </v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12">
          <ValidationProvider name="Wachtwoord" vid="password" rules="required|min:8" v-slot="{ errors }">
            <v-text-field v-model="password" :error-messages="errors" type="password" required>
              <template v-slot:label> Wachtwoord <span class="red--text">*</span></template>
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="6" xsm="12" align-end>
          <NuxtLink to="/vergeten">
            <v-btn block text>Wachtwoord vergeten</v-btn>
          </NuxtLink>
        </v-col>
        <v-col cols="12" sm="6" xsm="12" align-end>
          <NuxtLink to="/register">
            <v-btn block text>Nieuw account</v-btn>
          </NuxtLink>
        </v-col>
        <v-col class="d-flex" cols="12" align-end>
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
  components: { ValidationProvider, ValidationObserver },

  data: () => ({
    overlay: false,
    valid: true,
    password: "",
    email: "",
    show1: false,
  }),
  methods: {
    async validate() {
      if (await this.$refs.observer.validate()) {

        const credentials = {
          email: this.email,
          password: this.password
        }
        try {
          await this.$store.dispatch("csrf/getCSRF")
          await this.$auth.loginWith('cookie', {
            data: credentials
          })
          if (this.$auth.user) {
            this.overlay = true
            this.$notifier.showMessage({ content: `Welkom ${this.$auth.user.Username}`, color: 'success', timeout: 6000 })
            await this.$store.dispatch('account/getAccount')
            await this.$store.dispatch('data/getData')
            const forward = this.$cookies.get('redirect')
              ? this.$cookies.get('redirect')
              : '/';
            this.$cookies.remove('redirect');

            setTimeout(() => {
              this.$router.push(forward);
            }, 3000);
          } else {
            alert("somethings wrong");
          }
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

<style lang="scss" scoped></style>
