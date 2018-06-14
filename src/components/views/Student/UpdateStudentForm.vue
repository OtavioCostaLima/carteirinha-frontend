<template>
	<div>
	<v-card class="elevation-1 mb-3 mt-3">
	<v-card-text>
	 <v-container fluid>
		<v-layout row>
          <v-flex xs4>
            <v-text-field
              name="nome"
              label="Nome do Aluno"
              v-model="students.nome"
            ></v-text-field>
          </v-flex>
             <v-flex xs4>
            <v-text-field
              name="email"
              label="Email"
              type="email"
              v-model="students.email"
            ></v-text-field>
          </v-flex>
             <v-flex xs4>
            <v-text-field
              name="Telefone"
              label="Telefone"
              v-model="students.telefone"
            ></v-text-field>
          </v-flex>
        </v-layout>

	<v-layout row>
          <v-flex xs4>
            <v-text-field
              name="nome"
              label="Nome do Responsavel"
              v-model="students.parent.nome"
            ></v-text-field>
          </v-flex>
             <v-flex xs4>
            <v-text-field
              name="email"
              label="Email"
              type="email"
              v-model="students.parent.email"
            ></v-text-field>
          </v-flex>
             <v-flex xs4>
            <v-text-field
              name="Telefone"
              label="Telefone"
              v-model="students.parent.telefone"
            ></v-text-field>
          </v-flex>
        </v-layout>

          <v-layout row>
           <v-flex xs4>
            <v-text-field
              name="cpf"
              label="CPF"
              v-model="students.parent.cpf"
            ></v-text-field>
          </v-flex>
        </v-layout>

  <v-btn primary @click="updateStudent">Enviar</v-btn>
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
			}
		},
    methods: {
      updateStudent () {
        this.$store.dispatch('studentUpdate',this.students).then(response => {
        this.context = 'success'
        this.openSnackbar("Aluno altualizado com sucesso!")
        this.clearFiels()

        }).catch(error => {
        this.context = 'error'
        this.openSnackbar("Ocorreu um erro ao altualizado o aluno!")
        this.clearFiels()
        })

      },      
      openSnackbar(text){
        this.snackbar = true,
            this.text= text
      },
      clearFiels () {
        this.students.class_id = '', 
        this.students.nome = '', 
        this.students.email = '', 
        this.students.telefone = '',
        this.students.parent.nome = '', 
        this.students.parent.email = '', 
        this.students.parent.telefone = '', 
        this.students.parent.cpf = ''
    }
  },
  created() {

      let id = this.$router.currentRoute.params.id
       this.$store.dispatch('fetchStudentById', id)  
  },
    computed: {
      students () {
          return this.$store.state.student.student
      }
    }

	}
</script>

<style>
</style>