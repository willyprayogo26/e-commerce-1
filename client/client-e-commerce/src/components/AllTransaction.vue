<template>
  <v-flex xs12>
    <v-card v-if="transaction.status === 'pending'" color="light-blue lighten-4">
      <v-card-title primary-title>
        <div>
          <div
            class="title"
          >INVOICE {{ transaction._id }} ({{ transaction.createdAt.slice(0, 10) }})</div>
          <span>
            <v-btn
              v-if="transaction.status === 'pending' && role === 'admin'"
              @click="changeStatusToSend"
            >Send</v-btn>
          </span>
          <span>
            <v-btn
              v-if="transaction.status === 'send' && role === 'user'"
              @click="changeStatusToDone"
            >Done</v-btn>
          </span>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show">
          <v-data-table :headers="headers" :items="transaction.product" class="elevation-1">
            <template v-slot:items="props">
              <td>{{ props.item.productId.name }}</td>
              <td class="text-xs-center">{{ props.item.amount }}</td>
              <td class="text-xs-center">Rp. {{ props.item.productId.price.toLocaleString() }}</td>
              <td
                class="text-xs-center"
              >Rp. {{ (props.item.amount * props.item.productId.price).toLocaleString() }}</td>
            </template>
          </v-data-table>Ongkir : Rp 10,000
          <br>
          Total : {{ (transaction.itemPrice + 10000).toLocaleString() }}
          <br>
          Status : {{ transaction.status }}
        </v-card-text>
      </v-slide-y-transition>
    </v-card>

    <v-card v-if="transaction.status === 'send'" color="lime accent-2">
      <v-card-title primary-title>
        <div>
          <div
            class="title"
          >INVOICE {{ transaction._id }} ({{ transaction.createdAt.slice(0, 10) }})</div>
          <span>
            <v-btn
              v-if="transaction.status === 'pending' && role === 'admin'"
              @click="changeStatusToSend"
            >Send</v-btn>
          </span>
          <span>
            <v-btn
              v-if="transaction.status === 'send' && role === 'user'"
              @click="changeStatusToDone"
            >Done</v-btn>
          </span>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show">
          <v-data-table :headers="headers" :items="transaction.product" class="elevation-1">
            <template v-slot:items="props">
              <td>{{ props.item.productId.name }}</td>
              <td class="text-xs-center">{{ props.item.amount }}</td>
              <td class="text-xs-center">Rp. {{ props.item.productId.price.toLocaleString() }}</td>
              <td
                class="text-xs-center"
              >Rp. {{ (props.item.amount * props.item.productId.price).toLocaleString() }}</td>
            </template>
          </v-data-table>Ongkir : Rp 10,000
          <br>
          Total : {{ (transaction.itemPrice + 10000).toLocaleString() }}
          <br>
          Status : {{ transaction.status }}
        </v-card-text>
      </v-slide-y-transition>
    </v-card>

    <v-card v-if="transaction.status === 'done'" color="light-green accent-3">
      <v-card-title primary-title>
        <div>
          <div
            class="title"
          >INVOICE {{ transaction._id }} ({{ transaction.createdAt.slice(0, 10) }})</div>
          <span>
            <v-btn
              v-if="transaction.status === 'pending' && role === 'admin'"
              @click="changeStatusToSend"
            >Send</v-btn>
          </span>
          <span>
            <v-btn
              v-if="transaction.status === 'send' && role === 'user'"
              @click="changeStatusToDone"
            >Done</v-btn>
          </span>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show">
          <v-data-table :headers="headers" :items="transaction.product" class="elevation-1">
            <template v-slot:items="props">
              <td>{{ props.item.productId.name }}</td>
              <td class="text-xs-center">{{ props.item.amount }}</td>
              <td class="text-xs-center">Rp. {{ props.item.productId.price.toLocaleString() }}</td>
              <td
                class="text-xs-center"
              >Rp. {{ (props.item.amount * props.item.productId.price).toLocaleString() }}</td>
            </template>
          </v-data-table>Ongkir : Rp 10,000
          <br>
          Total : {{ (transaction.itemPrice + 10000).toLocaleString() }}
          <br>
          Status : {{ transaction.status }}
        </v-card-text>
      </v-slide-y-transition>
    </v-card>
  </v-flex>
</template>

<script>
import Swal from 'sweetalert2';
import axios from '../api/axios';

export default {
  props: ['transaction', 'role'],
  name: 'AllTransaction',
  data() {
    return {
      show: false,
      total: 0,
      headers: [
        {
          text: 'Product Name',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Qty', value: 'amount', align: 'center' },
        { text: 'Price', value: 'productId.price', align: 'center' },
        { text: 'Total', value: 'total', align: 'center' },
      ],
    };
  },
  methods: {
    changeStatusToSend() {
      axios({
        method: 'PUT',
        url: `/transactions/${localStorage.getItem('id')}/${this.transaction._id}`,
        data: {
          status: 'send',
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          this.$emit('get-all-transaction');
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
    changeStatusToDone() {
      axios({
        method: 'PUT',
        url: `/transactions/${localStorage.getItem('id')}/${this.transaction._id}`,
        data: {
          status: 'done',
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          this.$emit('get-transaction-by-user');
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
