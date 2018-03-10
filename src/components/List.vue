<template>
    <div>
        <navbar :title="'Visites'"/>
        <div class="spacer"></div>
        <div class="container" id="app">
            <tour v-for="tour in this.tours" :tour="tour" />
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
    data () {
      return {
        tours: null
      }
    },
    methods: {
      loadList () {
        this.$http.get(`${this.$config.tourApi}/all`).then(res => {
          this.tours = JSON.parse(res.bodyText)
        })
      },
      startup () {
        this.loadList()
        if (
          this.$route.params.agent !== undefined &&
          this.$route.params.client !== undefined &&
          this.$route.params.address !== undefined &&
          this.$route.params.clientSignature !== undefined &&
          this.$route.params.agentSignature !== undefined
        ) {
          if (this.$route.params.id !== undefined) {
            let int = setInterval(() => {
              this.$http.put(`${this.$config.tourApi}/${this.$route.params.id}`, {
                id_agent: this.$route.params.agent,
                id_visiteur: this.$route.params.client,
                date_visite: new Date().toDateString(),
                signature_visiteur: this.$route.params.clientSignature,
                signature_agent: this.$route.params.agentSignature,
                adresse: this.$route.params.address
              }).then(response => {
                clearInterval(int)
                this.loadList()
              })
            }, 800)
          } else {
            let int = setInterval(() => {
              this.$http.post(`${this.$config.tourApi}`, {
                id_agent: this.$route.params.agent,
                id_visiteur: this.$route.params.client,
                date_visite: new Date().toDateString(),
                signature_visiteur: this.$route.params.clientSignature,
                signature_agent: this.$route.params.agentSignature,
                adresse: this.$route.params.address
              }).then(response => {
                clearInterval(int)
                this.loadList()
              })
            }, 800)
          }
        }
      }
    },
    mounted () {
      this.startup()
    }
  }
</script>

<style>
</style>
