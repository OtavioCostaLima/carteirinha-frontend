<template>
<v-app>  

  <v-navigation-drawer persistent v-model="drawer" light  overflow>
      

<div @click="logout">
      <v-list dense>
        <v-list-tile>
             <v-list-tile-content>
            <v-list-tile-title>   
              <v-list-tile-avatar >
   <!-- Imagem do usuario-->
              </v-list-tile-avatar>
            logout
            </v-list-tile-title>
          </v-list-tile-content>
            <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
         </v-list-tile>
      </v-list>
</div>

 <v-divider dark></v-divider>





      <my-header></my-header>
    </v-navigation-drawer>
     <v-toolbar class="grey darken-4" dark>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>App Carteirinha</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab dark><v-icon>notifications</v-icon></v-btn>
    </v-toolbar>
    <main>
      <v-navigation-drawer
       temporary
        v-model="left"
        overflow
        absolute
      ></v-navigation-drawer>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
        </main>
    <v-footer class="indigo">
      <span class="white--text">Todos os direitos reservados © 2017</span>
    </v-footer></v-app>
</template>


<script>
  import MyHeader from '../layouts/MyHeader.vue'

export default {
  name: "dashboard",
  components: {
    MyHeader
  },
  data: function data() {
    return {
        drawer: false,
        left: null
    }
  },
  methods: {
    logout () {
      console.log(window.localStorage)
       localStorage.clear();
       this.$router.push('/login')
    }
  }, 
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  }
}
</script>
<style>
</style>
