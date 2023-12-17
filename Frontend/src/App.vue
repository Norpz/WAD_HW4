<template>

  <Header/>
  <router-view/>
  <Footer/>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: #d7c09b;
}
</style>

<script setup>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
</script>