<template>
  <WelcomeMessage
    v-on:show-video="showVideo()"
    v-on:close="$router.push({ name: 'main' })"
    v-bind:showing="welcome_message_showing" />
</template>

<script>
import WelcomeMessage from '@/components/WelcomeMessage.vue'

export default {
  name: 'WelcomeView',
  data() {
    return {
      welcome_message_showing: true
    }
  },
  methods: {
    showVideo() {
      console.log("showVideo: STUB")
    }
  },
  components: {
    WelcomeMessage
  }
}
</script>
