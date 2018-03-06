<template>
  <router-view/>
</template>

<script>
  import Vue from 'vue'
  export default {
    data () {
      return {
        cordova: Vue.cordova,
        clipped: false,
        drawer: true,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Visite'
      }
    }
  }
</script>

<style>
</style>
