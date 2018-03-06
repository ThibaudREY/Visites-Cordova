<template>
    <div class="row">
        <div class="col s12 m6">
            <div class="card z-depth-2">
                <div class="card-image">
                    <img src="https://orig00.deviantart.net/ede7/f/2016/103/7/8/april_12_2016_house_sketch_by_karisean-d9yta0s.png">
                    <span class="card-title">Visite</span>
                    <a class="btn-floating halfway-fab waves-effect waves-light red"><i
                            class="material-icons">delete</i></a>
                    <a class="half-fab-2nd btn-floating halfway-fab waves-effect waves-light blue"><i
                            class="material-icons">edit</i></a>
                    <a class="half-fab-5th btn-floating halfway-fab waves-effect waves-light light-green accent-4"><i
                            class="material-icons">phone</i></a>
                </div>
                <div class="card-content white lighten-4">
                    <ul class="tabs tab-fixed-width">
                        <li class="tab col s3 active">
                            <a :href="`#info-${id}`">Informations</a>
                        </li>
                        <li class="tab col s3">
                            <a :href="`#share-${id}`">Exporter</a>
                        </li>
                    </ul>

                    <div :id="`info-${id}`">
                        <div class="container">
                            <div class="row"></div>
                            <div class="row">
                                <div class="col s3">
                                    <p>Nom Prenom</p>
                                </div>
                                <div class="col s3">
                                    <p>Nom Prenom</p>
                                </div>
                                <div class="col s3">
                                    <p>01/01/2000 15:00</p>
                                </div>
                                <div class="col s3">
                                    <p>9 Rue whatever 000000 Ville</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div :id="`share-${id}`">
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
                                    <a class="btn-floating deep-purple">
                                        <i class="material-icons">picture_as_pdf</i></a>
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
/* global $ */
    export default {
      name: 'Tour',
      props: {
        id: 1
      },
      components: {},
      mounted () {
        $('ul.tabs').tabs()
      }
    }
</script>

<style>
</style>
