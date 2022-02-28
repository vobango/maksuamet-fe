<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <h1>MTÜ Ringi Koor maksuamet</h1>
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
};
</script>

<style>
.v-main {
  background: rgb(250, 250, 255);
}
</style>
