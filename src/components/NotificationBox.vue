<template>
  <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :top="true"
      :vertical="false"
    >
    {{message}}
  </v-snackbar>
</template>

<script>
export default {
  name: 'NotificationBox',
  props: {
    display_time: Number
  },
  methods: {
    displayNotification({ message, timeout = 5000 }) {
      this.message = message;
      this.timeout = timeout;
      this.snackbar = true;
    }
  },
  data() {
    return {
      timeout: 5000,
      snackbar: false,
      clear_notification_timeout: null,
      message: ''
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
