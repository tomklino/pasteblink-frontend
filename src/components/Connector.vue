<template>
  <div>
    <div v-if="done">
      <h1>All done!</h1>
    </div>
    <div v-else>
      <v-btn block color="primary" v-on:click="connectSelf">connect to this device</v-btn>
      <div>or</div>
      <v-btn block color="primary" v-on:click="scanner_on = true;">connect to another desktop</v-btn>
      <qrcode-stream v-if="scanner_on" @decode="onDecode" @init="onInit"></qrcode-stream>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  name: 'Connector',
  data() {
    return {
      scanner_on: false,
      done: false
    }
  },
  methods: {
    async onInit(promise) {
      console.log('inited!')
      try {
        await promise
        console.log("and done!");
      } catch (e) {
        console.log(e)
      }
    },
    onDecode(decoded_string) {
      console.log(decoded_string);
      const hostname = window.location.host
      const protocol = window.location.protocol
      const base_string = `${protocol}//${hostname}/`
      if(decoded_string.indexOf(base_string) === 0) {
        let url_parts = decoded_string.split('/');
        let client_id = url_parts[url_parts.length - 1]
        this.clientConnect(client_id)
      }
    },
    connectSelf() {
      this.$root.connect_self = true;
      this.$router.replace({ name: 'main' })
    },
    clientConnect(client_id) {
      console.log('clientConnect: ' + client_id)
      const hostname = window.location.host
      const protocol = window.location.protocol
      fetch(`${protocol}//${hostname}/client/${client_id}`)
        .then((res) => {
          if(res.status === 201) {
            console.log("all done");
            this.done = true;
          }
          console.log('got ok')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted() {
    if(this.$route.params['client_id']) {
      this.clientConnect(this.$route.params['client_id'])
    }
  },
  components: {
    QrcodeStream
  }
}

</script>


<style scoped>

</style>
