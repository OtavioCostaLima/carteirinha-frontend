<template>
	<v-app toolbar footer>
 	 <v-toolbar class="white elevation-1">
      <v-toolbar-logo>
      <v-btn fab outline small class="purple--text ">SAD</v-btn>
      </v-toolbar-logo>
       <v-spacer></v-spacer>
        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Quem Somos</v-btn>
      <v-btn flat>Contato</v-btn>
      <v-btn flat @click="goRouter('login')">Entrar</v-btn>
    </v-toolbar-items>
    </v-toolbar>

     <main>
    <v-carousel  class="elevation-0" icon="stop">
    <v-carousel-item 
      v-for="(item,i) in items"
      v-bind:key="i"
      v-bind:src="item.src"
      transition="fade"
      reverseTransition="fade"
    >  <p class="logo_marca">SERVIÇOS ACADÊMICOS DISTRIBUIDOS</p>
    </v-carousel-item>
  </v-carousel>

    <v-container fluid>

    <h4 class="text-md-center text-xs-center text-xs-center purple--text">Nossos principais serviços</h4> 
    <p class="text-md-center text-xs-center text-xs-center grey--text headline">Começando com o novo ano letivo com segurança!</p>
    <v-layout xs12 class="text-xs-center pt-5 ">

      <v-flex xs12 class=" text-xs-centers ">
      	<div class="headline purple--text  text--lighten-4">Controle de Alunos</div>
	<v-icon class="purple--text text--lighten-4"  id="services" x-large>
		security 
	</v-icon>
	<p>Controlamos a entrada e saída do aluno.</p>
    </v-flex>

   <v-flex xs12 md12 class=" text-xs-centers">
      	<div class="headline purple--text  text--lighten-4">Envio de Notificações</div>
	<v-icon class="purple--text text--lighten-4"  id="services" x-large>
		notifications_active 
	</v-icon>
	<p>Enviamos notificações aos para avisar que o filho chegou com segurança a escola.</p>
    </v-flex>

       <v-flex xs12 class=" text-xs-centers">
      	<div class="headline purple--text  text--lighten-4">Estatisticas</div>
	<v-icon class="purple--text text--lighten-4"  id="services" x-large>
		show_chart 
	</v-icon>
	<p>Nossa aplicação gera graficos </p>
    </v-flex>

       <v-flex xs12 class=" text-xs-centers">
      	<div class="headline purple--text  text--lighten-4">Controle de Alunos</div>
	<v-icon class="purple--text text--lighten-4"  id="services" x-large>
		security 
	</v-icon>
    </v-flex>

    </v-layout>
  </v-container>
  </main>

   <v-footer>2017</v-footer>
	</v-app>
</template>
<script>

export default {
	name: 'site',
	data () {
		return {
			  items: [
          {
            src: '/static/imagens/imagen1.gif'
          },
          {
            src: 'static/imagens/imagen2.jpeg'
          },
          {
            src: 'static/imagens/imagen3.jpeg'
          },
          {
            src: 'static/imagens/imagen4.jpg'
          }
        ]
		}
	},
    methods: {
      goRouter (router) {
        this.$router.push(router)
      }
    }
}
</script>

<style>
.logo_marca {
	color: white;
	margin-bottom: -20%;
	margin-left: 0%;
	font-size: 4em;
}

.fade, .fade-leave-active, .fade-enter-active {
    -webkit-transition: .3s ease-out;
    position: absolute;
     top: 0;
     left: 0;
	
}

.fade-enter,.fade-leave, .fade-leave-to {
 	opacity: 0;
}


#services.icon {
	font-size: 12em;
}

.footer{
		height: 100px;
}


</style>