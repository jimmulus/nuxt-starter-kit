<template>
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <div>
      <v-card>
            <v-toolbar
              color="blue"
              dark>
              <v-toolbar-title>Reset wachtwoord</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="password" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="Tenminste 8 tekens" counter @click:append="show1 = !show1"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="confirmPassword" :rules="[confirmrules.required, passwordConfirmationRule]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Herhaal wachtwoord" hint="Tenminste 8 tekens" counter @click:append="show1 = !show1"></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                            <v-btn x-large block :disabled="!valid" color="success" @click="validate"> Login </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
  </v-dialog>
</template>

<script>
export default {

  name: 'TokenReset',
  layout: 'login',
  auth: false,
  data: () => ({
        dialog: true,
        valid: true,
        password: "",
        confirmPassword: "",
        email: "",
        emailRules: [
            v => !!v || "E-mail is verplicht",
            v => /.+@.+\..+/.test(v) || "Voer een geldig E-mail in."
        ],
        show1: false,
        rules: {
            required: value => !!value || "Wachtwoord invoeren is verplicht.",
            min: v => (v && v.length >= 8) || "Minimaal 8 tekens"
        },
        confirmrules: {
            required: v => !!v || "Herhaal wachtwoord invoeren is verplicht..",
        }
  }),
  computed: {
    passwordConfirmationRule() {
      return (this.password === this.confirmPassword) || 'Wachtwoorden komen niet overeen'
    },
  },
  created ()  {
    this.checkToken()
  },
  methods: {
        async validate() {
          if (this.$refs.loginForm.validate()) {
            const credentials = {
              email: this.email,
              token: this.$route.params.token,
              Password: this.password,
              ConfirmPassword: this.confirmPassword
            }
            try {
              const response = await this.$axios.$post('/api/reset', credentials)
              console.log(response)
              this.$notifier.showMessage({ content: response.message, color: 'success', timeout: 2000})
              await this.$router.push('/');
            } catch (e) {
              console.log(e)
            }
          }
        },
        async checkToken() {
        await this.$axios.$get('/api/reset/' + this.$route.params.token).catch((e) => {
          console.log(e)
          this.$notifier.showMessage({ content: e.response.data.message, color: 'error', timeout: 6000})
          this.$router.push('/')
        })
      }

        // reset() {
        //     this.$refs.form.reset();
        // },
        // resetValidation() {
        //     this.$refs.form.resetValidation();
        // }
    },
}
</script>
