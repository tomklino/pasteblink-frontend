<template>
  <div id="app">
    <div id="server_message">
      <h1 v-if="!session.linked">Welcome! your client_id: {{ my_client_id }}</h1>
      <h1 v-if="session.linked && !session.active">In session, now scan the other device</h1>
      <h1 v-if="session.active">In active session!</h1>
    </div>
    <canvas v-if="!session.linked" id="canvas" ref="qrcanvas"></canvas>
    <div id="session_view" v-if="session.linked">
      <input type="text" v-model='message' v-bind:disabled="!session.active"/>
      <input type="button" v-on:click='sendMessage' value="send message" v-bind:disabled="!session.active"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import HelloWorld from '@/components/HelloWorld.vue'
import QRCode from 'qrcode'

export default {
  name: 'app',
  methods: {
    displayQR(url) {
      console.log('trying to display', url)
      QRCode.toCanvas(this.$refs['qrcanvas'], url)
    },
    async sendMessage() {
      console.log("sending the message:", this.message)
      await this.socket.send(JSON.stringify({
        type: 'peer_message',
        text: this.message
      }))
      this.message = '';
    }
  },
  mounted() {
    this.socket = new WebSocket('ws://localhost:8888');
    this.socket.onmessage = (event) => {
      console.log(event)
      const message = JSON.parse(event.data)
      switch (message.type) {
        case 'server-init':
          this.my_client_id = message.client_id
          this.displayQR(`http://192.168.1.15:3000/client/${this.my_client_id}`)
          break;
        case 'linked':
          this.session.linked = true;
          this.session.active = message.session_active ? true : false;
          break;
        case 'peer_message':
          console.log(message.text)
          break;
        default:
          console.log(message)
      }
    }
  },
  data() {
    return {
      socket: null,
      message: '',
      my_client_id: null,
      session: {
        linked: false,
        active: false
      }
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
