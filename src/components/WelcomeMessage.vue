<template>
  <div id="welcome">
    <v-dialog v-model="show_message" @input="onDialogInput" max-width="700px">
      <v-card v-if="!showing_video">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Heya!</h3>
            <v-divider />
            <div id="content">
              <p>
                ClipBird is a shared clipboard in a webapp.<br>
              </p>
              <p>
                It is designed to help teamwork efforts by allowing
                people working on two different devices,
                to copy text or code snippets, as well as transferring files,
                between their devices<br>
              </p>
              <p>
                It does not require any installation and works
                on Mac, Windows and Linux, right out of the browser.<br>
                It also requires no prior setup between the people using it,
                so it is particularly useful in hackathons and pair-programming
                sessions, when you just met the person you're working with.<br>
              </p>
              <p>
                ClipBird is in a very early alpha version, and may not always
                work as expected. Please try it out
                and leave a feedback with your suggestion to improve.<br>
              </p>
            </div>
          </div>
        </v-card-title>

        <v-card-actions id="buttons">
          <v-btn id="show_video_button" @click="showing_video=true" flat color="info">Show me how it works!</v-btn>
          <v-btn id="gotit_button" @click="handleCloseButton" flat color="success">Got it!</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="showing_video">
        <iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/xkaPmNuDsQ8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <v-card-actions id="buttons">
          <v-btn @click="handleCloseButton" flat color="info">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'WelcomeMessage',
  props: {
    showing: Boolean
  },
  methods: {
    handleCloseButton() {
      this.show_message = false;
      this.$emit('close');
    },
    onDialogInput() {
      console.log('dialog input!')
      if(this.show_message === false) {
        this.$emit('close')
      }
    }
  },
  data() {
    return {
      showing_video: false,
      show_message: this.showing
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  text-align: left;
}

#buttons {
  display: flex;
  justify-content: flex-end;
}

#content {
  margin: 9px;
  font-size: 17px;
}
</style>
