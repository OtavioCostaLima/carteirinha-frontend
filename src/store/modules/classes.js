let getInstitutionId = function () {
	return '?institution_id='+localStorage['institution_id']
}

export default {
	state: {
		list: [],
		select: []
	},
	mutations: {
		update (state,config) {
			state[config.state] = config.data
		}
	},
	actions: {
		classesList (context) {
			return axios.get('/classes'+getInstitutionId()).then(response => {
				context.commit('update', {state: 'list', data: response.data})
			})
		},
		classesSelect (context) {
			return axios.get('/classes'+getInstitutionId()).then(response => {
			let it = response.data
			let items = []
			for (var i = 0; i < it.length; i++) {
			items.push({text: it[i].descricao+" "+ it[i].turno + " - " + it[i].ano , value: it[i].id})
		}
			context.commit('update', {state: 'select', data: items})
			}).catch(error => {
			return error.response
		})
		},
		createClasse (context, classs) {
			return axios.post('/classes'+getInstitutionId(), {descricao: classs.descricao, ano: classs.ano, turno: classs.turno.text})
        .then( response => {
        	context.dispatch('classesList')
        	return response
      }).catch( error => {
        	return error.response
        })
		},
		deleteClasse (context, id) {
			return axios.get('/classes/'+id+getInstitutionId()).then( response => { context.dispatch('classesList') 
        	return response }).catch( error => { return error.response })
		}
	}
}