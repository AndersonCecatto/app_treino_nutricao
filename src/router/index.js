import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "../views/Telas/LoginView.vue";
import IncialEmpresaView from "../views/Telas/InicialEmpresaView.vue";
import InicialAlunoView from "../views/Telas/InicialAlunoView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/inicial',
    name: 'inicial',
    component: IncialEmpresaView
  },
  {
    path: '/principal',
    name: 'principal',
    component: InicialAlunoView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
