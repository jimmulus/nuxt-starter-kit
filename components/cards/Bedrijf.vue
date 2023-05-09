<template>
  <v-card flat>
    <v-card-title>Bedrijfsgegevens</v-card-title>
    <v-card-text>
      <v-row>
        <v-col md="6">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Bedrijfsnaam</v-list-item-title>
              <v-list-item-subtitle>{{
                kantoor.Naam
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Telefoon</v-list-item-title>
              <v-list-item-subtitle>{{
                kantoor.Telefoon
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Adres</v-list-item-title>
              <v-list-item-subtitle>{{
                kantoor.Adres
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Postcode</v-list-item-title>
              <v-list-item-subtitle>{{
                kantoor.Postcode
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Plaats</v-list-item-title>
              <v-list-item-subtitle>{{
                kantoor.Plaats
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
  name: 'Bedrijf',
  computed: {
    kantoor() {
      return this.$store.state.account.bedrijf;
    },
  },

};
</script>

<style lang="scss" scoped>
</style>
