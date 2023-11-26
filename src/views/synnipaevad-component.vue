<template>
  <v-container>
    <v-card>
      <v-sheet
          tile
          height="54"
          class="d-flex"
          >
          <v-btn
              icon
              class="ma-2"
              @click="$refs.calendar.prev()"
              >
              <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title tag="h2">{{ currentMonth }} {{ currentYear }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            icon
            class="ma-2"
            @click="$refs.calendar.next()"
            >
            <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-sheet>

      <v-sheet height="600">
        <v-calendar
            ref="calendar"
            v-model="value"
            event-overlap-mode="column"
            event-color="blue"
            color="light-blue"
            locale="et"
            type="month"
            :weekdays="weekday"
            :events="events"
            @change="getEvents"
            ></v-calendar>
      </v-sheet>
    </v-card>


  </v-container>
</template>

<script>
import superagent from 'superagent';

export default {
  name: 'synnipaevad-component',
  data: () => ({
    members: [],
    events: [],
    months: [
      'Jaanuar',
      'Veebruar',
      'Märts',
      'Aprill',
      'Mai',
      'Juuni',
      'Juuli',
      'August',
      'September',
      'Oktoober',
      'November',
      'Detsember',
    ],
    currentMonth: '',
    currentYear: '',
    value: '',
    weekday: [1, 2, 3, 4, 5, 6, 0],
  }),
  methods: {
    createEvents(startDay) {
      const today = new Date(startDay);
      const currentMonth = today.getMonth();
      const year = today.getFullYear();
      const birthdaysThisMonth = this.members.filter(member => {
        const [day, month] = member.birthday.split('.');
        const birthday = new Date(year, month - 1, day);

        return birthday.getMonth() === currentMonth;
      }).map(member => {
        const [day] = member.birthday.split('.');
        const eventDay = new Date(year, currentMonth, day);

        return {
          name: member.name,
          color: member.active ? 'blue' : 'grey',
          start: eventDay,
          end: eventDay,
          timed: false,
        }
      });

      this.events = birthdaysThisMonth;
    },
    getEvents({ start }) {
      this.createEvents(start.date);

      this.currentMonth = this.months[start.month - 1];
      this.currentYear = start.year;
    },
  },
  created: function() {
      superagent.get('/api/birthdays')
        .withCredentials()
        .then((res) => {
          if (!res.body) {
            return;
          }

          this.members = res.body.data || [];

          this.createEvents(new Date());

          const today = new Date();
          this.currentMonth = this.months[today.getMonth()];
          this.currentYear = today.getFullYear();
        });
  }
}
</script>

<style scoped>
h2 {
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
