<template>
  <div class="login">
    <b-row class="mt-5">
      <b-col md="8" offset-md="2" lg="6" offset-lg="3">
        <b-card title="登陆">
          <b-form>
            <b-form-group
              label="手机"
            >
              <b-form-input
                v-model="$v.user.telephone.$model"
                type="number"
                placeholder="输入您的电话（必填）"
                :state="validateState('telephone')"
              ></b-form-input>
              <b-form-invalid-feedback
                :state="validateState('telephone')"
              >
                手机号不符合要求
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="密码">
              <b-form-input
                v-model="$v.user.password.$model"
                type="password"
                placeholder="输入您的密码（必填）"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback
                :state="validateState('password')"
              >
                密码必须大于等于 6 位
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
              <b-button @click="login" variant="outline-primary" block>登陆</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'
import customValidator from '@/helper/validator'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      user: {
        telephone: '',
        password: ''
      },
      validations: null
    }
  },
  validations: {
    user: {
      telephone: {
        required,
        telephone: customValidator.telephoneValidator
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    ...mapActions('userModule', { userLogin: 'login' }), // 别名
    validateState(name) {
      // 解构赋值
      const { $dirty, $error } = this.$v.user[name]
      return $dirty ? !$error : null
    },
    login() {
      this.$v.user.$touch()
      if (this.$v.user.$anyError) {
        return
      }
      this.userLogin(this.user).then(() => {
        this.$router.replace({ name: 'Home' })
      }).catch((error) => {
        console.log(error)
        this.$bvToast.toast(error.response.data.msg, {
          title: '数据验证错误!',
          variant: 'danger',
          solid: true
        })
      })
      console.log('login')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
