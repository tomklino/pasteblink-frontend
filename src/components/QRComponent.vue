<template>
  <div id="qr_component">
    <canvas id="canvas" ref="qrcanvas"></canvas>
    <div id="qr_url" v-bind:hidden="!debug">{{qr_url}}</div>
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
  name: 'QRComponent',
  props: {
    qr_url: String,
    debug: String
  },
  methods: {
    displayQR(url) {
      QRCode.toCanvas(this.$refs['qrcanvas'], url)
    }
  },
  watch: {
    qr_url: function(url) {
      this.displayQR(url)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
