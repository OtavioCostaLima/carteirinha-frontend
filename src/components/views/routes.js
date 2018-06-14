import Points from './Points/Points.vue'
import StudentsIO from './Points/StudentsIO.vue'
import TableStudent from './Student/TableStudent.vue'
import UpdateStudentForm from './Student/UpdateStudentForm.vue'
import FormStudent from './Student/FormStudent.vue'
import IndexClasse from './Classes/Index.vue'
import FormLogin from './Login/FormLogin.vue'
import Index from '../Index.vue'
import FormParent from './Parent/FormParent.vue'
import Dashboard from './Dashboard/Dashboard.vue'
import Site from '../Site/Index.vue'
import CreateSchool from './Login/CreateSchool.vue'


export default [
	{path: '/dashboard', component: Dashboard,
	 children: [
        {path: 'points', component: Points},
        {path: 'studentstoday', component: StudentsIO},
        {path: 'classes', component: IndexClasse},
        {path: 'students', component: TableStudent},
        {path: 'students/create', component: FormStudent},
        {path: 'students/:id/edit', component: UpdateStudentForm}
        
      ]},
    {path: '/', component: FormLogin},
    {path: '/school/create', component: CreateSchool},
    {path: 'parents', component: FormParent},
    {path: '/site', component: Site},
    {path: '/login', component: FormLogin}]
