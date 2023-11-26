<template>
  <v-container>
    <v-card>
      <v-card-title>
        Sünnipäevad
        <v-spacer></v-spacer>
        <v-text-field
          v-model="membersListSearch"
          append-icon="mdi-magnify"
          label="Otsi"
          single-line
          hide-details
          ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="membersListHeaders"
        :items="members"
        :items-per-page="-1"
        :search="membersListSearch"
        fixed-header
        height="60vh"
        >
      </v-data-table>

    </v-card>


  </v-container>
</template>

<script>
import superagent from 'superagent';

export default {
  name: 'synnipaevad-component',
  data: () => ({
    detailsSortBy: '',
    membersListSearch: '',
    memberDetailsSearch: '',
    membersListHeaders: [
      {
        text: 'Nimi',
        value: 'name'
      },
      {
        text: 'Sünnipäev',
        value: 'birthday'
      }
    ],
    members: [],
    member: {
      id: null,
    },
    dialog: false,
  }),
  methods: {
  },
  created: function() {
      superagent.get('/api/birthdays')
        .withCredentials()
        .then((res) => {
          if (!res.body) {
            return;
          }

          this.members = res.body.data.filter(member => member.active) || [];
        });
  }
}
</script>
