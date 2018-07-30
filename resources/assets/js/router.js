import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import FetchContent from './components/FetchContent';
import Home from './components/Home';
const router = new VueRouter({
    mode: 'history',
    routes:[
        {
            name:'home',
            path: '/',
            component: Home
        },
        {
            name:'section',
            path: '/s/:section',
            component: FetchContent
        },
        {path: '/*', redirect: '/'}
    ],
});

export default router;