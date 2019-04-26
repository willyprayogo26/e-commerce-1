<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>E-COMMERLY</span>
    </v-toolbar-title>
    <v-btn to="/" flat v-if="isLogin">
      <span>All Product</span>
    </v-btn>
    <v-btn to="/all-transaction" flat v-if="isLogin">
      <span>Transaction</span>
    </v-btn>
    <v-spacer></v-spacer>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Product</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Product Name" type="text" v-model="inputName" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Amount" type="number" v-model="inputAmount" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Price" type="number" v-model="inputPrice" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <input
                  label="Image"
                  type="file"
                  id="fileAdd"
                  ref="fileAdd"
                  @change="handleFileUpload"
                  style="border-style: none;"
                >
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addProduct">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn to="/all-cart" flat v-if="isLogin && role === 'user'" icon>
      <v-icon>fas fa-shopping-cart</v-icon>
    </v-btn>
    <v-btn to="/register" flat v-if="!isLogin">Register</v-btn>
    <v-btn to="/login" flat v-if="!isLogin">Login</v-btn>
    <v-btn flat v-if="isLogin && role === 'admin'" @click="dialog = true">Add Product</v-btn>
    <v-btn to="/logout" flat v-if="isLogin" @click="logout">Logout</v-btn>
  </v-toolbar>
</template>

<script>
import Swal from 'sweetalert2';
import axios from '../api/axios';

export default {
  props: ['isLogin', 'role'],
  name: 'navbar',
  data() {
    return {
      dialog: false,
      inputName: '',
      inputAmount: 0,
      inputPrice: 0,
      inputFile: '',
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/');
      this.$emit('change-is-login');
    },
    close() {
      this.inputName = '';
      this.inputAmount = 0;
      this.inputPrice = 0;
      this.inputFile = '';
      this.dialog = false;
    },
    handleFileUpload() {
      if (this.$refs.fileAdd.files[0]) {
        this.inputFile = this.$refs.fileAdd.files[0];
      }
    },
    addProduct() {
      const data = new FormData();
      data.append('name', this.inputName);
      data.append('amount', this.inputAmount);
      data.append('price', this.inputPrice);
      data.append('image', this.inputFile);

      axios({
        method: 'POST',
        url: '/products',
        data,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          this.close();
          this.$emit('get-all-product');
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
  },
};
</script>
