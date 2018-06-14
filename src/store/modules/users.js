export default {
 state: {
 	user: []
 },

 mutations: {
 		updateUser (state,config) {
			state[config.state] = config.data
		}
	},

  getters: {
  	getUser (state) {
  		return state.user;
  	}
  },

 actions: {
 	login (state, data) {

 			return axios.post('http://localhost:8000/oauth/token', data.data).then(res => {
			 	localStorage['token'] = JSON.stringify(res.data)
			 	localStorage['institution_id'] = JSON.stringify(data.data.institution_id)
			 	axios.get('http://localhost:8000/api/user?institution_id='+localStorage['institution_id']).then(res => {
			 		state.commit('updateUser', { state: 'user', data: res.data})
			 		return res
			 	}).catch ( error => { 
			 		console.log(error.response)
					return error
			 	})
			data.router.push('/dashboard/students')
			}).catch(error => {
				console.log(error)
					return error
			})
 	},
 	logout (state, router) {
 		localStorage['token'] = '',
 		data.router.push('/dashboard/students')
 	}
 }
}