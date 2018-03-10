<template>
    <div>
        <navbar :title="this.$route.params.tour ? 'Modifier la visite' : 'Nouvelle visite'"/>
        <div class="spacer"></div>
        <div class="container" id="app">
            <div class="row">
                <div class="col s12">
                    <div class="card z-depth-2">
                        <div class="container">
                            <div class="row">
                                <div class="col s12">
                                    <div class="row">
                                        <div class="col s12">
                                            <gmap-map class="gmap"
                                                      :center="{lat: this.lat, lng: this.lng}"
                                                      :zoom="17"
                                            ></gmap-map>
                                            <a v-on:click="locate()" class="locate btn-floating btn-large waves-effect waves-light red">
                                                <i class="material-icons">my_location</i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <input :value="this.$route.params.tour ? this.$route.params.tour.adresse : ''" id="address" type="text" class="validate">
                                            <label for="address">Adresse</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <div class="select2-label">Agent</div>
                                            <i v-on:click="addAgent()" class="material-icons prefix">add</i>
                                            <select id="agent"></select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <div class="select2-label">Visiteur</div>
                                            <i v-on:click="addClient()" class="material-icons prefix">add</i>
                                            <select id="client"></select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col s12">
                                            <div class="center-align">
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


        <div id="addAgentModal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4>Nouvel agent</h4>
                <div class="container">
                    <div class="row">
                        <form class="col s12">
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">person</i>
                                    <input id="AgentFirstname" type="text" class="validate">
                                    <label for="AgentFirstname">Prénom</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">person</i>
                                    <input id="AgentLastname" type="text" class="validate">
                                    <label for="AgentLastname">Nom</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">phone</i>
                                    <input id="AgentPhone" type="tel" class="validate">
                                    <label for="AgentPhone">Téléphone</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a v-on:click="doAddAgent()" class="modal-action modal-close waves-effect waves-green btn-flat ">Ajouter</a>
            </div>
        </div>

        <div id="addClientModal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4>Nouveau visiteur</h4>
                <div class="container">
                    <div class="row">
                        <form class="col s12">
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">person</i>
                                    <input id="ClientFirstname" type="text" class="validate">
                                    <label for="ClientFirstname">Prénom</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">person</i>
                                    <input id="ClientLastname" type="text" class="validate">
                                    <label for="ClientLastname">Nom</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">phone</i>
                                    <input id="ClientPhone" type="tel" class="validate">
                                    <label for="ClientPhone">Téléphone</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a v-on:click="doAddClient()" class="modal-action modal-close waves-effect waves-green btn-flat ">Ajouter</a>
            </div>
        </div>

    </div>
</template>

<script>
/* global google, $ */

import navbar from './Navbar.vue'
import * as VueGoogleMaps from 'vue2-google-maps'

