import Vue from 'vue'
import Vuex from 'vuex'
import student from './modules/students' 
import classes from './modules/classes' 
import points from './modules/points' 
import users from './modules/users' 
import institutions from './modules/institutions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  	student, classes, points, users, institutions
  }
})
