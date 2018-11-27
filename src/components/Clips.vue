<template>
  <div id="clips">
    <div class="message" v-for="(message, index) in messages" :key="index">
      <div class="message_text">{{message}}</div>
      <v-btn color="primary"
            v-clipboard:copy="message"
            v-clipboard:success="emitCopy"
            v-clipboard:error="emitCopyError">Copy!</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Clips',
  props: {
    messages: Array
  },
  methods: {
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
