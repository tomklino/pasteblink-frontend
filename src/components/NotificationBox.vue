<template>
  <div id="notifications">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'NotificationBox',
  props: {
    display_time: Number
  },
  methods: {
    displayNotification({ message, timeout = 5000 }) {
      console.log("displaying message")
      this.message = message;
      this.clearNotification(timeout)
    },
    clearNotification(after) {
      if(this.clear_notification_timeout) {
        clearTimeout(this.clear_notification_timeout)
      }
      this.clear_notification_timeout = setTimeout(() => {
        this.message = '';
      }, after)
    }
  },
  data() {
    return {
      clear_notification_timeout: null,
      message: ''
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
