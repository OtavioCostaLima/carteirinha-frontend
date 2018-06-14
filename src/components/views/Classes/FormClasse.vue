<template>
	<div>
		<v-card class="elevation-1 mb-3 mt-3">
	<v-card-text>
	 <v-container fluid>
		<v-layout row>
          <v-flex xs3>
            <v-text-field
              name="descricao"
              label="Descrição"
                v-model="turma.descricao"
            ></v-text-field>
          </v-flex>

             <v-flex xs3>
            <v-text-field
              name="ano"
              label="Ano"
              single-line
              bottom
              v-model="turma.ano"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
             <v-select
              v-bind:items="items"
              label="Turno"
              single-line
              name="turno"
              v-model="turma.turno"
            >
         </v-select>
          </v-flex>  
          <v-flex xs3 class="text-xs-center">
            <v-btn primary dark v-on:click.prevent="post">Enviar</v-btn>
          </v-flex>
        </v-layout>

	  </v-container>
	 </v-card-text>
 	 	</v-card>
       <v-flex xs6 sm2>
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
     </v-flex>
	</div>
</template>

<script>
	
export default {
  data () {
    return {
      snackbar: false,
        context: 'error',
        mode: '',
        timeout: 3000,
        text: '',
      items: [
          { text: 'Manhã' },
          { text: 'Tarde' },
          { text: 'Noite' }],
      turma: {descricao:'', ano: '', turno: ''} 
    }
  },
    methods: {
      post() {
        let dados = this.$store.dispatch('createClasse', this.turma)
        dados.then(result => {
        if(result.status==500){
        this.openSnackbar(result.data.errors)
                  } 
      if(result.status==200) {
        this.context = 'success',
        this.openSnackbar("Turma cadastrada com sucesso!")
        }})
 
         this.turma.descricao =''
         this.turma.ano = ''
      },
      openSnackbar(text){
        this.snackbar = true,
        this.text= text
      }
    }
}

</script>