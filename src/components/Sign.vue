<template>
  <div>
    <navbar :title="`Signature ${this.role}`"/>
    <div class="spacer"></div>
    <div class="container">
      <div class="row">
        <div class="col s12">
          <div class="card z-depth-2">
            <div class="container">
              <div class="modal-content">
                <h4>Signez dans le cadre</h4>
                <p>En signant vous reconnaissez avoir visité le bien situé au {{ this.$route.params.address }}</p>
                <div class="row">
                  <canvas id="signature"></canvas>
                </div>
                <div class="row">
                  <div class="col s12">
                    <div class="center-align">
                      <button v-on:click="clear()" class="btn waves-effect waves-light">Effacer
                        <i class="material-icons right">clear</i>
                      </button>
                      <button v-on:click="send()" class="btn waves-effect waves-light">Confirmer
                        <i class="material-icons right">send</i>
                      </button>
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
  /* global SignaturePad */
  import navbar from './Navbar.vue'

  export default {
    name: 'Sign',
    components: {
      navbar
    },
    data () {
      return {
        clientSignature: null,
        agentSignature: null,
        role: 'Agent'
      }
    },
    methods: {
      clear () {
        this.signaturePad.clear()
      },
      send () {
        if (!this.signaturePad.isEmpty()) {
          if (this.clientSignature === null) {
            this.clientSignature = this.signaturePad.toDataURL('image/jpeg')
            this.role = 'Visiteur'
            this.signaturePad.clear()
          } else if (this.agentSignature === null) {
            this.agentSignature = this.signaturePad.toDataURL('image/jpeg')
            this.$router.push(
              {
                name: 'List',
                params: {
                  agent: this.$route.params.agent,
                  client: this.$route.params.client,
                  address: this.$route.params.address,
                  clientSignature: this.clientSignature,
                  agentSignature: this.agentSignature,
                  id: this.$route.params.id
                }
              }
            )
          }
        }
      }
    },
    created () {
      setTimeout(() => {
        let canvas = document.querySelector('#signature')
        this.signaturePad = new SignaturePad(canvas)
        this.signaturePad.clear()
      }, 100)
    }
  }
</script>

<style>
</style>
