<template>

  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-container>
        <b-navbar-brand href="#" @click="$router.push({ name: 'Home' })">alpaca</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form> -->

            <b-nav-item-dropdown
              v-if="userInfo"
              right
            >
              <template v-slot:button-content>
                <em>{{ userInfo.name }}</em>
              </template>
              <b-dropdown-item @click="router.push({ name: 'profile' })">个人主页</b-dropdown-item>
              <b-dropdown-item @click="logout">登出</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-navbar-nav v-if="!userInfo">
              <b-nav-item
                v-if="$route.name !== 'login'"
                @click="$router.replace('login')"
              >登陆
              </b-nav-item>
              <b-nav-item
                v-if="$route.name !== 'register'"
                @click="$router.replace('register')"
              >注册
              </b-nav-item>
            </b-navbar-nav>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo
  }),
  methods: mapActions('userModule', ['logout'])
}
</script>

<style scoped lang='scss'>
</style>
