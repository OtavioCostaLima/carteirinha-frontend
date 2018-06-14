export default {
	state: {
		institutionsList: []
	},
	mutations: {
		updateInstitutions (state, config) {
			state[config.state] = config.data 
		}
	},
	actions: {
		getInstitutions ({ commit }) {
			return axios.get('/institutions').then(response => {
					let it = response.data
			let items = []
			for (var i = 0; i < it.length; i++) {
			items.push({text: it[i].name, value: it[i].id})
		}			
				commit('updateInstitutions', { state: 'institutionsList',  data:  items })
				return response
			}).catch(error => {
				return error
			})
		}
	}
}