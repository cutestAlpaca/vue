import userService from '@/service/userService'
import storageService from '../../service/storageService'

const userModule = {
  namespaced: true,
  state: {
    token: storageService.get(storageService.USER_TOKEN),
    userInfo: storageService.get(storageService.USER_INFO)
      ? JSON.parse(storageService.get(storageService.USER_INFO)) : null
  },
  mutations: {
    SET_TOKEN(state, token) {
      storageService.set(storageService.USER_TOKEN, token)
      state.token = token
    },
    SET_USERINFO(state, userInfo) {
      storageService.set(storageService.USER_INFO, JSON.stringify(userInfo))
      state.userInfo = userInfo
    }
  },
  actions: {
    register(context, { name, telephone, password }) {
      return new Promise((resolve, reject) => {
        userService.register({ name, telephone, password }).then((response) => {
          // this.$store.commit('userModule/SET_TOKEN', response.data.data.token)
          // storageService.set(storageService.USER_TOKEN, response.data.data.token)
          context.commit('SET_TOKEN', response.data.data.token)
          return userService.info()
        }).then((response) => {
          context.commit('SET_USERINFO', response.data.data.user)
          resolve(response)
          // this.$store.commit('userModule/SET_USERINFO', response.data.data.user)
          // storageService.set(storageService.USER_INFO, JSON.stringify(res.data.data.user))
        }).catch((err) => {
          reject(err)
        })
      })
    },
    login(context, { telephone, password }) {
      return new Promise((resolve, reject) => {
        userService.login({ telephone, password }).then((response) => {
          context.commit('SET_TOKEN', response.data.data.token)
          return userService.info()
        }).then((response) => {
          context.commit('SET_USERINFO', response.data.data.user)
          resolve(response)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    logout({ commit }) {
      // 清除token
      commit('SET_TOKEN', '')
      storageService.set(storageService.USER_TOKEN, '')
      // 清除用户信息
      commit('SET_USERINFO', '')
      storageService.set(storageService.USER_INFO, '')

      window.location.reload()
    }
  }
}

export default userModule
