import Vue from 'vue'
import Router from 'vue-router'
import vueConfig from 'vue-config'
import List from '@/components/List'
import Edit from '@/components/Edit'
import Sign from '@/components/Sign'
import Search from '@/components/Search'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueResource from 'vue-resource'

const configs = {
  agentApi: 'http://51.254.219.112:8080/agent',
  clientApi: 'http://51.254.219.112:8080/visiteur',
  tourApi: 'http://51.254.219.112:8080/visite'
}

Vue.use(VueResource)
Vue.use(Router)
Vue.use(vueConfig, configs)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBgY4J3poPqV8GHM168oS9sgXd3fWFdddE', // TODO: Generate a proper key
    libraries: 'places'
  }
})

const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
