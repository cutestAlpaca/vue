<template>
  <div id="app">
      <!--    <b-container>-->
      <navbar></navbar>
      <!--    <div id="nav">-->
          <!-- <router-link to="/">Home</router-link> |-->
          <!-- <router-link to="/about">About</router-link>-->
      <!--    </div>-->
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import Navbar from "./views/Layout/Navbar.vue"

export default {
  components: { Navbar },
  data() {
    return {}
  },
}
</script>
<style lang="scss">

</style>
