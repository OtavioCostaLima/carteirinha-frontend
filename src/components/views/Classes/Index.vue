<template>
	<div>
		<h4>Turmas</h4>
		<form-classe></form-classe>
		<table-classe></table-classe>
	</div>
</template>

<script>
import TableClasse from './TableClasse.vue'
import FormClasse from './FormClasse.vue'

	export default {
		components: {
			TableClasse, FormClasse
		},
		data () {
			return {

			}
		}
	}
</script>