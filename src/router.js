import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        }
    ]
});