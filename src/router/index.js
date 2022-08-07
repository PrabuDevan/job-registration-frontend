import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import ViewApplicants from '../views/ViewApplicants.vue'
import AppLogin from '../views/AppLogin.vue'
import CreateUpdateApplicant from '../components/CreateUpdateApplicant.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: AppLogin
  },
  {
    path: '/admin',
    component: AdminView,
    redirect: { name: 'ViewApplicants' },
    children: [
      {
        path: "view-applicants",
        name: "ViewApplicants",
        component: ViewApplicants,
        meta: {
          layout: 'AdminLayout'
        },
      },
      {
        path: "edit-applicant/:id",
        name: "EditApplicant",
        component: CreateUpdateApplicant,
        meta: {
          layout: 'AdminLayout'
        },
      },
      {
        path: "add-applicant",
        name: "AddApplicant",
        component: CreateUpdateApplicant,
        meta: {
          layout: 'AdminLayout'
        },
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
