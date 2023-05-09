<template>
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <v-card>
      <v-toolbar color="blue" dark class="mb-5">
        <v-toolbar-title
          >{{ $config.PROJECT_NAME }} | Maak een account aan</v-toolbar-title
        >
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <FormsRegister />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Register",
  layout: "login",
  auth: false,
  data: () => ({
    dialog: true,
  }),
};
</script>
