<template>
  <v-card>
    <v-toolbar color="blue" dark class="mb-5">
      <v-toolbar-title>{{ $config.PROJECT_NAME }} | Formulier</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <FormsInputsSelect v-model="formName" name="selectForm" field="selectForm" label="Selecteer een formulier"
        :options="options" @input="changeForm">
      </FormsInputsSelect>

      <FormsForm v-if="formFields.length > 0" :formFields="formFields" :postRoute="'/api/forms/' + formName">
      </FormsForm>
    </v-card-text>
  </v-card>
</template>

<script>

import forms from '../data/forms.json'
export default {
  name: "FormPAge",
  auth: false,
  data: () => ({
    dialog: true,
    formName: '',
    options: ['form1', 'form2', 'form3'],
    formFields: [],

  }),
  async mounted() {

  },

  methods: {
    changeForm() {
      this.formFields = forms[0][this.formName]
    },

    getForm() {
      try {
        console.log(forms)
        this.overlay = true;
        this.formFields = forms[0][this.formName]
        this.overlay = false;

      } catch (e) {
        this.overlay = false;
        this.$notifier.showMessage({
          content: 'no form found',
          color: "error",
          timeout: 6000,
        });
      }

    },
  }
};
</script>
