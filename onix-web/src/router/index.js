import Vue from 'vue'
import Router from 'vue-router'
import Giant from '@/components/giant'
import LayoutDemo from '@/components/layout/demo'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'onix',
            component: Giant,
        },
        {
            path: '/layout',
            name: 'layout-demo',
            component: LayoutDemo,
        },
    ],
})
