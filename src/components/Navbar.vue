<template>
  <div>
    <div class="navbar-fixed">
      <nav class="nav-extended">
        <i v-on:click="settings()" class="material-icons settings">settings</i>
        <div class="nav-content">
          <span class="nav-title ml2">{{this.title}}</span>
          <router-link :to="{ name: 'Edit', params: { tour: {} }}"
                       class="btn-floating btn-large halfway-fab waves-effect waves-light teal">
            <i class="material-icons">add</i>
          </router-link>
          <a class="half-fab-2nd btn-floating btn-large halfway-fab waves-effect waves-light teal">
            <router-link :to="{ name: 'Search', params: { tour: {} }}"
                         class="btn-floating btn-large waves-effect waves-light teal">
              <i class="material-icons">search</i>
            </router-link>
          </a>
        </div>
      </nav>
    </div>

    <div id="settingsModal" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Paramètres</h4>
        <div class="container">
          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">home</i>
                  <input id="Agency" type="text" class="validate">
                  <label for="Agency">Agence</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">home</i>
                  <input id="AgencyAddress" type="text" class="validate">
                  <label for="AgencyAddress">Adresse</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">home</i>
                  <input id="AgencyPostcode" type="tel" class="validate">
                  <label for="AgencyPostcode">Code postal</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">home</i>
                  <input id="AgencyCity" type="tel" class="validate">
                  <label for="AgencyCity">Ville</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">gavel</i>
                  <input id="AgencyRCS" type="tel" class="validate">
                  <label for="AgencyRCS">Numéro RCS</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">gavel</i>
                  <input id="AgencyPhone" type="tel" class="validate">
                  <label for="AgencyPhone">Téléphone</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">gavel</i>
                  <input id="AgencyProCard" type="tel" class="validate">
                  <label for="AgencyProCard">Carte professionnelle</label>
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
  </div>
</template>

<script>
  /* global $ */
  export default {
    name: 'Navbar',
    props: ['title'],
    beforeUpdate () {
      $('.button-collapse').sideNav('hide')
    },
    methods: {
      settings () {

      }
    }
  }
</script>

<style>
</style>
