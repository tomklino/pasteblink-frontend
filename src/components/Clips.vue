<template>
  <div>
    <v-layout id="clips" ref="clips" justify-center row wrap>
      <v-flex xs4 class="message pa-2" v-for="(message, index) in messages" :key="index">
        <v-card color="blue-grey darken-2" class="white--text">
          <v-card-title primary-title>
            <div class="message_text">
              {{messagePreview(message)}}
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary"
                v-clipboard:copy="message"
                v-clipboard:success="emitCopy"
                v-clipboard:error="emitCopyError">
                  Copy
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

</style>
