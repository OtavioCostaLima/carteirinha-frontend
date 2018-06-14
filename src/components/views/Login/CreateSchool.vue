<template>
	       <div>

	       	    <v-snackbar
      :timeout="timeout"
      :success="context === 'success'"
      :info="context === 'info'"
      :warning="context === 'warning'"
      :error="context === 'error'"
      :primary="context === 'primary'"
      :secondary="context === 'secondary'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
      top
    >
      {{ text }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>


<v-layout row justify-center style="position: relative;">
    <v-dialog v-model="dialogError" lazy absolute>
      <v-card>
        <v-card-title>
          <div class="headline">{{ textDialogMessage }}</div>
        </v-card-title>
        <v-card-text>{{ descriptionDialogMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialogError = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>


	       
	 <v-layout row justify-center style="position: relative;">
    <v-dialog v-model="dialog" lazy absolute persistent>
      <v-card>
        <v-card-title>
          <div class="headline text-xs-center"> {{ dialogMessage }}</div>
        </v-card-title>
        <v-card-text class="text-xs-center">  <v-progress-circular indeterminate v-bind:size="50" class="amber--text"></v-progress-circular></v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>


	       <v-app toolbar footer>
	       	<v-card class="purple lighten-4" flat>
	<v-toolbar dark class="purple lighten-2 elevation-0" extended>
		    <v-btn icon class="hidden-xs-only" @click="goRouter('/login')">
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
            <span class="grey--text"></span>
          </div>
        </v-card-title>
         <v-divider></v-divider>

	      		<v-card-text>
	      			<div class="ml-5 mr-5">
	      			<form @submit.prevent="createInstituicao">
	      			<v-layout row>
	       	   			<v-flex xs12>
	       	   				 <v-text-field
				              name="instituicao"
				              label="Nome da Instituição"
				              v-model="instituicao.name"
						 ></v-text-field>
	       	   			</v-flex>
					</v-layout>

					<v-layout row>
	       	   			<v-flex xs12>
	       	   					    <v-text-field
				              name="username"
				              label="Nome do Usuário"
				              v-model="instituicao.username"
				         ></v-text-field>
					</v-flex>
					</v-layout>

					<v-layout row>
	       	   			<v-flex xs12>
	       	   			<v-text-field
				              name="email"
				              label="Email"
				              v-model="instituicao.email"
				        ></v-text-field>
	       	   			</v-flex>
					</v-layout>

					<v-layout row>
	       	   			<v-flex xs12>
					      <v-text-field
				              name="senha"
				              type="password"
				              label="senha"
				              v-model="instituicao.password"
				        ></v-text-field>
			     		</v-flex>
					</v-layout>
					 <v-flex xs12>
	       	   		 <v-btn round  primary @click="createInstituicao">Enviar</v-btn>
	       	   		 </v-flex>
	       	   		 </form>
	       	   		</div>
	      		</v-card-text>
	       	   </v-card>
              </v-flex>
	       	   </v-layout>



  </v-app>
 </div>


</template>

<script>
export default {
	data () {
		return {
			   text: '',
          snackbar: false,
          context: 'error',
             mode: '',
          timeout: 3000,
		dialogError: false,
		dialog: false,
		descriptionDialogMessage: 'Descrição',
		textDialogMessage:  'Mensagem',
		dialogMessage: '',
		instituicao: {},	
		}
	},

	methods: {
		      openSnackbar(text){
        this.snackbar = true,
            this.text= text
      },
			login () {
				this.dialogMessage = 'Carregando seus Dados!'
				this.dialog = true
			let data = {
				grant_type: 'password',
				client_id: CONFIG.client_id,
				client_secret: CONFIG.client_secret,
				username: this.instituicao.username,
				password: this.instituicao.password,
				institution_id: this.instituicao.institution_id,
				scope: ''
			}
			let retorno = this.$store.dispatch('login', { data: data, router: this.$router})
			retorno.then(res => {
				if (res.response.status != undefined && res.response.status === 401 ) {
					this.textDialogMessage = 'Falha ao efetuar login.'
						this.descriptionDialogMessage = 'Usuário ou senha inválidos!'
						this.dialogError = true
				}

					if (res.response.status != undefined && res.response.status === 500 ) {

						this.textDialogMessage = 'Falha ao efetuar login.'
						this.descriptionDialogMessage = 'Verifique se todos os campos estão preencidos!'
						this.dialogError = true
				}
				
					this.dialog = false
			}).catch(error => {
			this.textDialogMessage = 'Falha ao efetuar login.'
		    this.descriptionDialogMessage = 'Não foi possível carregar os seus dados!'
			this.dialogError = true
			this.dialog = false
			})
		 },
		clearFields () {
			console.log('fieldclear')
			 this.instituicao.name = ''
			this.instituicao.username = ''
			this.instituicao.email = ''
			this.instituicao.password = ''
		},
		createInstituicao () {
			this.dialog = true
			let data = { 
				name: this.instituicao.name,
				username: this.instituicao.username,
				email: this.instituicao.email,
				password: this.instituicao.password }

				this.dialogMessage = 'Aguarde enquanto preparamos tudo para você!'
				let a = axios.post('institutions', data ).then(res => {
				console.log(res)
				this.dialog = false
				this.clearFields()
				           this.context = 'success'
        this.openSnackbar("Sua conta foi criada com sucesso!")
			}).catch(error => {
			this.dialog = false
        	this.error = error.response.data
			this.textDialogMessage = 'Falha ao efetuar cadastro.'
		    this.descriptionDialogMessage = 'Não foi possível carregar os seus dados!'
			this.dialogError = true
		
			});
			
		},
		 goRouter (router) {
        this.$router.push(router)
    }
	}
}

</script>