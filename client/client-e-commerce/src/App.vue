<template>
  <v-app>
    <navbar @change-is-login="changeIsLogin" :isLogin="isLogin" :role="role" @get-all-product="isNew = true"/>
    <v-content>
      <!-- <RegisForm /> -->
      <!-- <HelloWorld/> -->
      <router-view @change-is-login="changeIsLogin" :isLogin="isLogin" :role="role" :isNew="isNew" @setNewToFalse="isNew = false" />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    Navbar,
    HelloWorld,
  },
  data() {
    return {
      isLogin: false,
      isNew: false,
      role: '',
    };
  },
  created() {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
      this.role = localStorage.getItem('role');
    }
  },
  methods: {
    changeIsLogin() {
      this.isLogin = !this.isLogin;
      if (this.isLogin) {
        this.role = localStorage.getItem('role');
      }
    },
  },
};
</script>
