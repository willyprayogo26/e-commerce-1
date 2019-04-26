import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './components/RegisForm.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './components/LoginForm.vue'),
    },
    {
      path: '/',
      name: 'allProduct',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      children: [
        {
          path: 'product/:id',
          name: 'productDetails',
          component: () => import(/* webpackChunkName: "product-detail" */ './components/ProductDetail.vue'),
        },
      ],
    },
    {
      path: '/all-cart',
      name: 'allCart',
      component: () => import(/* webpackChunkName: "cart" */ './views/Cart.vue'),
    },
    {
      path: '/all-transaction',
      name: 'allTransaction',
      component: () => import(/* webpackChunkName: "transaction" */ './views/Transaction.vue'),
    },
  ],
});
