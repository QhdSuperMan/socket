import * as type from './mutationTypes'
const Mutations = {
  [type.SET_HEADIMG] (state, loginState) {
    state.headUrl = loginState
  },
  [type.SET_USENAME] (state, usename) {
    state.usename = usename
  }
}
export default Mutations
