<template>
  <v-card flat>
    <v-card-title>Mijn gegevens</v-card-title>
    <v-card-text>
      <v-row>
        <v-col md="6">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Naam</v-list-item-title>
              <v-list-item-subtitle>{{
                gegevens.Naam
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Geslacht</v-list-item-title>
              <v-list-item-subtitle>{{
                gegevens.Geslacht
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Mobiele Telefoon</v-list-item-title>
              <v-list-item-subtitle>{{
                gegevens.Mobiel
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Email</v-list-item-title>
              <v-list-item-subtitle>{{
                gegevens.Email
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Functie</v-list-item-title>
              <v-list-item-subtitle>{{
                gegevens.Functie
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      //dialog: false,
    };
  },
  computed: {
    gegevens() {
      return this.$store.state.account.account;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
