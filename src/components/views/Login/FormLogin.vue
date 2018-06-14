<template>
	<div>	


<v-layout row justify-center style="position: relative;">
    <v-dialog v-model="dialogMessages" lazy absolute>
      <v-card>
        <v-card-title>
          <div class="headline">{{ textDialogMessage }}</div>
        </v-card-title>
        <v-card-text>{{ descriptionDialogMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialogMessages = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>


	 <v-layout row justify-center style="position: relative;">

    <v-dialog v-model="dialog" lazy absolute persistent>
      <v-card>
        <v-card-title>
          <div class="headline text-xs-center">Carregando seus Dados!</div>
        </v-card-title>
        <v-card-text class="text-xs-center">  
        <v-progress-circular indeterminate v-bind:size="50" class="amber--text"></v-progress-circular></v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>



	<v-app toolbar footer>
	<v-card class="purple lighten-4" flat>
	<v-toolbar dark class="purple lighten-2 elevation-0" extended>
		    <v-btn icon class="hidden-xs-only" @click="goRouter('site')">
            <v-icon>arrow_back</v-icon>
          </v-btn>
	</v-toolbar>
	</v-card>

		 <v-layout row>
	  <v-flex xs12 sm6 offset-sm3>
	  <v-card class="card--flex-toolbar">
		<v-card-title primary-title>
		 <v-btn fab outline large class="purple--text mr-4">SAD</v-btn>
          <div>
            <span class="grey--text">Entre com seu usuário e senha!</span>
          </div>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text>
		<div class="ml-5 mr-5">
		<form @submit.prevent="login">
		   <v-layout row>
      <v-flex xs6>
         <v-select
          name="class_id"
          label="Instituição"
          v-bind:items="institutions"
          v-model="user.institution_id"
         >
    
         </v-select>
      </v-flex> 

   	</v-layout>
				<v-layout row>
				          <v-flex xs12>
				            <v-text-field
				              name="name"
				              label="Email"
				              v-model="user.username"
				            ></v-text-field>
				          </v-flex>
				        </v-layout>		

				        <v-layout row>
				          <v-flex xs12>
				            <v-text-field
				              name="password"
				              label="Senha"
				              type="password"
				              v-model="user.password"
				            ></v-text-field>
				          </v-flex>
				        </v-layout>
					
						<div class="text-xs-center"> 
						  <v-flex xs12>
							<v-btn  round  primary @click="login" slot="activator">Entrar</v-btn> 
					  </v-flex>
					    <v-flex xs12>
 				<router-link to="/foo" class="teal--text text--darken-1 router">Recupere sua senha</router-link>
 				  </v-flex>
 				      <v-flex xs12>
 			 <router-link class="teal--text text--darken-1 router" to="/school/create">Faça seu cadastro</router-link>
 			   </v-flex>
 				 </div>
			</form>
		</div>
	 </v-card-text>
	</v-card>
	  </v-flex>
	 	
	  </v-layout>

</v-app> 
<v-footer class="pa-2">
    <v-spacer></v-spacer>
    <div>© {{ new Date().getFullYear() }} Desenvolvedor: Otávio Costa Lima</div>
  </v-footer>
	</div>
</template>

<script>

import { CONFIG } from "../../../config"

	export default {
		data () {
			return {
				descriptionDialogMessage: 'Descrição',
				textDialogMessage:  'Mensagem',
				dialogMessages: false,
				dialog: false,
       			test: true,
       			user: { institution_id: '', username: '', password: '' }
			}
		}, 
	methods: {
		login () {
				this.dialog = true
			let data = {
				grant_type: 'password',
				client_id: CONFIG.client_id,
				client_secret: CONFIG.client_secret,
				username: this.user.username,
				password: this.user.password,
				institution_id: this.user.institution_id,
				scope: ''
			}
			let retorno = this.$store.dispatch('login', { data: data, router: this.$router})
			retorno.then(res => {
				if (res.response.status != undefined && res.response.status === 401 ) {
					this.textDialogMessage = 'Falha ao efetuar login.'
						this.descriptionDialogMessage = 'Usuário ou senha inválidos!'
						this.dialogMessages = true
				}

					if (res.response.status != undefined && res.response.status === 500 ) {

						this.textDialogMessage = 'Falha ao efetuar login.'
						this.descriptionDialogMessage = 'Verifique se todos os campos estão preencidos!'
						this.dialogMessages = true
				}
				
					this.dialog = false
			}).catch(error => {
			this.textDialogMessage = 'Falha ao efetuar login.'
		    this.descriptionDialogMessage = 'Não foi possível carregar os seus dados!'
			this.dialogMessages = true
			this.dialog = false
			})
		 },
      goRouter (router) {
        this.$router.push(router)
    }
	},
	mounted () {
		this.$store.dispatch('getInstitutions')
	},
	computed: {
		institutions () {
			return this.$store.state.institutions.institutionsList
		}
	}
}

</script>

<style>
  .card--flex-toolbar {
    margin-top: -64px;
  }

  .router {
	text-decoration: none;
  }

</style>