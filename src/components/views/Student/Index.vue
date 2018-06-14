<template>
<div>
	<h4>Alunos</h4>
	 <v-btn id="btn-imprimir"
      info
      :loading="loading4"
      @click.native="loader = 'loading4'"
      :disabled="loading4"
      v-on:click="imprimir"
    >
      Gerar Carteirinha
      <span slot="loader" class="custom-loader">
        <v-icon light>cached</v-icon>
      </span>
    </v-btn>
	<form-student></form-student>
	<table-student></table-student>
</div>
	
</template>

<script>
	import FormStudent from './FormStudent.vue'
	import TableStudent from './TableStudent.vue'

export default {
	components: {
		TableStudent, FormStudent
	},
	data () {
		return {
			loading4: false,
			loader: null,
		} 
	},
	 watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      }
    },
	 methods: {
		imprimir() {
  this.errors = "Gerando carteirinhas!"
   axios.get('/api/v1/reports?class_id='+this.idTurma, {responseType:'arraybuffer'})
 .then( response => {
    let blob = new Blob([response.data], { type:  'application/pdf' } )
    let link = document.createElement('a')
   link.href = window.URL.createObjectURL(blob)
   window.open(link.href);
    }).catch(error => {
     console.log(error.response.data.errors)
    })
   setInterval(function () {this.errors = ""}.bind(this), 3000)
   },
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

