<template>
  <v-row>
    <v-col>
    <h2>Data</h2>
        <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
    :headers="headers"
    :items="listData"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:item.download>
      <v-btn
        class="ma-2"
        color="green"
        dark
        small
        href="/download.pdf"
        target="_blank"

      >PDF&nbsp;
        <v-icon dark>
          mdi-cloud-download
        </v-icon>
      </v-btn>
    </template>
  </v-data-table>
  </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MijnFacturen',
  auth: false,
    data () {
      return {
        search: '',
      }
    },
      computed: {
    listData () {
      return this.$store.state.data.list;
    },
    headers () {
      return this.$store.state.data.headers;
    },
  },
    methods: {
      async downloadPdf (file) {
        await this.$axios.$post('/api/download', {file}, {responseType: 'blob'}).then((response) => {
          var fileURL = window.URL.createObjectURL(response);
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', file);
          document.body.appendChild(fileLink);
          fileLink.setAttribute('target', '_blank');
          fileLink.click();
        })
      }
    }
  }
</script>
