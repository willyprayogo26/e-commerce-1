<template>
  <v-flex xl12>
    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="unShow">
          <v-icon>far fa-times-circle</v-icon>
        </v-btn>
      </v-card-actions>

      <v-img class="justify-center" :src="product.pictureUrl" height="300px" contain></v-img>

      <v-card-title primary-title>
        <div>
          <div class="title">{{ product.name }}</div>
          <span>Stock: {{ product.amount }}</span><br>
          <span>Price: Rp. {{ product.price.toLocaleString() }}</span><br>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
import Swal from 'sweetalert2';
import axios from '../api/axios';

export default {
  props: ['product'],
  name: 'ProductDetail',
  data() {
    return {
      role: localStorage.getItem('role'),
    };
  },
  methods: {
    unShow() {
      this.$router.push('/');
      this.$emit('change-detail-state');
    },
  },
};
</script>
