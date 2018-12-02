<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">step 1</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2">step 2</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card color="grey lighten-1" class="mb-5" height="200px">
            <v-card-title primary-title>
              <h3>Scan the barcode with your phone, and tap the link</h3>
            </v-card-title>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card color="grey lighten-2" class="mb-5" height="200px">
            <v-card-title primary-title>
              <h3>Open {{hostname}} in the other computer - and scan its barcode using the same phone</h3>
              <div>if you are only testing, open in a new tab or window on the same computer</div>
            </v-card-title>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
export default {
  name: 'Instructions',
  methods: {
    toStep(step) {
      this.e1 = step;
    }
  },
  created() {
    this.hostname = window.location.host;
  },
  data() {
    return {
      hostname: '',
      e1: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
