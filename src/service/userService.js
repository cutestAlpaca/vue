import request from '@/utils/request'

const register = ({ name, telephone, password }) => request.post('auth/register', { name, telephone, password })

const login = ({ telephone, password }) => request.post('auth/login', { telephone, password })

const info = () => request.get('auth/info')

export default {
  register,
  login,
  info
}
