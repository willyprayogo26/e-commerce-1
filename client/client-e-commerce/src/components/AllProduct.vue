<template>
  <v-flex xs4 sm3>
    <v-card>
      <v-img :src="product.pictureUrl" height="200px" contain @click="getDetails(product)"></v-img>

      <v-card-title primary-title>
        <div>
          <div class="title">{{ product.name }}</div>
          <span class="grey--text">Rp. {{ product.price.toLocaleString() }}</span>
        </div>
      </v-card-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Update Product</span>
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
                    id="fileUpdate"
                    ref="fileUpdate"
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
            <v-btn color="blue darken-1" flat @click="updateProduct">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card-actions class="justify-center">
        <v-btn v-if="role === 'user' && product.amount !== 0" flat @click="addToCart(product._id)">Add To Cart</v-btn>
        <v-btn v-if="role === 'user' && product.amount === 0" disabled>Add To Cart</v-btn>

        <v-btn v-if="role === 'admin'" flat @click="showUpdateDetails(product)">Edit</v-btn>
        <v-btn v-if="role === 'admin'" flat @click="showDeleteConfirmation(product._id)">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import Swal from 'sweetalert2';
import axios from '../api/axios';

export default {
  props: ['product'],
  name: 'AllProduct',
  data() {
    return {
      dialog: false,
      inputName: '',
      inputAmount: 0,
      inputPrice: 0,
      inputFile: '',
      idProduct: null,
      role: localStorage.getItem('role'),
    };
  },
  methods: {
    close() {
      this.inputName = '';
      this.inputAmount = 0;
      this.inputPrice = 0;
      this.inputFile = '';
      this.dialog = false;
    },
    showUpdateDetails(product) {
      this.inputName = product.name;
      this.inputAmount = product.amount;
      this.inputPrice = product.price;
      this.inputFile = product.pictureUrl;
      this.idProduct = product._id;
      this.dialog = true;
    },
    showDeleteConfirmation(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          axios({
            method: 'DELETE',
            url: `/products/${id}`,
            headers: {
              token: localStorage.getItem('token'),
            },
          })
            .then(({ data }) => {
              this.$emit('get-all-product');
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
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
        }
      });
    },
    handleFileUpload() {
      if (this.$refs.fileUpdate.files[0]) {
        this.inputFile = this.$refs.fileUpdate.files[0];
      }
    },
    updateProduct() {
      const data = new FormData();
      data.append('name', this.inputName);
      data.append('amount', this.inputAmount);
      data.append('price', this.inputPrice);
      data.append('image', this.inputFile);

      axios({
        method: 'PUT',
        url: `/products/${this.idProduct}`,
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
    updateStock(id) {
      axios({
        method: 'PATCH',
        url: `/products/${localStorage.getItem('id')}/${id}`,
        data: {
          amount: -1,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          console.log(data);
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
    addToCart(id) {
      this.updateStock(id);
      axios({
        method: 'PATCH',
        url: `/carts/add/${localStorage.getItem('id')}`,
        data: {
          product: {
            productId: id,
            amount: 1,
          },
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          console.log(data);
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
    getDetails(product) {
      this.$router.push(`/all-product/${product._id}`);
      this.$emit('get-details', product);
    },
  },
};
</script>
