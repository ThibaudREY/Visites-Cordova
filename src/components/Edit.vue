<template>
  <div>
    <navbar :title="this.$route.params.tour !== undefined ? 'Modifier la visite' : 'Nouvelle visite'"/>
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
                      <input :value="this.$route.params.tour ? this.$route.params.tour.adresse : ''" id="address"
                             type="text" class="validate">
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
                        <button v-on:click="pdf()" class="btn waves-effect waves-light">Voir le document
                          <i class="material-icons right">send</i>
                        </button>
                        <button v-on:click="send()" class="btn waves-effect waves-light">Signer
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

    <div id="updateAgentModal" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Modifier un agent</h4>
        <div class="container">
          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">person</i>
                  <input id="updateAgentFirstname" type="text" class="validate">
                  <label for="updateAgentFirstname">Prénom</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">person</i>
                  <input id="updateAgentLastname" type="text" class="validate">
                  <label for="updateAgentLastname">Nom</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">phone</i>
                  <input id="updateAgentPhone" type="tel" class="validate">
                  <label for="updateAgentPhone">Téléphone</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a v-on:click="doUpdateAgent()" class="modal-action modal-close waves-effect waves-green btn-flat ">Modifier</a>
      </div>
    </div>

    <div id="updateClientModal" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Modifier un visiteur</h4>
        <div class="container">
          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">person</i>
                  <input id="updateClientFirstname" type="text" class="validate">
                  <label for="updateClientFirstname">Prénom</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">person</i>
                  <input id="updateClientLastname" type="text" class="validate">
                  <label for="updateClientLastname">Nom</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">phone</i>
                  <input id="updateClientPhone" type="tel" class="validate">
                  <label for="updateClientPhone">Téléphone</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a v-on:click="doUpdateClient()" class="modal-action modal-close waves-effect waves-green btn-flat ">Modifier</a>
      </div>
    </div>

    <div id="deleteClientModal" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Supprimer un visiteur</h4>
        <div class="container">
          <div class="row">
            Êtes vous sûr de vouloir supprimer le visiteur:
            <p id="deleteClientString"></p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a v-on:click="doDeleteClient()" class="modal-action modal-close waves-effect waves-green btn-flat ">Supprimer</a>
      </div>
    </div>

    <div id="deleteAgentModal" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Supprimer un visiteur</h4>
        <div class="container">
          <div class="row">
            Êtes vous sûr de vouloir supprimer l'agent:
            <p id="deleteAgentString"></p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a v-on:click="doDeleteAgent()" class="modal-action modal-close waves-effect waves-green btn-flat ">Supprimer</a>
      </div>
    </div>
  </div>
</template>

