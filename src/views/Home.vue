<template>
  <v-container>
    <v-card-title>
      Liikmete tabel
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Otsi"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="members"
      :items-per-page="-1"
      :search="search"
      dense
      ></v-data-table>
  </v-container>
</template>

<script>
import superagent from 'superagent';


  export default {
    name: 'Home',
    data: () => ({
      search: '',
      headers: [
        {
          text: 'Nimi',
          value: 'name'
        },
        {
          text: 'Bilanss',
          value: 'balance'
        }
      ],
      members: []
    }),
    created: function() {
      superagent.get('http://localhost:8001/api/members')
        .withCredentials()
        .then((res) => {
          this.members = res.body.data.map(item => ({ ...item, balance: item.balance.toFixed(2) })) || [];
        })
    }
  }
</script>
