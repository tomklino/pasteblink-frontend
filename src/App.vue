<template>
  <v-app id="app">
    <v-toolbar color="indigo" dark fixed >
      <v-toolbar-title>PasteBlink - CopyPaste between devices</v-toolbar-title>
    </v-toolbar>
    <router-view/>
  </v-app>
</template>

<script>
  export default {
    name: "App",
    metaInfo: {
      meta: [
        { charset: 'utf-8' },
        { name: 'description', content: 'cilpbird creates a linke between two devices to share text or code snippets and transfer files' }
      ]
    }
  }
</script>

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
