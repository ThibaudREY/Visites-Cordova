<template lang="html">
  <div>
    <navbar title="Rechercher une visite"></navbar>
    <div class="spacer"></div>
    <div class="container">
      <div class="row">
        <div class="col s12">
          <ul class="collapsible popout" data-collapsible="accordion">
              <li>
                <div class="collapsible-header active"><i class="material-icons">today</i>Rechercher par une date</div>
                  <div class="collapsible-body">
                    <span><div id="date-slider"></div></span>
                    <div class="col s6">
                    <div class="center align">
                      <span id="event-start"></span>
                      </div>

                    </div>
                    <div class="col s6">
                      <div class="center align">
                      <span id="event-end"></span>
                      </div>

                    </div>
                    </div>


              </li>
              <li>
                <div class="collapsible-header"><i class="material-icons">person</i>Rechercher un agent</div>
                <div class="collapsible-body">
                  <span>
                    <div class="container">
                      <div class="row">
                        <div class="col s12">
                         <div class="input-field col s12">
                            <div class="select2-label">Agent</div>
                              <select id="agent"></select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
              </li>
              <li>
                <div class="collapsible-header"><i class="material-icons">person</i>Rechercher un client</div>
                <div class="collapsible-body">
                  <span>
                    <div class="container">
                      <div class="row">
                        <div class="col s12">
                         <div class="input-field col s12">
                            <div class="select2-label">Client</div>
                              <select id="client"></select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
              </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <div class="center-align">
            <a class="align-center waves-effect waves-light btn">Rechercher</a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <tour v-for="tour in tours" :tour="tour"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* global $, noUiSlider */
  import Navbar from './Navbar.vue'
  import VDivider from 'vuetify/src/components/VDivider/VDivider'
  import Tour from './Tour.vue'

  export default {
    name: 'Search',
    components: {
      Tour,
      VDivider,
      Navbar
    },
    props: [],
    mounted () {
      this.createCollapsible()
      this.createSlider()
    },
    created () {
      this.agentList(this.$route.params.tour ? this.$route.params.tour.id_agent : null)

      setTimeout(() => {
        this.clientList(this.$route.params.tour ? this.$route.params.tour.id_visiteur : null)
      }, 500)
    },
    data () {
      return {
        tours: null
      }
    },
    methods: {

      createCollapsible () {
        $(document).ready(function () {
          $('.collapsible').collapsible()
        })
      },

      timestamp (str) {
        return new Date(str).getTime()
      },

      formatDate (date) {
        var months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
          'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
        return date.getDate() + ' ' +
          months[date.getMonth()] + ' ' +
          date.getFullYear()
      },

      toFormat (time) {
        return this.formatDate(new Date(time))
      },
      createSlider () {
        var date = new Date()

        // start date
        var startDate = new Date()
        startDate.setFullYear(startDate.getFullYear() - 3)

        var dateSlider = document.getElementById('date-slider')

        // nouislider settings
        noUiSlider.create(dateSlider, {
          behaviour: 'tap',
          connect: true,
          tooltips: [ true, true ],
          format: { to: this.toFormat, from: Number },
          range: {
            min: this.timestamp('2016-01-01') + 24 * 60 * 60 * 1000,
            max: this.timestamp(date)
          },
          step: 1 * 24 * 60 * 60 * 1000,
          start: [this.timestamp(startDate), this.timestamp(date)]
        })

        // get range infos at html
        var dateValues = [
          document.getElementById('event-start'), document.getElementById('event-end')
        ]

        dateSlider.noUiSlider.on('update', function (values, handle) {
          dateValues[handle].innerHTML = values[handle]
        })
      },

      search () {
        // TODO
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
      }

    }
}
</script>

<style scoped>
  .components-search {

  }
</style>
