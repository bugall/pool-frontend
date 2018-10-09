import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Aboutus from '@/components/Aboutus';
import Account from '@/components/Account';
import Manage from '@/components/manage/Index';
import Dashboard from '@/components/manage/Dashboard';
import Person from '@/components/manage/Person';
import Wallet from '@/components/manage/Wallet';

Vue.use(Router);

const router = new Router({

    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        }, {
            path: '/aboutus',
            name: 'Aboutus',
            component: Aboutus
        }, {
            path: '/login',
            name: 'login',
            component: Account
        }, {
            path: '/manage',
            name: 'manage',
            component: Manage,
            children: [{
                path: '',
                name: 'dashboard',
                component: Dashboard
            }, {
                path: 'person',
                name: 'person',
                component: Person
            }, {
                path: 'wallet',
                name: 'wallet',
                component: Wallet
            }, {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard
            }]
        }
    ]
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;
