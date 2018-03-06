<template>
    <div>
        <navbar :title="'Signature visiteur'"/>
        <div class="spacer"></div>
        <div class="container">
            <div class="row">
                <div class="col s12">
                    <div class="card z-depth-2">
                        <div class="container">
                            <div class="row">
                                <div class="container">
                                    <div class="row">
                                        <div class="col s12">
                                            <h5>Signez dans le cadre</h5>
                                        </div>
                                        <div class="col s12">
                                            <canvas id="canvas"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import navbar from './Navbar.vue'

    export default {
      name: 'Sign',
      components: {
        navbar
      },
      data () {
        return {
        }
      },
      methods: {
      },
      mounted () {
      }
    }
</script>

<style>
</style>
