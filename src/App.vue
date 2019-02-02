<template>
  <v-app id="app">
    <v-toolbar color="indigo" dark fixed >
      <v-toolbar-title>PasteBlink - CopyPaste between devices</v-toolbar-title>
    </v-toolbar>
    <router-view/>
  </v-app>
</template>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
