<template>
  <v-container>
    <v-card>
      <v-card-title>
        Sündmuste tabel
        <v-spacer></v-spacer>
        <v-text-field
          v-model="eventListSearch"
          append-icon="mdi-magnify"
          label="Otsi"
          single-line
          hide-details
          ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="eventListHeaders"
        :items="events"
        :items-per-page="-1"
        :search="eventListSearch"
        fixed-header
        height="60vh"
        @click:row="openEventView"
        >
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title>
          <h1>{{ event.name }} ({{ event.paid }}/{{ event.sum }})</h1>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeEventView"><v-icon large>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-title>
          <v-text-field
            v-model="eventDetailsSearch"
            append-icon="mdi-magnify"
            label="Otsi osalejat"
            single-line
            hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
          dense
          :sort-by.sync="detailsSortBy"
          :headers="eventDetailsHeaders"
          :items="event.bills"
          :items-per-page="-1"
          :search="eventDetailsSearch"
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
  name: 'events-component',
  data: () => ({
    detailsSortBy: "paid",
    eventListSearch: '',
    eventDetailsSearch: '',
    eventListHeaders: [
      {
        text: 'Sündmus',
        value: 'name'
      }
    ],
    eventDetailsHeaders: [
      {
        text: 'Osaleja',
        value: 'member'
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
    events: [],
    event: {
      name: null,
    },
    dialog: false,
  }),
  methods: {
    openEventView: function(value) {
      superagent.get(`/api/event?id=${encodeURIComponent(value.name)}`)
        .withCredentials()
        .then((res) => {
          if (!res.body) {
            return;
          }
          this.event = res.body.data;
        });
      this.dialog = true;
    },
    closeEventView: function() {
      this.dialog = false;
      this.event = {};
    }
  },
  created: function() {
    superagent.get('/api/events')
      .withCredentials()
      .then((res) => {
        if (!res.body) {
          return;
        }

        this.events = res.body.data || [];
      });
    this.dialog = false;
  }
}
</script>