<script>
  /* global google, $ */

  import navbar from './Navbar.vue'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import doc from '../utils/doc'
  import file from '../utils/file'

  export default {
    name: 'Edit',
    components: {
      navbar,
      VueGoogleMaps
    },
    data () {
      return {
        // Coordonées du centre de la map
        lng: 0,
        lat: 0,
        updateClientId: null,
        updateAgentId: null,
        deleteClientId: null,
        deleteAgentId: null,
        agent: null,
        client: null
      }
    },
    methods: {
      // Ajoute les icônes de modification et suppression sur le select2
      iconFormatSelect2 (item) {
        return $(`<div>${item.text} <div class="iconRight"><i class="material-icons prefix edit" id="${item.id}">edit</i><i class="material-icons prefix delete" id="${item.id}">delete</i></div></div>`)
      },
      // Centre la map sur la position GPS courante
      locate () {
        let geocoder = new google.maps.Geocoder()

        navigator.geolocation.watchPosition(
          res => {
            // Fetch de la position avec geolocation du browser qui est bind
            // avec les service de localisation matériel sur mobile
            this.lng = res.coords.longitude
            this.lat = res.coords.latitude

            // Conversion des coordonées en adresse
            geocoder.geocode(
              {location: {lat: this.lat, lng: this.lng}},
              (results, status) => {
                if (status === 'OK') {
                  // Affectation de l'adresse à son champ
                  $('#address').val(results[0].formatted_address).trigger('focusin')
                }
              }
            )
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
        // TODO: Mettre à jour l'API pour passer les params en post
        let int = setInterval(this.$http.post(`${this.$config.clientApi}?first_name=${$('#ClientFirstname').val()}&last_name=${$('#ClientLastname').val()}&telephone=${$('#ClientPhone').val()}`, {}, {emulateJSON: true}).then(
          response => {
            this.clientList(response.body)
            clearInterval(int)
          }),
          800
        )
      },
      doAddAgent () {
        // TODO: Mettre à jour l'API pour passer les params en post
        let int = setInterval(this.$http.post(`${this.$config.agentApi}?first_name=${$('#AgentFirstname').val()}&last_name=${$('#AgentLastname').val()}&telephone=${$('#AgentPhone').val()}`, {}, {emulateJSON: true}).then(
          response => {
            this.agentList(response.body)
            clearInterval(int)
          }),
          800
        )
      },
      doDeleteClient () {
        let int = setInterval(this.$http.delete(`${this.$config.clientApi}/${this.deleteClientId}`, {}, {emulateJSON: true}).then(
          response => {
            this.clientList()
            clearInterval(int)
          }
        ))
      },
      doDeleteAgent () {
        let int = setInterval(this.$http.delete(`${this.$config.agentApi}/${this.deleteAgentId}`, {}, {emulateJSON: true}).then(
          response => {
            this.agentList()
            clearInterval(int)
          }
        ))
      },
      doUpdateAgent () {
        let int = setInterval(
          this.$http.put(`${this.$config.agentApi}/${this.updateAgentId}`,
            {
              first_name: $('#updateAgentFirstname').val(),
              last_name: $('#updateAgentLastname').val(),
              telephone: $('#updateAgentPhone').val()
            }
          ).then(
          response => {
            this.agentList(this.updateAgentId)
            clearInterval(int)
          }),
          800
        )
      },
      doUpdateClient () {
        let int = setInterval(
          this.$http.put(`${this.$config.clientApi}/${this.updateClientId}`,
            {
              first_name: $('#updateClientFirstname').val(),
              last_name: $('#updateClientLastname').val(),
              telephone: $('#updateClientPhone').val()
            }
          ).then(
          response => {
            this.clientList(this.updateClientId)
            clearInterval(int)
          }),
          800
        )
      },
      agentList (id) {
        // Logique:
        //   - tentative de GET sur l'API
        //     - en cas de succès: affectation des valeurs au select2 et stockage en localstorage
        //   - en cas d'échec, si le localstorage est rempli, utilisation des valeurs stockées
        //   - Sinon, affichage d'un modal de demande de connection à interweb

        // Tentative de GET sur l'API
        this.$http.get(`${this.$config.agentApi}/all`).then(response => {
          // Stockage des valeurs récupérées
          localStorage.setItem('agentList', response.bodyText)

          $('#agent').html('')

          // Population du select2
          Object.values(JSON.parse(response.bodyText)).forEach(agent => {
            $('#agent').append($('<option></option>')
              .attr('value', agent.id).text(`${agent.first_name} ${agent.last_name} ${agent.telephone}`))
          })

          // Init du select2
          $('#agent').select2({
            templateResult: this.iconFormatSelect2
          })

          // Event Handler du click sur l'icône d'édition d'un agent
          $('#agent').on('select2:select select2:unselect', (e) => {
            if (!isNaN($(e.params.originalEvent.target).attr('id'))) {
              if (e.params.originalEvent.target.classList.contains('edit')) {
                this.$http.get(`${this.$config.agentApi}/${$(e.params.originalEvent.target).attr('id')}`).then(
                  response => {
                    let agent = JSON.parse(response.bodyText)
                    this.updateAgentId = $(e.params.originalEvent.target).attr('id')
                    $('#updateAgentFirstname').val(agent.first_name).trigger('focusin')
                    $('#updateAgentLastname').val(agent.last_name).trigger('focusin')
                    $('#updateAgentPhone').val(agent.telephone).trigger('focusin')
                    $('#updateAgentModal').modal()
                    $('#updateAgentModal').modal('open')
                  }
                )
              } else if (e.params.originalEvent.target.classList.contains('delete')) {
                this.$http.get(`${this.$config.agentApi}/${$(e.params.originalEvent.target).attr('id')}`).then(
                  response => {
                    let agent = JSON.parse(response.bodyText)
                    this.deleteAgentId = $(e.params.originalEvent.target).attr('id')
                    $('#deleteAgentString').html(`${agent.first_name} ${agent.last_name} ${agent.telephone}`)
                    $('#deleteAgentModal').modal()
                    $('#deleteAgentModal').modal('open')
                  }
                )
              }
            }
          })

          // Autoselect d'une option
          setTimeout(() => {
            $('#agent').val(id).trigger('change')
          }, 50)
        }, () => {
          // Utilisation des valeurs stockées
          if (localStorage.getItem('agentList') != null) {
            $('#agent').html('')
            Object.values(JSON.parse(localStorage.getItem('agentList'))).forEach(agent => {
              $('#agent').append($('<option></option>')
                .attr('value', agent.id).text(`${agent.first_name} ${agent.last_name} ${agent.telephone}`))
            })

            // Pas de modifications ou suppression lorsque la conexion n'est pas disponible
            $('#agent').select2()

            // Autoselect d'une option
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
        // Logique:
        //   - tentative de GET sur l'API
        //     - en cas de succès: affectation des valeurs au select2 et stockage en localstorage
        //   - en cas d'échec, si le localstorage est rempli, utilisation des valeurs stockées
        //   - Sinon, affichage d'un modal de demande de connection à interweb

        this.$http.get(`${this.$config.clientApi}/all`).then(response => {
          // Storage of fetched values
          localStorage.setItem('clientList', response.bodyText)

          $('#client').html('')

          Object.values(JSON.parse(response.bodyText)).forEach(agent => {
            $('#client').append($('<option></option>')
              .attr('value', agent.id).text(`${agent.first_name} ${agent.last_name} ${agent.telephone}`))
          })
          $('#client').select2({
            templateResult: this.iconFormatSelect2
          })

          $('#client').on('select2:select', (e) => {
            if (!isNaN($(e.params.originalEvent.target).attr('id'))) {
              if (e.params.originalEvent.target.classList.contains('edit')) {
                this.$http.get(`${this.$config.clientApi}/${$(e.params.originalEvent.target).attr('id')}`).then(
                  response => {
                    let client = JSON.parse(response.bodyText)
                    this.updateClientId = $(e.params.originalEvent.target).attr('id')
                    $('#updateClientFirstname').val(client.first_name).trigger('focusin')
                    $('#updateClientLastname').val(client.last_name).trigger('focusin')
                    $('#updateClientPhone').val(client.telephone).trigger('focusin')
                    $('#updateClientModal').modal()
                    $('#updateClientModal').modal('open')
                  }
                )
              } else if (e.params.originalEvent.target.classList.contains('delete')) {
                this.$http.get(`${this.$config.clientApi}/${$(e.params.originalEvent.target).attr('id')}`).then(
                  response => {
                    let client = JSON.parse(response.bodyText)
                    this.deleteClientId = $(e.params.originalEvent.target).attr('id')
                    $('#deleteClientString').html(`${client.first_name} ${client.last_name} ${client.telephone}`)
                    $('#deleteClientModal').modal()
                    $('#deleteClientModal').modal('open')
                  }
                )
              }
            }
          })

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
        if (
          $('#agent').val() !== null &&
          $('#client').val() !== null &&
          $('#client').val() !== ''
        ) {
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
      pdf () {
        this.agent = JSON.parse(localStorage.getItem('agentList')).filter(agent => {
          if (agent.id === $('#agent').val()) {
            return agent
          }
        })
        this.client = JSON.parse(localStorage.getItem('clientList')).filter(client => {
          if (client.id === $('#agent').val()) {
            return client
          }
        })
        file.save(doc.pdf(this, 'blob'), 'tmp-visite.pdf')
        file.open('tmp-visite.pdf')
      }
    },
    created () {
      this.agentList(this.$route.params.tour ? this.$route.params.tour.id_agent : null)

      setTimeout(() => {
        this.clientList(this.$route.params.tour ? this.$route.params.tour.id_visiteur : null)
      }, 500)

      // Centrage sur la map
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
