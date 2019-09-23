<template>
  <nav
    class="navbar header has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <nuxt-link to="/" class="navbar-item">
        PROJECT TEST
      </nuxt-link>
      <b-navbar-item tag="router-link" to="home">
        Home
      </b-navbar-item>
      <b-navbar-item v-if="isAuthenticated" tag="router-link" to="signin">
        {{ me.displayName }}
      </b-navbar-item>
      <b-navbar-item v-else tag="router-link" to="signin">
        Sign Out
      </b-navbar-item>

      <div class="navbar-burger">
        <span />
        <span />
        <span />
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
// import { mapActions, mapGetters } from 'vuex'
// import { mapActions, mapState, mapGetters } from 'vuex'
import { auth } from '~/plugins/firebase'

export default {
  // props: {},
  data() {
    return {
      me: this.$store.state.auth.me
    }
  },
  computed: {
    // ...mapState({
    //   me: 'auth/me'
    // }),
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  },
  methods: {
    // ...mapActions({
    //   setMe: 'auth/setMe'
    // }),
    // login() {
    //   auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
    //     this.setMe(user)
    //     this.me = auth.currentUser
    //   })
    // },
    logout() {
      auth
        .signOut()
        .then(() => {
          this.setMe(null)
        })
        .catch(error => {
          alert(error)
        })
    }
  }
}
</script>
