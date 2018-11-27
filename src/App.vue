<template>
  <div id="app">
    <h1>HI</h1>
    <div id="notifications">
      {{ last_notification }}
    </div>
    <div id="server_message">
      <h1 v-if="!session.linked">Welcome! your client_id: {{ my_client_id }}</h1>
      <h1 v-if="session.linked && !session.active">In session, now scan the other device</h1>
      <h1 v-if="session.active">In active session!</h1>
    </div>
    <Clips v-if="session.active" v-bind:messages="messages"
      v-on:copy="onCopy"></Clips>
    <QRComponent v-if="!session.linked" v-bind:qr_url="qr_url" />
    <div id="session_view" v-if="session.linked">
      <form v-on:submit.prevent="sendMessage">
        <textarea rows="20" cols="100" v-model='message' v-bind:disabled="!session.active"/>
        <input type="submit" value="send message" v-bind:disabled="!session.active"/>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Clips from '@/components/Clips.vue'
import QRComponent from '@/components/QRComponent.vue'

export default {
  name: 'app',
  methods: {
    onCopy(e) {
      if(e) {
        this.last_notification = "Failed to copy :-("
        this.clearNotification();
        return;
      }
      this.last_notification = "Copied!"
      this.clearNotification()
    },
    clearNotification(opts) {
      const { after = 1000 } = opts || {};
      console.log(after)
      if(this.clear_notification_timeout) {
        clearTimeout(this.clear_notification_timeout)
      }
      this.clear_notification_timeout = setTimeout(() => {
        this.last_notification = '';
      }, after)
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
      clear_notification_timeout: null,
      socket: null,
      last_notification: null,
      message: '',
      messages: [],
      my_client_id: null,
      session: {
        linked: false,
        active: false
      }
    }
  },
  components: {
    Clips,
    QRComponent
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
