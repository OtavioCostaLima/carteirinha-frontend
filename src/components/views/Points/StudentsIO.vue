<template>
  <div>
      <H4 class="color-red">Entrada de Alunos</H4>
 <v-layout row> 
    <v-flex xs12 >
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
 </v-layout row> 

<v-card fluid>
<v-card-text>
  <v-container>
     <v-layout row> 
    <v-flex xs6>
         <v-select
          name="class_id"
          label="Turma"
         v-bind:items="items"
         v-model="class_id"
         >
        </v-select>
      </v-flex> 

     <v-flex xs3>
         <v-select
          v-bind:items="tipo"
          label="Tipo"
          v-model="present" 
          name="present" 
         >
          </v-select>
         </v-flex>


    <v-flex xs3 sm3>
        <v-menu
          lazy
          :close-on-content-click="false"
          v-model="menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-left="40"
          max-width="290px"
        >
          <v-text-field
            slot="activator"
            label="Data"
            v-model="data" 
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker 
          locale="pt-BR"
          v-model="data"  no-title scrollable actions>
            <template scope="{ save, cancel }">
              <v-card-actions>
                <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                <v-btn flat primary @click.native="save()">Save</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
      </v-flex>

   <v-flex>
       <v-btn fab small class="right" v-on:click="fetchStudents"><v-icon>search</v-icon></v-btn>
         </v-flex>
      </v-layout>
   
  </v-container>
   </v-card-text>
</v-card>


<v-card class="mt-2">
  <v-data-table 
  :items="students"
  v-bind:headers="headers"
  no-data-text="Não há dados disponíveis"
  >
      <template slot="items" scope="props">
      <td>{{ props.item.nome }}</td>
      <td class="">{{ props.item.id }}</td>
      <td class="">{{classs.descricao}}</td>
      <td class="">{{ props.item.telefone }}</td>
      </template>
  </v-data-table>  
</v-card>
  </div>
</template>

<script>
export default {
  name: "StudentsIO",
  data() {
    return {
       headers: [
          {
            text: 'Aluno',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Matricula', value: '',align: 'left', sortable: false },
          { text: 'Turma', value: '' , sortable: false, align: 'left'},
          { text: 'Telefone', value: '' , sortable: false, align: 'left'},
        ], 
        tipo: [{text: 'Ausentes', value: 0},
        {text: 'Presentes', value: 1}],
        data:'',
        menu: '',
        turmas: [],
        class_id: '',
        present: '',
        loading4: false,
         loader: null
    }
  },
    methods: {
    imprimir() {
       this.loading4 = true
    let values = 'data='+this.data+'&class_id='+this.class_id+'&present='+this.present
    let result = this.$store.dispatch('imprimir', values)
    result.then( res => {
           this.loading4 = false
    }).catch(error => {
          this.loading4 = false
    })
  },
     fetchStudents() {
       let values = 'data='+this.data+'&class_id='+this.class_id+'&present='+this.present
      if(this.data!=null && this.class_id!=null && this.present!=null){
      this.$store.dispatch('fetchStudentsByFilters',  values)
       } else{
           this.alunos = []
         }
     }
},
    mounted() {
      this.$store.dispatch('classesSelect')
    },
    computed: {
      items () {
        return  this.$store.state.classes.select
      },
      students () {
        return this.$store.getters.getPoints.list
      },
      classs () {
        return this.$store.getters.getPoints.classs
      }

   }
}
</script>
<style>
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
