<template>
  <div>
    <v-row>
      <v-col md="12"><h2>Account details</h2></v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-card>
          <v-tabs v-model="tab" background-color="blue" dark icons-and-text>
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#naw">
              Mijn Gegevens
              <v-icon>mdi-account-box</v-icon>
            </v-tab>

            <v-tab href="#bedrijf">
              Bedrijfsgegevens
              <v-icon>mdi-home</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item value="naw">
              <CardsAccount />
            </v-tab-item>
            <v-tab-item value="bedrijf">
              <CardsBedrijf />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      tab: null,
    };
  },
};
</script>
