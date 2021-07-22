import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/components/MainPage.vue';
import TransactionList from '@/components/Transactions/TransactionList.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: TransactionList,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router