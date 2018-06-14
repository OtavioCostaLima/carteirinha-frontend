let getInstitutionId = function () {
	return '?institution_id='+localStorage['institution_id']
}

export default {
	state: {
		student: [],
		classs: '',
		list: []
	},
	mutations: {
		updatePoint (state, config) {
			state[config.state] = config.data
		}
	},
	actions: {
		createPoint (context, values) {
		 return axios.post("/points"+getInstitutionId(), { student_id: values.student_id, tipo: values.tipo })
      .then(response => {
        	context.commit('updatePoint', {state: 'student', data: response.data })
        return response
         }).catch(error => {
         return error.response.data.errors
    })
		},
		fetchStudentsByFilters (context, filters) {
			  return axios.get('/points/students/now'+getInstitutionId()+'&'+filters).then( response=> {
			  context.commit('updatePoint', { state: 'list', data: response.data.students })
			  context.commit('updatePoint', { state: 'classs', data: response.data.classs })
         	  return response }).catch(error => { return error.response.errors })
		},
	    imprimir(context, values) {
         return axios.get('/reports/points'+getInstitutionId()+'&'+ values, {responseType:'arraybuffer'})
    .then( response => {
      let blob = new Blob([response.data], { type:  'application/pdf' } )
        if(blob.size>0){
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    window.open(link.href);
                  }
                   return response
    }).catch(error => {
    	return error
     })
  }
	},
	getters: {
		getPoints (state) {
			return state
		}
	}
}