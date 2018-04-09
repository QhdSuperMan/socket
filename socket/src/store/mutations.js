import * as type from './mutationTypes'
const Mutations = {
  [type.SET_LOGIN] (state, loginState) {
    state.isLogin = loginState
  }
}
export default Mutations
