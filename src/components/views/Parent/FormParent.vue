<template>
	<div>
	 <v-layout row>
	  <v-flex xs12 sm6 offset-sm3>
	  <v-card>
		<v-card-title primary-title>
          <div>
            <div class="headline">Faça seu cadastro!</div>
            <span class="grey--text">entre com seu CPF</span>
          </div>
        </v-card-title>
        <v-card-text>
	 <v-container fluid>
		<v-layout row v-show="showCPF">
          <v-flex xs10>
            <v-text-field
              name="cpf"
              label="CPF"
              v-model="user.cpf"
              :error-messages="errors.cpf"
            ></v-text-field>
          </v-flex>
          <v-flex xs2>
          	<v-btn fab small primary dark @click="fetchByCPF"><v-icon>send</v-icon></v-btn>
          </v-flex>
        </v-layout>
        	<v-layout row v-show="showPassword">
          
          <v-flex xs6>
            <v-text-field
              name="password"
              label="Senha"
              type="password"
               v-model="user.password"
               :error-messages="errors.password"
            ></v-text-field>
          </v-flex>

  		<v-flex xs6>
            <v-text-field
              name="password"
              label="Confirmar senha"
              type="password"
              v-model="user.confirmPassword"
            ></v-text-field>
          </v-flex>

        </v-layout>

<v-layout v-show="showPassword">
	<v-flex xs12>
		<v-btn primary @click="validatePassword">Entrar</v-btn>
	</v-flex>
</v-layout>

	  </v-container>
	 </v-card-text>
	</v-card>
	  </v-flex>
	 	
	  </v-layout>
	 
	</div>
</template>

<script>
	export default {
		data () {
			return {
				errors: {
					cpf: [],
					password: []
				},
				showPassword: false,
				showCPF: true,
				user: { cpf: '' , password: '', confirmPassword: '' },
				parent: []
			}
		}, 
	methods: {
		fetchByCPF () {
			axios.get('/api/v2/parents/'+ this.user.cpf).then(response => {
				this.parent = response.data
				if (this.parent.user_id==null && this.parent.id!=null) {
				  this.errors.cpf = []
				  this.showPassword = true
				  this.showCPF = false
				} else {
				  this.showPassword = false
				  this.showCPF = true
				  this.errors.cpf = ['Esse CPF já está vinculado a uma conta de usuário!']
				  }
			}).catch(errors => {
				  this.errors.cpf = []
				  this.showPassword = false
				  this.showCPF = true
			})
		},
		validatePassword () {
			if(this.user.password==this.user.confirmPassword) {
				this.errors.password = []
				this.createUser()
			} else {
				this.errors.password = ['As senhas não conferem.']
			}
			return false;
		},
		createUser () {
				axios.post('/api/v2/users', { name: this.parent.nome, email: this.parent.email, password: this.user.password 
				}).then(response => {
  					console.log(response)
			}).catch(errors => {
				console.log(errors.response)
			})
		}
	}
}

</script>