<template>
  <v-container>
    <v-card>
      <v-card-title>
        Liikmete tabel
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
        @click:row="openMemberView"
        >
      </v-data-table>
      <div class="text-right mx-8 py-4 font-weight-bold text-h5">Bilanss kokku: {{ totalBalance }}</div>
    </v-card>

    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title>
          <h1>{{ member.name }} ({{ member.balance }})</h1>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeMemberView"><v-icon large>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-title>
          <v-text-field
            v-model="memberDetailsSearch"
            append-icon="mdi-magnify"
            label="Otsi arvet"
            single-line
            hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
          dense
          :sort-by.sync="detailsSortBy"
          :headers="memberDetailsHeaders"
          :items="member.bills"
          :items-per-page="-1"
          :search="memberDetailsSearch"
          fixed-header
          height="60vh"
        >
        </v-data-table>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import superagent from 'superagent';

export default {
  name: 'members-component',
  data: () => ({
    detailsSortBy: "paid",
    membersListSearch: '',
    memberDetailsSearch: '',
    membersListHeaders: [
      {
        text: 'Nimi',
        value: 'name'
      },
      {
        text: 'Bilanss',
        value: 'balance'
      }
    ],
    memberDetailsHeaders: [
      {
        text: 'Arve',
        value: 'description'
      },
      {
        text: 'Makstud',
        value: 'paid'
      },
      {
        text: 'Summa',
        value: 'amount'
      }
    ],
    members: [],
    member: {
      id: null,
    },
    dialog: false,
    totalBalance: "0 €",
  }),
  methods: {
    openMemberView: function(value) {
      superagent.get(`/api/member?id=${value.id}`)
        .withCredentials()
        .then((res) => {
          if (!res.body) {
            return;
          }
          this.member = res.body.data;
        });
      this.dialog = true;
    },
    closeMemberView: function() {
      this.dialog = false;
      this.member = {};
    }
  },
  created: function() {
    superagent.get('/api/members')
      .withCredentials()
      .then((res) => {
        if (!res.body) {
          return;
        }

        this.members = res.body.data || [];
      });
    superagent.get('/api/totalBalance')
      .withCredentials()
      .then((res) => {
          if (!res.body) return;

          this.totalBalance = res.body.data;
      })
    this.dialog = false;
  }
}
</script>
