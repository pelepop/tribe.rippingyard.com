import User from '~/models/User'

export const strict = false

export const state = () => ({
  me: null
})

export const mutations = {
  setMe(state, u) {
    const handle = new User()
    const user = handle
      .where('uid', '==', u.uid)
      .get()
      .then(( user ) => {
        state.me = user
      })
      .catch(( e ) => {
        console.log( u.uid, e )
      })
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
