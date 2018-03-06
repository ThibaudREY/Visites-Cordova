<template>
    <div class="navbar-fixed">
        <nav class="nav-extended">
            <div class="nav-content">
                <span class="nav-title ml2">{{this.title}}</span>
                <router-link :to="{ name: 'Edit', params: { tour: {} }}" class="btn-floating btn-large halfway-fab waves-effect waves-light teal">
                    <i class="material-icons">add</i>
                </router-link>
                <a class="half-fab-2nd btn-floating btn-large halfway-fab waves-effect waves-light teal">
                    <i class="material-icons">search</i>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
/* global $ */
    export default {
      name: 'Navbar',
      props: ['title'],
      beforeUpdate () {
        $('.button-collapse').sideNav('hide')
      }
    }
</script>

<style>
</style>
