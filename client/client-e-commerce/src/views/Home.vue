<template>
  <v-container grid-list-lg>
    <ProductDetails
      v-if="detail === true"
      :product="product"
      @change-detail-state="detail = false"
    />
    <v-layout align-center justify-center row wrap>
      <AllProduct
        v-for="(product, index) in products"
        :key="index"
        :product="product"
        @get-all-product="getAllProduct"
        @get-details="getDetails"
      />
    </v-layout>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2';
import axios from '@/api/axios';
import AllProduct from '@/components/AllProduct.vue';
import ProductDetails from '@/components/ProductDetail.vue';

export default {
  components: {
    AllProduct,
    ProductDetails,
  },
  data() {
    return {
      products: [],
      product: {},
      id: null,
      detail: false,
    };
  },
  created() {
    if (localStorage.getItem('token')) {
      this.getAllProduct();
      if (this.$route.params.id) {
        this.getDetails();
      }
    }
  },
  methods: {
    getAllProduct() {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          this.products = data;
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
      // if (product) {
      //   this.$router.push(`/all-product/${product._id}`);
      // }
      if (this.$route.params.id) {
        axios({
          method: 'GET',
          url: `/products/${localStorage.getItem('id')}/${
            this.$route.params.id
          }`,
          headers: {
            token: localStorage.getItem('token'),
          },
        })
          .then(({ data }) => {
            this.product = data;
            this.detail = true;
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
      } else {
        axios({
          method: 'GET',
          url: `/products/${localStorage.getItem('id')}/${product._id}`,
          headers: {
            token: localStorage.getItem('token'),
          },
        })
          .then(({ data }) => {
            this.product = data;
            this.detail = true;
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
    },
  },
};
</script>
