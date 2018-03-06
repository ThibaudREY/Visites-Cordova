<template>
    <div>
        <navbar :title="'Visites'"/>
        <div class="spacer"></div>
        <div class="container" id="app">
            <tour/>
        </div>
    </div>
</template>

<script>
  import navbar from './Navbar.vue'
  import tour from './Tour.vue'

  export default {
    name: 'List',
    components: {
      navbar,
      tour
    },
    mounted () {
      this.tours = null
    }
  }
</script>

<style>
</style>
