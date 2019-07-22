import * as types from './mutationType'

const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_TRANSITIONFLAGS] (state, data) {
    state.transition = data
  }
}

export default mutations