export default {
  name: 'Edit',
  components: {
    navbar,
    VueGoogleMaps
  },
  data () {
    return {
      lng: 0,
      lat: 0
    }
  },
  methods: {
    locate () {
      let geocoder = new google.maps.Geocoder()

      navigator.geolocation.watchPosition(res => {
        this.lng = res.coords.longitude
        this.lat = res.coords.latitude
        geocoder.geocode({location: {lat: this.lat, lng: this.lng}}, (results, status) => {
          if (status === 'OK') {
            $('#address').val(results[0].formatted_address)
          }
        })
      },
        e => {
          console.error(e.toString())
        },
        {
          enableHighAccuracy: true
        }
      )
    },
    addAgent () {
      $('#addAgentModal').modal()
      $('#addAgentModal').modal('open')
    },
    addClient () {
      $('#addClientModal').modal()
      $('#addClientModal').modal('open')
    },
    doAddClient () {
      let int = setInterval(this.$http.post(`${this.$config.clientApi}?first_name=${$('#ClientFirstname').val()}&last_name=${$('#ClientLastname').val()}&telephone=${$('#ClientPhone').val()}`, {}, {emulateJSON: true}).then(
          response => {
            this.clientList(response.body)
            clearInterval(int)
          }),
          10000
        )
    },
    doAddAgent () {
      let int = setInterval(this.$http.post(`${this.$config.agentApi}?first_name=${$('#AgentFirstname').val()}&last_name=${$('#AgentLastname').val()}&telephone=${$('#AgentPhone').val()}`, {}, {emulateJSON: true}).then(
        response => {
          this.agentList(response.body)
          clearInterval(int)
        }),
        10000
      )
    },
    agentList (id) {
      this.$http.get(`${this.$config.agentApi}/all`).then(response => {
          // Storage of fetched values
        localStorage.setItem('agentList', response.bodyText)

        $('#client').html('')

        Object.values(JSON.parse(response.bodyText)).forEach(agent => {
          $('#agent').append($('<option></option>')
                          .attr('value', agent.id).text(`${agent.first_name} ${agent.last_name} ${agent.telephone}`))
        })
        $('#agent').select2()

        setTimeout(() => {
          $('#agent').val(id).trigger('change')
        }, 50)
      }, () => {
        if (localStorage.getItem('agentList') != null) {
          $('#client').html('')
          Object.values(JSON.parse(localStorage.getItem('agentList'))).forEach(agent => {
            $('#agent').append($('<option></option>')
                              .attr('value', agent.id).text(`${agent.first_name} ${agent.last_name} ${agent.telephone}`))
          })
          $('#agent').select2()

          setTimeout(() => {
            $('#agent').val(id).trigger('change')
          }, 50)
        } else {
          $('#modal-title').html('Aucune connexion')
          $('#modal-text').html('Veuillez vous connecter à Internet et réessayez')
          $('#modal-button').html('Réessayez')
          $('#modal').modal()
          $('#modal').modal('open')
        }
      })
    },
    clientList (id) {
      this.$http.get(`${this.$config.clientApi}/all`).then(response => {
        // Storage of fetched values
        localStorage.setItem('clientList', response.bodyText)

        $('#client').html('')

        Object.values(JSON.parse(response.bodyText)).forEach(agent => {
          $('#client').append($('<option></option>')
                          .attr('value', agent.id).text(`${agent.first_name} ${agent.last_name} ${agent.telephone}`))
        })
        $('#client').select2()

        setTimeout(() => {
          $('#client').val(id).trigger('change')
        }, 50)
      }, () => {
        if (localStorage.getItem('clientList') != null) {
          $('#client').html('')
          Object.values(JSON.parse(localStorage.getItem('clientList'))).forEach(client => {
            $('#client').append($('<option></option>')
                                .attr('value', client.id).text(`${client.first_name} ${client.last_name} ${client.telephone}`))
          })
          $('#client').select2()

          setTimeout(() => {
            $('#client').val(id).trigger('change')
          }, 50)
        } else {
          $('#modal-title').html('Aucune connexion')
          $('#modal-text').html('Veuillez vous connecter à Internet et réessayez')
          $('#modal-button').html('Réessayez')
          $('#modal').modal()
          $('#modal').modal('open')
        }
      })
    },
    send () {
      this.$router.push(
        {
          name: 'Sign',
          params: {
            agent: $('#agent').val(),
            client: $('#client').val(),
            address: $('#address').val(),
            id: this.$route.params.tour ? this.$route.params.tour.id : undefined
          }
        }
          )
    }
  },
  created () {
    this.agentList(this.$route.params.tour ? this.$route.params.tour.id_agent : null)

    setTimeout(() => {
      this.clientList(this.$route.params.tour ? this.$route.params.tour.id_visiteur : null)
    }, 500)

    if (this.$route.params.tour) {
      let geocoder = new google.maps.Geocoder()
      let that = this
      geocoder.geocode({'address': that.$route.params.tour.adresse}, (results, status) => {
        if (status === 'OK') {
          this.lat = results[0].geometry.location.lat
          this.lng = results[0].geometry.location.lng
        }
      })
    }

    $('#modal-button').on('click', () => {
      location.reload()
    })
  }
}
</script>

<style>
</style>
