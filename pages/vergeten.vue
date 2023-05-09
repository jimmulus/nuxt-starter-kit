<template>
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <div>
      <v-card>
        <v-toolbar color="blue" dark class="mb-5">
          <v-toolbar-title
            >{{ $config.PROJECT_NAME }} | Verzoek tot nieuw
            wachtwoord</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <FormsForgot />
        </v-card-text>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "WachtwoordVergeten",
  layout: "login",
  auth: false,
  data: () => ({
    dialog: true,
  }),
};
</script>
