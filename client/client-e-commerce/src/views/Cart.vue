<template>
  <v-container grid-list-lg>
    <v-flex xs12 sm6 offset-sm3>
      <v-layout align-center justify-center row wrap>
        <v-data-table :headers="headers" :items="carts.product" class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.productId.name }}</td>
            <td class="text-xs-center">{{ props.item.amount }}</td>
            <td class="text-xs-center">{{ props.item.productId.price.toLocaleString() }}</td>
            <td class="text-xs-center">
              <v-icon small @click="deleteProductFromCart(props.item)">delete</v-icon>
            </td>
          </template>
        </v-data-table>
        <v-btn block color="secondary" dark @click="getConfirmation">Checkout</v-btn>
      </v-layout>
    </v-flex>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Transaction Confirmation</v-card-title>

        <v-card-text>Are you sure to checkout? You can't cancel after transaction.</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" flat @click="toTransaction">Go Transaction</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2';
import axios from '@/api/axios';

export default {
  data() {
    return {
      dialog: false,
      carts: [],
      headers: [
        {
          text: 'Product Name',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Qty', value: 'amount', align: 'center' },
        { text: 'Price', value: 'productId.price', align: 'center' },
        {
          text: 'Option',
          value: 'cancel',
          align: 'center',
          sortable: false,
        },
      ],
    };
  },
  created() {
    if (localStorage.getItem('token')) {
      this.getCart();
    }
  },
  methods: {
    getCart() {
      axios({
        method: 'GET',
        url: `/carts/${localStorage.getItem('id')}`,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          this.carts = data;
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
    updateStock(item) {
      axios({
        method: 'PATCH',
        url: `/products/${localStorage.getItem('id')}/${item.productId._id}`,
        data: {
          amount: item.amount,
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
    deleteProductFromCart(item) {
      this.updateStock(item);
      axios({
        method: 'PATCH',
        url: `/carts/delete/${localStorage.getItem('id')}`,
        data: {
          productId: item._id,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          this.getCart();
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
    emptyCart(id) {
      axios({
        method: 'PATCH',
        url: `/carts/delete/${localStorage.getItem('id')}`,
        data: {
          productId: id,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          this.getCart();
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
    getConfirmation() {
      if (this.carts.product.length !== 0) {
        this.dialog = !this.dialog;
      } else {
        Swal.fire({
          title: 'Cart is empty, please select product to cart first',
          animation: false,
          customClass: {
            popup: 'animated swing',
          },
        });
      }
    },
    toTransaction() {
      const product = [];
      this.carts.product.forEach((e) => {
        product.push({
          productId: e.productId._id,
          amount: e.amount,
        });
        this.emptyCart(e._id);
      });

      let total = null;
      this.carts.product.forEach((e) => {
        total += e.amount * e.productId.price;
      });

      axios({
        method: 'POST',
        url: `/transactions/${localStorage.getItem('id')}`,
        data: {
          product,
          itemPrice: total,
          deliverPrice: 10000,
          totalPrice: total + 10000,
          user: this.carts.userId,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          this.dialog = !this.dialog;
          Swal.fire({
            type: 'success',
            title: 'Successfully transaction',
            showConfirmButton: false,
            timer: 1500,
          });
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
