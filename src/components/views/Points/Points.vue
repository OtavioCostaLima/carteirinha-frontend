<template>

  <div id="points">
  <h4>Entrada e Saída de alunos</h4>
<v-layout row>
  <v-flex xs12 sm12 class="mb-2">
      <v-btn dark class="right red" to="StudentsToday">Consultar Alunos
</v-btn>
  </v-flex>
</v-layout>
 
  <v-card>
  <v-container fluid>
  <v-card-text>

<v-layout row>   
        <v-flex xs4>
            <v-text-field
              name="id" 
              label="Entre com a matrícula"
              v-model="matricula"
              @keydown.ctrl.74="bloquearCtrlJ" 
              @keydown.enter.prevent="createPoint" 
              v-focus="focused"
              @focus="focused = true" 
              @blur="focused = false"
              required
              ></v-text-field>
          </v-flex>     
        <v-flex xs4> 
         <v-select
            name="tipo"
            label="Tipo"
            v-bind:items="['ENTRADA','SAÍDA']"
            v-model="tipo"
           >
          </v-select>  
        </v-flex>
   <v-flex xs4 class="mr-5">
       <v-btn fab small class="right" v-on:click="createPoint"><v-icon>search</v-icon></v-btn>
         </v-flex>

  </v-layout>
</v-card-text>
    </v-container>
   </v-card>


<v-card class="mt-4" v-show="showTable">    
   <v-data-table
   hide-actions
    v-bind:headers="headers"
    class="elevation-1"
    v-bind:items="items"
    >
  <template slot="items" scope="props">
      <td class="">{{ props.item.id }}</td>
      <td class="">{{ props.item.nome }}</td>
      <td class="">{{ props.item.created_at }}</td>
  </template>
  </v-data-table>
  </v-card>
  </div>

</template>
<script>
import { focus } from 'vue-focus';
export default {
  directives: { focus: focus },
  name: "points",
  data() {
    return {
      headers: [
          { text: 'Matricula', value: '', align: 'left', sortable: false },
          { text: 'Nome', value: '', sortable: false, align: 'left'},
          { text: 'Data', value: '', sortable: false, align: 'left'}
        ]   ,
      matricula : "",
      showTable: false,
      tipo:"ENTRADA",
      error:'',
      }
  },
  methods: {
    createPoint () {
      if(this.matricula!="" && this.matricula!=null){
      let val = this.$store.dispatch('createPoint',{student_id: this.matricula, tipo: this.tipo})
        val.then(res => {
            if(res.status==200){
            this.showTable = true
          } else{
            this.showTable = false
          }
          })
        this.matricula=''
   
      }else{
        alert("Informe a matrícula!")
    }
   },
    altualizar(){
      this.focused=true;
    },

     bloquearCtrlJ() {
        event.returnValue = false;
      }
  },
  created() {
     this.altualizar();
     setInterval(function () {
     this.altualizar();
   }.bind(this), 2000);
 },
 computed: {
  items () {
     return this.$store.state.points.student
  }
 }
}
</script>



<style>
</style>
