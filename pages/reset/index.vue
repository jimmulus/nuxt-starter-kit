<template>
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <div>
      <v-card>
            <v-toolbar
              color="blue"
              dark>
              <v-toolbar-title>Reset wachtwoord MijnMVA</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field :value="user.Username" :rules="emailRules" label="E-mail" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="password" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="Tenminste 8 tekens" counter @click:append="show1 = !show1"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="confirmPassword" :rules="[confirmrules.required, confirmrules.min, passwordConfirmationRule]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="Tenminste 8 tekens" counter @click:append="show1 = !show1"></v-text-field>
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

  name: 'IndexPage',
  layout: 'login',
  auth: true,
  data: () => ({
        dialog: true,
        valid: true,
        token: "",
        password: "",
        confirmPassword: "",
        email: "",
        emailRules: [
            v => !!v || "E-mail is verplicht",
            v => /.+@.+\..+/.test(v) || "Voer een geldig E-mail in."
        ],
        show1: false,
        rules: {
            required: value => !!value || "Required.",

            min: v => (v && v.length >= 8) || "Minimaal 8 tekens"
        },
        confirmrules: {
            required: v => !!v || "Required.",
        }
  }),
  computed: {
    passwordConfirmationRule() {
      return (this.password === this.confirmPassword) || 'Password must match'
    },
    user() {
      return this.$auth.user
    }
  },
  methods: {
        async validate() {
            if (this.$refs.loginForm.validate()) {

          const credentials = {
            email: this.$auth.user.Username,
            token: '',
            Password: this.password,
            ConfirmPassword: this.confirmPassword
          }
          try {
            const response = await this.$axios.$post('/api/reset', credentials)
            this.$notifier.showMessage({ content: response.message, color: 'success', timeout: 2000})
            await this.$auth.logout();
            this.$router.push('/')
          } catch (e) {
            console.log(e)
          }
        }
  },

        // reset() {
        //     this.$refs.form.reset();
        // },
        // resetValidation() {
        //     this.$refs.form.resetValidation();
        // }
    },
}
</script>
