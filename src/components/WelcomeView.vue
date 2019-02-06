<template>
  <WelcomeMessage
    v-on:show-video="showVideo()"
    v-on:close="$router.push({ name: 'main' })"
    v-bind:showing="welcome_message_showing" />
  <v-dialog v-model="video_card" width="1200px" height="680px">
    <v-card>
      <iframe width="1120" height="630" src="https://www.youtube-nocookie.com/embed/xkaPmNuDsQ8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <v-card-actions id="buttons">
        <v-btn @click="video_card=false" flat color="info">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import WelcomeMessage from '@/components/WelcomeMessage.vue'

export default {
  name: 'WelcomeView',
  data() {
    return {
      welcome_message_showing: true,
      video_card: false
    }
  },
  methods: {
    showVideo() {
      this.video_card = true;
    }
  },
  components: {
    WelcomeMessage
  }
}
</script>
