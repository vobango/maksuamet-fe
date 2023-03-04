import Vue from 'vue';
import Router from 'vue-router';
import Members from './views/members-component.vue';
import Events from './views/syndmused-component.vue';
import Info from './views/info-component.vue';

Vue.use(Router);

export default new Router({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/liikmed'
        },
        {
          path: '/liikmed',
          name: 'Members',
          component: Members
        },
        {
          path: '/syndmused',
          name: 'Events',
          component: Events
        },
        {
          path: '/info',
          name: 'Info',
          component: Info
        }
    ]
});
