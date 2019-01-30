<template>
  <div>
    <v-layout id="clips" ref="clips" justify-left row wrap>
      <v-flex xs4 class="message pa-2" v-for="(message, index) in messages" :key="index">
        <v-card v-if="message.type === 'plaintext'" color="blue-grey darken-2" class="white--text clipcard">
          <v-card-title primary-title>
            <div class="message_text">
              {{messagePreview(message.content)}}
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary"
                v-clipboard:copy="message.content"
                v-clipboard:success="emitCopy"
                v-clipboard:error="emitCopyError">
                  <v-icon>file_copy</v-icon> &nbsp Copy
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-if="message.type === 'file'" color="blue-grey darken-2" class="white--text clipcard">
          <v-card-title primary-title>
            <div class="message_text">
              {{message.filename}}
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn v-on:click="download" color="primary">
              <a style="display: hidden"
                v-bind:href="message.download_url" v-bind:download="message.filename"></a>
                  <v-icon>save</v-icon> &nbsp Save file
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'Clips',
  props: {
    messages: Array
  },
  updated() {
    this.$scrollTo(this.$refs.clips.lastElementChild, 500, { container: "#clips" })
  },
  methods: {
    download(evt) {
      console.log("download called")
      console.log(evt)
      evt.target.querySelector('a').click()
    },
    messagePreview(msg) {
      return msg.length > 50 ?
        msg.substring(0, 50) + '...' :
        msg
    },
    emitCopy() {
      this.$emit('copy')
    },
    emitCopyError() {
      this.$emit('copy', new Error('Copy Error'))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#clips {
  overflow-y: auto;
  height: 200px;
}

.clipcard .message_text {
  height: 90px;
}
</style>
