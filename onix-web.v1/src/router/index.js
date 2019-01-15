import Vue from 'vue'
import Router from 'vue-router'
import Workspace from '@/components/workspace/workspace'
import LayoutDemo from '@/components/layout/demo'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'onix',
            component: Workspace,
        },
        {
            path: '/layout',
            name: 'layout-demo',
            component: LayoutDemo,
        },
    ],
})
