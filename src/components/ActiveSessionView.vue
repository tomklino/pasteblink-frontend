<template>
  <div id="active_session_view">
    <div id="clips_container" ref="clips_container">
      <Clips
        v-bind:messages="messages"
        v-on:copy="onCopy" />
    </div>
    <v-layout row justify-center>
      <v-flex xs6 sm2>
        <v-btn id="send_file" color="primary" md-large xs-small ref="send_file" v-on:click.native="openFileSelection">send file</v-btn>
      </v-flex>
      <v-flex xs6 sm2>
        <v-btn id="sendbutton" color="primary" md-large xs-small v-on:click.native="sendMessage" >send snippet</v-btn>
      </v-flex>
    </v-layout>
    <input style="display: none" type="file" ref="files" id="files" name="files[]" multiple />
    <v-textarea id="pastearea" ref="pastearea" outline label="paste here" rows="12" cols="30" v-model='message' />
  </div>
</template>

<script>
import Clips from '@/components/Clips.vue'

export default {
  name: 'ActiveSessionView',
  props: {
    messages: Array
  },
  mounted() {
    this.$refs.files.addEventListener('change', (evt) => {
      const files = evt.target.files;
      const f = files[0]
      this.$emit('sendFile', f)
    }, false);
  },
  methods: {
    openFileSelection() {
      this.$refs.files.click();
    },
    onCopy(e) {
      if(e) {
        this.$emit('notification', { message: "Failed to copy :-(" })
        return;
      }
      this.$emit('notification', { message: "Copied!", timeout: 1400 })
    },
    sendMessage() {
      if(this.message === '') {
        this.$emit('notification', { message: "Paste something to send it" })
        this.$refs['pastearea'].focus()
        return;
      }
      this.$emit('sendMessage', this.message)
      this.message = '';
    }
  },
  data() {
    return {
      message: ''
    }
  },
  components: {
    Clips
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* #clips_container {
  overflow-y: scroll;
  display: block;
  height: 200px;
} */

.message_text {
  border: dotted;
  padding: 12px;
  margin-top: 6px;
  margin-bottom: 6px;
  background-color: lightgrey;
}

.message button {
  margin-left: 8px;
}

.message * {
  display: inline-block;
}
</style>
