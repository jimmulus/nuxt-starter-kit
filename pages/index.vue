<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>Dashboard</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-row>
          <v-col>
            <h4>Gegevens</h4>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Dashboard",
  data: () => ({}),
  computed: {
    ...mapGetters({}),
  },
  methods: {},
};
</script>
