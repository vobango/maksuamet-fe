<template>
  <v-container>
    <div class="d-flex flex-column flex-md-row">
      <v-card class="mr-md-4 mb-4 flex-grow-1">
        <v-card-title>Liikmemaks</v-card-title>
        <v-card-text>
          <p>
            Igakuine liikmemaks on<br /> 
            <strong>
              5€ - tudeng/õpilane/vabakutseline<br />
              8€ - kõik teised
            </strong>
          </p>
            <p>
              Koori hooaeg kestab sept-mai (k.a.) see on siis 9 kuud.<br />
              Kui on laulupeo aasta või mõni muu suvine projekt, mille jaoks tuleb ka juunis proove teha, siis 10 kuud.<br />
              Uutele lauljatele on esimene kuu tasuta, nimetagem seda siis tutvumiskuuks.
            </p>
        </v-card-text>
      </v-card>

      <v-card class="flex-grow-1 mb-4">
        <v-card-title>Panga rekvisiidid</v-card-title>
        <v-card-text>
          <v-list-item class="pl-0 mb-2">
            <div>
              <v-list-item-subtitle>Saaja</v-list-item-subtitle>
              <v-list-item-title>RINGI KOOR</v-list-item-title>
            </div>
          </v-list-item>
          <v-list-item class="pl-0 mb-2">
            <div>
              <v-list-item-subtitle>Konto nr</v-list-item-subtitle>
              <v-list-item-title>EE832200221051109700</v-list-item-title>
            </div>
          </v-list-item>
          <v-list-item class="pl-0 mb-2">
            <div>
              <v-list-item-subtitle>Reg nr</v-list-item-subtitle>
              <v-list-item-title>80318897</v-list-item-title>
            </div>
          </v-list-item>
        </v-card-text>
      </v-card>
    </div>

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
      <div class="text-right mx-8 py-4 font-weight-bold text-h5">Bilanss kokku: {{ totalBalance }} €</div>
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
  name: 'home-component',
  data: () => ({
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
  }),
  methods: {
    openMemberView: function(value) {
      superagent.get(`/api/member?id=${value.id}`)
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
    this.dialog = false;
  },
  computed: {
    totalBalance: function() {
      return this.members.reduce((sum, member) => {
        return sum + parseFloat(member.balance);
      }, 0).toFixed(2);
    }
  }
}
</script>
