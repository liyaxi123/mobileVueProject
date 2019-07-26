import * as types from './mutationType.js'
import state from './state.js'
import { playMode } from '@/common/js/config.js'

// import { playMode } from './common/js/config.js'
export const selectPlay = function ({ commit }, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
