import Vue from 'vue'
import Router from 'vue-router'
import Giant from '@/components/giant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Onix',
      component: Giant,
    },
  ],
})
