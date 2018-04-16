import * as type from './mutationTypes'
const Mutations = {
  [type.SET_HEADIMG] (state, loginState) {
    state.headUrl = loginState
  }
}
export default Mutations
