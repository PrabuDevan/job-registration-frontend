import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import ViewApplicants from '../views/ViewApplicants.vue'
import AppLogin from '../views/AppLogin.vue'
import CreateUpdateApplicant from '../components/CreateUpdateApplicant.vue'
import ViewUser from '../components/ViewUser.vue'
import store from '@/store'

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
    path: '/profile',
    name: 'Profile',
    component: ViewUser,
    meta: {
      authRequired: true
    }
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
          layout: 'AdminLayout',
          authRequired: true,
          shouldBeAdmin: true
        },
      },
      {
        path: "edit-applicant/:id",
        name: "EditApplicant",
        component: CreateUpdateApplicant,
        meta: {
          layout: 'AdminLayout',
          authRequired: true,
          shouldBeAdmin: true
        },
      },
      {
        path: "add-applicant",
        name: "AddApplicant",
        component: CreateUpdateApplicant,
        meta: {
          layout: 'AdminLayout',
          authRequired: true,
          shouldBeAdmin: true
        },
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const authRequired = to.meta?.authRequired;
  const shouldBeAdmin = to.meta?.shouldBeAdmin;
  const loggedIn = store.getters.isLoggedIn;
  const isAdmin = store.getters.isAdmin;
  // redirect to login page if user is not logged in and trying to access a restricted page
  if (authRequired && !loggedIn) {
      return next('/login');
  }
  // redirect to home page if user is logged in and trying to access login page
  if (loggedIn && !authRequired) {
      return next('/profile');
  }
  // user shouldn't access admin routes
  if (loggedIn && shouldBeAdmin && !isAdmin) {
    return next('/profile')
  }
  next();
})


export default router
