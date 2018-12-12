<template>
  <div id="howto">
    <v-tooltip bottom v-model="show_help_tooltip" >
      <v-icon
        ref="help_icon"
        slot="activator"
        :color="help_icon_color"
        @click="launchDialog"
        medium
        dark
      >help</v-icon>
      <span>How to use ClipBird</span>
    </v-tooltip>
    <v-dialog v-model="video_card" width="1200px" height="680px">
      <v-card>
        <iframe width="1120" height="630" src="https://www.youtube-nocookie.com/embed/xkaPmNuDsQ8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <v-card-actions id="buttons">
          <v-btn @click="video_card=false" flat color="info">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'HowtoQuestionMark',
  mounted() {
    setTimeout(() => {
      this.show_help_tooltip = false;
      this.help_icon_color = 'grey';
    }, 3000)
  },
  data() {
    return {
      show_help_tooltip: true,
      help_icon_color: 'blue',
      video_card: false
    }
  },
  methods: {
    launchDialog() {
      this.video_card = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#howto {
  min-height: 75px;
}

#buttons {
  display: flex;
  justify-content: flex-end;
}

</style>
