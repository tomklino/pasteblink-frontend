<template>
  <v-app id="app">
    <WelcomeMessage v-on:show-video="showVideo()" v-bind:showing="welcome_message_showing" />
    <v-toolbar color="indigo" dark fixed >
      <v-toolbar-title>PasteBlink - CopyPaste between devices</v-toolbar-title>
    </v-toolbar>
    <div id="early_alpha_message">
      Early alpha - currenty only supports Computer to Computer (same room)
    </div>
    <div id="server_message">
      <h1 v-if="session.active">In active session!</h1>
    </div>

    <QRComponent v-if="!session.linked" v-bind:qr_url="qr_url" />
    <HowtoQuestionMark ref="howto" />
    <ActiveSessionView v-if="session.active"
      v-on:sendMessage="forwardMessageToSocket"
      v-on:sendFile="sendFile"
      v-bind:messages="messages" />

    <Instructions ref="instructions" v-if="!session.active"/>
  </v-app>
</template>

<script>
/* eslint-disable */
import QRComponent from '@/components/QRComponent.vue'
import ActiveSessionView from '@/components/ActiveSessionView.vue'
import Instructions from '@/components/Instructions.vue'
import HowtoQuestionMark from '@/components/HowtoQuestionMark.vue'
import WelcomeMessage from '@/components/WelcomeMessage.vue'

export default {
  name: 'app',
  methods: {
    async forwardMessageToSocket(message) {
      await this.socket.send(JSON.stringify({
        type: 'peer_message',
        text: message
      }))
    },
    async sendFile(file) {
      const reader = new FileReader();
      const upload_id = this.pending_uploads.push(reader) - 1
      console.log('hello from sendFile')
      reader.onload = () => {
        console.log('loaded')
        console.log(this.socket)
        this.socket.send(JSON.stringify({
          type: 'file',
          filename: file.name,
          local_id: upload_id
        }))
      }
      reader.readAsArrayBuffer(file)
    },
    showVideo() {
      this.welcome_message_showing = false;
      this.$refs.howto.launchDialog();
    }
  },
  mounted() {
    const hostname = window.location.host
    const protocol = window.location.protocol
    const wsProto = protocol === "https:" ? "wss" : "ws"
    this.socket = new WebSocket(`${wsProto}://${hostname.split(':')[0]}:8888`);
    this.socket.onmessage = (event) => {
      console.log(event)
      const message = JSON.parse(event.data)
      switch (message.type) {
        case 'server-init':
          this.my_client_id = message.client_id;
          this.qr_url = `${protocol}//${hostname}/client/${this.my_client_id}`
          break;
        case 'linked':
          this.session.linked = true;
          this.session.active = message.session_active ? true : false;
          this.$refs.instructions.toStep(message.session_active ? 3 : 2)
          break;
        case 'peer_message':
          console.log(message.text)
          this.messages.push({ type: 'plaintext', content: message.text })
          break;
        case 'upload':
          const { upload_url, upload_id } = message;
          if(upload_url === undefined || upload_id === undefined) {
            console.log('no upload_url or upload_id provided')
            console.log(message)
            return;
          }
          const oReq = new XMLHttpRequest();
          oReq.open("POST", upload_url, true);
          oReq.onload = (oEvent) => {
            console.log('uploaded')
            this.pending_uploads.splice(upload_id, 1)
          };

          oReq.send(this.pending_uploads[upload_id].result)
          break;
        case 'file':
          console.log('file message');
          this.messages.push({
            type: 'file',
            filename: message.filename,
            download_url: message.download_url
          })
          break;
        default:
          console.log("unrecognized type", message)
      }
    }
  },
  data() {
    return {
      welcome_message_showing: true,
      debug: false,
      qr_url: '',
      socket: null,
      messages: [],
      pending_uploads: [],
      my_client_id: null,
      session: {
        linked: false,
        active: false
      }
    }
  },
  components: {
    QRComponent,
    ActiveSessionView,
    Instructions,
    HowtoQuestionMark,
    WelcomeMessage
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
