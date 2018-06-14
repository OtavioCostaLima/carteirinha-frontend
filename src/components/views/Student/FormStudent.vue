<template>
	<div>
	<v-card class="elevation-1 mb-3 mt-3">
	<v-card-text>
	 <v-container fluid>
   <v-layout row>
      <v-flex xs3>
         <v-select
          name="class_id"
          label="Turma"
          v-bind:items="items"
         v-model="student.class_id"
         >
    
         </v-select>
      </v-flex> 
   </v-layout row>
		<v-layout row>
          <v-flex xs4>
            <v-text-field
              name="nome"
              label="Nome do Aluno"
              v-model="student.nome"
            ></v-text-field>
          </v-flex>
             <v-flex xs4>
            <v-text-field
              name="email"
              label="Email"
              type="email"
              v-model="student.email"
            ></v-text-field>
          </v-flex>
             <v-flex xs4>
            <v-text-field
              name="Telefone"
              label="Telefone"
              v-model="student.telefone"
            ></v-text-field>
          </v-flex>
        </v-layout>

	<v-layout row>
          <v-flex xs4>
            <v-text-field
              name="nome"
              label="Nome do Responsavel"
              v-model="student.parent.nome"
            ></v-text-field>
          </v-flex>
             <v-flex xs4>
            <v-text-field
              name="email"
              label="Email"
              type="email"
              v-model="student.parent.email"
            ></v-text-field>
          </v-flex>
             <v-flex xs4>
            <v-text-field
              name="Telefone"
              label="Telefone"
              v-model="student.parent.telefone"
            ></v-text-field>
          </v-flex>
        </v-layout>

          <v-layout row>
           <v-flex xs4>
            <v-text-field
              name="cpf"
              label="CPF"
              v-model="student.parent.cpf"
            ></v-text-field>
          </v-flex>
        </v-layout>

  <v-btn primary @click="postStudent">Enviar</v-btn>
	  </v-container>
	 </v-card-text>
 	 	</v-card>
   
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
          student: {
          class_id:'',
          nome: '', email: '', telefone: '',
          parent: { nome: '', email: '', telefone: '', cpf: ''}
        }
			}
		},
    methods: {
      postStudent () {
        this.$store.dispatch('studentCreate',this.student).then(response => {
           this.context = 'success'
        this.openSnackbar("Aluno criado com sucesso!")
        this.clearFiels()
        }).catch(error => {

        })
         
      },
      clearFiels () {
        this.student.class_id = '', 
        this.student.nome = '', 
        this.student.email = '', 
        this.student.telefone = '',
        this.student.parent.nome = '', 
        this.student.parent.email = '', 
        this.student.parent.telefone = '', 
        this.student.parent.cpf = ''
    },
      openSnackbar(text){
        this.snackbar = true,
            this.text= text
      }
  },
    mounted() {
      this.$store.dispatch('classesSelect')
    },
    computed: {
      items () {
        return  this.$store.state.classes.select
      }
   }
	}
</script>

<style>
</style>