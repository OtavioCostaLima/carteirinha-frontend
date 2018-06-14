
let getInstutionId = function () {
	return '?institution_id='+localStorage['institution_id']

}


export default {
	state: {
		list: [],
		student: {}
	},
	mutations: {
		updateStudent (state,config) {
			state[config.state] = config.data
		}
	},
	getters: {
		getStudentsByClass (state) {
			return state.list
		},
	getStudentById: (state, getters) => (id) => {
    		return state.list.find(list => list.id == id)
  },
	getStudent (state, getters) {
    		return state.student
  }
	},
	actions: {
		fetchStudentById ({ commit }, id) {
			return axios.get('/students/'+id+getInstutionId()).then(response => {
				commit('updateStudent',  {state: 'student', data: response.data})
			})
		},

		studentList ({ commit }) {
			return axios.get('/students'+getInstutionId()).then(response => {
				commit('updateStudent',  {state: 'list', data: response.data})
			})
		},

		studentByClass ({ commit }, id) {
			return axios.get('/class/'+id+'/students'+getInstutionId()).then(response => {
				commit('updateStudent', {state: 'list', data: response.data})
			})
		},
		studentCreate ({ dispatch }, student) {
			return axios.post('/students'+getInstutionId(), { student }).then(response => {
				 dispatch('studentList')
				 return response
			}).catch(errors => {
				return errors.response
			})
		},
		studentUpdate (context, student) {
  		return axios({url: '/students/'+student.id+'/'+getInstutionId() ,method: 'PUT', data: student}).then(response => {
  			context.dispatch('studentList') 
  		}).catch(error => {
  			console.log(error.response)
  		})
		},
		deleteStudent (context, params) {
			return axios({method:'delete', url:'/students/'+params.student_id+getInstutionId()+'&class_id='+params.class_id})		
        .then( response => { 
        		console.log(response)
        	context.dispatch('studentList') 
        	return response
    }).catch(error => {
        	return error.response
        })
		}
	}

}