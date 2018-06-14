<template>
	<div>

  <v-layout row> 
<v-flex>  
      <v-btn primary 
         class="right red" 
         :loading="loading4"
         @click.native="imprimir"
         :disabled="loading4">
     
       <v-icon dark class="mr-2">print</v-icon>Imprimir
           <span slot="loader" class="custom-loader">
        <v-icon light>cached</v-icon>
      </span>
      </v-btn>
      </v-flex>
      </v-layout>

<v-card>		
<v-card-title class="mb-0 pb-0">
  <v-select label="Turma" 
  :items="classes"
  v-model="class_id"
  >
  </v-select>
  <v-spacer></v-spacer>
  <v-spacer></v-spacer>
</v-card-title>


	 <v-data-table
		v-bind:headers="headers"
      	:items="students"
      	 class="elevation-1"
      	 v-bind:pagination.sync="pagination"
         no-data-text="Não há dados disponíveis"
      >
		 	
	<template slot="items" scope="props">
      <td>{{ props.item.nome }}</td>
      <td class="">{{ props.item.id }}</td>
      <td class="text-xs-right" >

 


    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
      <v-btn primary fab  small dark slot="activator"> <v-icon>visibility</v-icon></v-btn>
      <v-card>
        <v-toolbar dark class="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Aluno</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">OK</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-layout row> 
<v-flex>  
      <v-btn primary 
         class="right red" 
         :loading="loading4"
         @click.native="imprimirCarteirinha(props.item.id)"
         :disabled="loading4">
     
       <v-icon dark class="mr-2">print</v-icon>Imprimir
           <span slot="loader" class="custom-loader">
        <v-icon light>cached</v-icon>
      </span>
      </v-btn>
      </v-flex>
      </v-layout>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Nome</v-list-tile-title>
              <v-list-tile-sub-title>{{ props.item.nome }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Email</v-list-tile-title>
              <v-list-tile-sub-title>{{ props.item.email }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
              <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Telefone</v-list-tile-title>
              <v-list-tile-sub-title>{{ props.item.telefone }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>

     
        </v-list>
      </v-card>
    </v-dialog>



       <v-btn dark class="teal" fab small  @click.prevent="updateStudent(props.item.id)"><v-icon>edit</v-icon></v-btn>
       <v-btn dark class="red darken" fab small  @click.native.stop="openMessageDelete(props.item.id)"><v-icon>remove</v-icon></v-btn>
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
      v-model="snackbar"
      :vertical="mode === 'vertical'"
      top
    >
      {{ text }}
      <v-btn dark flat  @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
     </v-flex>


<v-layout row justify-center style="position: relative;">
    <v-dialog v-model="dialogDelete" lazy absolute>
      <v-card>
        <v-card-title>
          <div class="headline">Tem certeza?</div>
        </v-card-title>
        <v-card-text>Depois que deletar o aluno não terá como recupera-lo.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialogDelete = false">cancelar</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="deleteStudent(idDelete)">Aceito</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>


	</div>
</template>

<script>
	export default {
		data () {
			return {
      dialogDelete: false,
      idDelete: '',
      dialog: false,
      loading4: false,
      loader: null,
	      snackbar: false,
        context: 'error',
        mode: '',
        timeout: 3000,
        text: '',
        class_id: '',
        id: '',
		    pagination: {
          sortBy: 'name'
        },
headers: [
          {
            text: 'Aluno',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'matricula', value: 'calories',align: 'left', },
          { text: 'ação', value: 'fat' },
        ]   
		}
	},
		created () {
      this.$store.dispatch('classesSelect')
      },
		computed: {
			students () {
         const id1 = this.class_id;
         if (id1>0 && id1 != this.id) {
          this.id = id1
           this.$store.dispatch('studentByClass', id1)
        }
         return this.$store.getters.getStudentsByClass
			},
      classes () {
        return this.$store.state.classes.select
      }
		},
		methods: {
      openMessageDelete (id) {
        this.dialogDelete = true
        this.idDelete = id
       },
        updateStudent (id) {
          this.$router.push('/dashboard/students/'+id+'/edit')
        },
				deleteStudent (id) {
          const idClass = this.id 
 				let dados = this.$store.dispatch('deleteStudent',{ student_id: id, class_id: idClass })
			dados.then(result => {
					if(result.status==200) {
        this.dialogDelete = false
				this.context="success"
				this.openSnackbar("Aluno deletado com sucesso!")

				} else {
					this.openSnackbar(result.data.errors)
				}
  		})
				},
        imprimir() {
  this.loading4 = true
  axios.get('/reports/carteirinha?class_id='+this.class_id+'&institution_id='+localStorage['institution_id'], {responseType:'arraybuffer'})
  .then( response => {
    let blob = new Blob([response.data], { type:  'application/pdf' } )
                  let link = document.createElement('a')
                  link.href = window.URL.createObjectURL(blob)
                    this.loading4 = false
                  window.open(link.href)
}).catch(error => {
   this.loading4 = false
console.log(error.response.data.errors)
})
},
    imprimirCarteirinha(id) {
  this.loading4 = true
  axios.get('/reports/carteirinha?student_id='+id+'&class_id='+this.class_id+'&institution_id='+localStorage['institution_id'], {responseType:'arraybuffer'})
  .then( response => {
    let blob = new Blob([response.data], { type:  'application/pdf' } )
                  let link = document.createElement('a')
                  link.href = window.URL.createObjectURL(blob)
                    this.loading4 = false
                  window.open(link.href)
}).catch(error => {
   this.loading4 = false
console.log(error.response.data.errors)
})
},
			openSnackbar(text){
				this.snackbar = true,
        		this.text= text
			}
		}
	}
</script>

<style>
.glyphicon {
  color: rgb(0, 0, 0);
}

.glyphicon:hover {
  color: rgb(71, 67, 71);
}

th{
  text-align: center;
}


#m-top{
  padding-top: 20px;
}

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>