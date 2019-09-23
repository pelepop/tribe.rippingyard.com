import { auth } from '~/plugins/firebase'

export default function({ store, route, redirect }) {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      console.log('authStateChanged!')
      if (user) {
        store.dispatch('auth/setMe', user)
        resolve(user)
      } else {
        redirect('/signin')
      }
    })
  })
}
