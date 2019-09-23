export const strict = false

export const state = () => ({
  me: null
})

export const mutations = {
  setMe(state, user) {
    state.me = user
  }
}

export const actions = {
  setMe({ commit }, user) {
    commit('setMe', user)
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.me
  }
}
