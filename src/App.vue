<template>
  <div id="app">
    <div id="server_message">
      <h1 v-if="!session.linked">Welcome! your client_id: {{ my_client_id }}</h1>
      <h1 v-if="session.linked && !session.active">In session, now scan the other device</h1>
      <h1 v-if="session.active">In active session!</h1>
    </div>

    <QRComponent v-if="!session.linked" v-bind:qr_url="qr_url" />

    <ActiveSessionView v-if="session.linked"
      v-on:sendMessage="forwardMessageToSocket"
      v-bind:messages="messages" />

  </div>
</template>

<script>
/* eslint-disable */
import QRComponent from '@/components/QRComponent.vue'
import ActiveSessionView from '@/components/ActiveSessionView.vue'

export default {
  name: 'app',
  methods: {
    async forwardMessageToSocket(message) {
      await this.socket.send(JSON.stringify({
        type: 'peer_message',
        text: message
      }))
    }
  },
  mounted() {
    const hostname = window.location.host
    this.socket = new WebSocket(`ws://${hostname.split(':')[0]}:8888`);
    this.socket.onmessage = (event) => {
      console.log(event)
      const message = JSON.parse(event.data)
      switch (message.type) {
        case 'server-init':
          this.my_client_id = message.client_id;
          this.qr_url = `http://${hostname}/client/${this.my_client_id}`
          break;
        case 'linked':
          this.session.linked = true;
          this.session.active = message.session_active ? true : false;
          break;
        case 'peer_message':
          console.log(message.text)
          this.messages.push(message.text)
          break;
        default:
          console.log(message)
      }
    }
  },
  data() {
    return {
      debug: false,
      qr_url: '',
      socket: null,
      messages: [],
      my_client_id: null,
      session: {
        linked: false,
        active: false
      }
    }
  },
  components: {
    QRComponent,
    ActiveSessionView
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
