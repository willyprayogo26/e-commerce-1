<template>
  <v-container grid-list-xl>
    <v-layout align-center justify-center row wrap>
      <AllTransaction
        v-for="(transaction, index) in transactions"
        :key="index"
        :transaction="transaction"
        :role="role"
        @get-all-transaction="getAllTransaction"
        @get-transaction-by-user="getTransactionByUser"
      />
    </v-layout>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2';
import axios from '@/api/axios';
import AllTransaction from '@/components/AllTransaction.vue';

export default {
  props: ['role'],
  components: {
    AllTransaction,
  },
  name: 'Transaction',
  data() {
    return {
      transactions: [],
    };
  },
  created() {
    if (localStorage.getItem('token') && this.role === 'admin') {
      this.getAllTransaction();
    } else if (localStorage.getItem('token') && this.role === 'user') {
      this.getTransactionByUser();
    }
  },
  methods: {
    getAllTransaction() {
      axios({
        method: 'GET',
        url: '/transactions',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          this.transactions = data;
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
    getTransactionByUser() {
      axios({
        method: 'GET',
        url: `/transactions/${localStorage.getItem('id')}`,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          this.transactions = data;
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
