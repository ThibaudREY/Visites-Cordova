<template>
  <div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card z-depth-2">
          <div class="card-image">
            <img
              src="https://orig00.deviantart.net/ede7/f/2016/103/7/8/april_12_2016_house_sketch_by_karisean-d9yta0s.png">
            <span class="card-title">Visite</span>
            <a v-on:click="remove()" class="btn-floating halfway-fab waves-effect waves-light red"><i
              class="material-icons">delete</i></a>
            <router-link :to="{name: 'Edit', params: {tour: this.tour}}" class="half-fab-2nd btn-floating halfway-fab waves-effect waves-light blue">
              <i class="material-icons">edit</i>
            </router-link>
            <a v-on:click="call()" class="half-fab-5th btn-floating halfway-fab waves-effect waves-light light-green accent-4"><i
              class="material-icons">phone</i></a>
          </div>
          <div class="card-content white lighten-4">
            <ul class="tabs tab-fixed-width">
              <li class="tab col s3 active">
                <a :href="`#info-${this.tour.id}`">Informations</a>
              </li>
              <li class="tab col s3">
                <a :href="`#share-${this.tour.id}`">Exporter</a>
              </li>
            </ul>

            <div :id="`info-${this.tour.id}`">
              <div class="container">
                <div class="row"></div>
                <div class="row">
                  <div class="col s3">
                    <p>{{this.agent.first_name}} {{this.agent.last_name}}</p>
                  </div>
                  <div class="col s3">
                    <p>{{this.client.first_name}} {{this.client.last_name}}</p>
                  </div>
                  <div class="col s3">
                    <p>{{this.tour.date_visite}}</p>
                  </div>
                  <div class="col s3">
                    <p>{{this.tour.adresse}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div :id="`share-${this.tour.id}`">
              <div class="container">
                <div class="row"></div>
                <div class="row">
                  <div class="col s4">
                    <a class="btn-floating red">
                      <i class="material-icons">mail</i>
                    </a>
                  </div>
                  <div class="col s4">
                    <a class="btn-floating grey darken-1">
                      <i class="material-icons">print</i>
                    </a>
                  </div>
                  <div class="col s4">
                    <a v-on:click="pdf()" class="btn-floating deep-purple">
                      <i class="material-icons">picture_as_pdf</i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :id="`removeModal-${this.tour.id}`" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Supprimer ?</h4>
        <p id="modal-text">
          Êtes vous de vouloir supprimer la visite du {{this.tour.date_visite}} à l'adresse :
          {{this.tour.adresse}}
        </p>
      </div>
      <div class="modal-footer">
        <a v-on:click="doRemove()" class="modal-action modal-close waves-effect waves-red btn-flat">Supprimer</a>
      </div>
    </div>
  </div>
</template>

<script>
  /* global $, Materialize */

  import doc from '../utils/doc'
  import file from '../utils/file'

  export default {
    name: 'Tour',
    props: ['tour'],
    components: {},
    data () {
      return {
        agent: null,
        client: null
      }
    },
    updated () {
      $('ul.tabs').tabs()
    },
    mounted () {
      this.$http.get(`${this.$config.agentApi}/${this.tour.id_agent}`).then(response => {
        this.agent = JSON.parse(response.bodyText)
      })
      this.$http.get(`${this.$config.clientApi}/${this.tour.id_visiteur}`).then(response => {
        this.client = JSON.parse(response.bodyText)
      })
    },
    methods: {
      remove () {
        $(`#removeModal-${this.tour.id}`).modal()
        $(`#removeModal-${this.tour.id}`).modal('open')
      },
      doRemove () {
        this.$http.delete(`${this.$config.tourApi}/${this.tour.id}`).then(() => {
          this.$parent.loadList()
        })
      },
      call () {
        window.plugins.CallNumber.callNumber(() => {}, () => {
          Materialize.toast('Une erreur s\'est produite', 4000)
        }, this.client.telephone, true)
      },
      pdf () {
        file.save(doc.pdf(this), 'tmp-visite.pdf')
        file.open('tmp-visite.pdf')
      }
    }
  }
</script>

<style>
</style>
