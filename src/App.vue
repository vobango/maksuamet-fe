<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-title><b>Ringi Koor</b></v-app-bar-title>
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          bg-color="primary"
          grow
        >
          <v-tab value="liikmed" to="liikmed">Liikmed</v-tab>
          <v-tab value="sündmused" to="syndmused">Sündmused</v-tab>
          <v-tab value="info" to="info">Info</v-tab>
          <v-tab value="sünnipäevad" to="synnipaevad">Sünnipäevad</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      tab: 'liikmed',
    }
  }
};
</script>

<style>
.v-main {
  background: rgb(250, 250, 255);
}
</style>
