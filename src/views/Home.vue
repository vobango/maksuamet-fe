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
        fixed-header
        height="60vh"
        ></v-data-table>
    </v-card>
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
    superagent.get('/api/members')
      .withCredentials()
      .then((res) => {
        if (!res.body) {
          return;
        }

        this.members = res.body.data.map(item => ({ ...item, balance: item.balance.toFixed(2) })) || [];
      })
  }
}
</script>
