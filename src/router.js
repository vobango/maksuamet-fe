import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home-component.vue'

Vue.use(Router);

export default new Router({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        }
    ]
});
