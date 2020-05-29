<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './pages/home.vue'

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  height: 100vh;
  margin: 0;
}
li {
  display: block!important;
}
</style>
