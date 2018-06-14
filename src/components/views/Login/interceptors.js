import { CONFIG } from '../../../config'

let getToken = function () {
	let token = localStorage['token']
	if(!token) {
		token = '{}'
	}
	return JSON.parse(token)
}

let token = getToken()

  let login = function (router) {
  	router.push('/login')
  }

  let refreshToken = function (request, token, router) {
    console.log(request)
   	let data = {
  		grant_type: 'refresh_token',
  		refresh_token: token.refresh_token,
  		client_id: CONFIG.client_id,
  		client_secret: CONFIG.client_secret,
  	 scope: ''
     }

   axios.post('http://localhost:8000/oauth/token', data).then(res => {
	     localStorage['token'] = JSON.stringify(res.data)
         request.headers['Authorization'] = 'Bearer ' + token.access_token
   		 console.log('TOKEN REFRESHED')
    }).catch( error => {
     	  	console.log(error)
  	if(error.response.status===400) {
  		login(router)
  	}
 })

}

export default {

 chek_empty_token: function (router) {
	token = getToken()
	if(!token.access_token) {
    	login(router) 
	}
 },

check_auth: function(router) {
     axios.interceptors.request.use( (res) => {
     token = getToken()
	 res.headers.common['Authorization'] = 'Bearer ' + token.access_token
  return res
	})
 },

check_auth_response: function (router) {
  	axios.interceptors.response.use (null , error => {
      console.log(error)
	const request = error.config
		if (error.response.status === 401) {
			console.log('não autorizado, atualizar token')
        login(router)
		 //	refreshToken(request, token, router)
		}
		  return Promise.reject(error)
	})
}

}









