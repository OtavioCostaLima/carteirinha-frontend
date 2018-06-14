<template>
	<div>
	<v-card>
		<v-data-table
		v-bind:headers="headers"
		:items="items">
		<template slot="items" scope="props">
			<td>{{ props.item.descricao+" "+props.item.turno}}</td>
			<td class="text-xs-right">{{ props.item.ano }}</td>
			<td class="text-xs-right">    
			<v-btn class="red darken" fab small @click.prevent="deleteClasse(props.item.id)">
      		<v-icon >remove</v-icon>
    </v-btn>
    </td>
		</template>
	</v-data-table>
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
 				headers: [
  			  {
            text: 'Turma',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Ano', value: 'calories' },
          { text: 'ações', value: 'fat' },
				]
			}
		},
		mounted () {
			this.$store.dispatch('classesList')
			},
		computed: {
			items() {
				return this.$store.state.classes.list
			}
		},
		methods: {
			deleteClasse (id) {
				let dados = this.$store.dispatch('deleteClasse',id)
			dados.then(result => {
				 this.context = 'error'
				if(result.status==400){
				this.openSnackbar(result.data.errors)
        					} 
			if(result.status==200) {
				 this.context = 'success'
				this.openSnackbar("Turma deletada com sucesso!")
				}
  		})
				},
			openSnackbar(text){
				this.snackbar = true,
        		this.text= text
			}
		}
	}
	
</script>