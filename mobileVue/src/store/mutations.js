import * as types from './mutationType'

const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_TRANSITIONFLAGS] (state, data) {
    state.transition = data
  },
  [types.SET_PLAYING_STATE] (state, data) {
    state.playing = data
  },
  [types.SET_FULL_SCREEN] (state, data) {
    state.fullScreen = data
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  }
}

export default mutations
