<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <input type="text" v-model='message' />
    <input type="button" v-on:click='sendMessage' value="send message" />
  </div>
</template>

<script>
/* eslint-disable */
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'app',
  methods: {
    async sendMessage() {
      console.log("sending the message:", this.message)
      await this.socket.send(this.message)
      this.message = '';
    }
  },
  mounted() {
    this.socket = new WebSocket('ws://localhost:8888');
    this.socket.onmessage = (data) => {
      console.log('got a message:', data)
    }
  },
  data() {
    return {
      socket: null,
      message: ''
    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
