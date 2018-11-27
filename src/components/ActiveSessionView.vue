<template>
  <div id="active_session_view">
    <NotificationBox ref="notificationbox" />
    <Clips
      v-bind:messages="messages"
      v-on:copy="onCopy" />
    <form v-on:submit.prevent="sendMessage">
      <textarea rows="20" cols="100" v-model='message' />
      <input type="submit" value="send message" />
    </form>
  </div>
</template>

<script>
import NotificationBox from '@/components/NotificationBox.vue'
import Clips from '@/components/Clips.vue'

export default {
  name: 'ActiveSessionView',
  props: {
    messages: Array
  },
  methods: {
    onCopy(e) {
      let { notificationbox } = this.$refs;
      if(e) {
        notificationbox.displayNotification({ message: "Failed to copy :-(" })
        return;
      }
      notificationbox.displayNotification({ message: "Copied!", timeout: 1000 })
    },
    sendMessage() {
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
    NotificationBox,
    Clips
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
