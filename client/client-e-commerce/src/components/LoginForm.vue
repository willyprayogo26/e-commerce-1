<template>
  <v-container grid-list-md text-xs-center fill-height>
    <v-layout align-center justify-center row>
      <v-form fill-height ref="form" style="width: 400px;">
        <v-text-field v-model="inputEmail" :rules="emailRules" label="E-mail" required></v-text-field>
        <v-text-field
          v-model="inputPassword"
          :rules="passwordRules"
          label="Password"
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          required
        ></v-text-field>

        <v-btn @click="login">Login</v-btn>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2';
import axios from '../api/axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      inputEmail: '',
      inputPassword: '',
      show: false,
      emailRules: [v => !!v || 'Email is required'],
      passwordRules: [v => !!v || 'Password is required'],
    };
  },
  methods: {
    login() {
      axios({
        method: 'POST',
        url: '/login',
        data: {
          email: this.inputEmail,
          password: this.inputPassword,
        },
      })
        .then(({ data }) => {
          localStorage.setItem('id', data.id);
          localStorage.setItem('name', data.name);
          localStorage.setItem('email', data.email);
          localStorage.setItem('role', data.role);
          localStorage.setItem('token', data.token);
          this.$router.push('/all-product');
          this.$emit('change-is-login');
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated swing',
            },
          });
        });
    },
    cancel() {
      this.$refs.form.reset();
    },
  },
};
</script>
