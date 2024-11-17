<template>
    <div>
      <h1>Produkter</h1>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - {{ product.price }} DKK
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        products: []
      };
    },
    mounted() {
      this.fetchProducts();
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await axios.get('http://localhost:3000/api/products');
          this.products = response.data;
        } catch (error) {
          console.error('Der opstod en fejl:', error);
        }
      }
    }
  };
  </script>
  