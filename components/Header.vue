<template>
  <div>
    <b-navbar :fixed-top=true>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">ry</b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item tag="router-link" to="home">
          Home
        </b-navbar-item>
        <b-navbar-item v-if="isAuthenticated" tag="router-link" to="signin">
          {{ me.displayName }}
        </b-navbar-item>
        <b-navbar-item v-else tag="router-link" to="signin">
          Sign Out
        </b-navbar-item>
        <b-navbar-dropdown label="Info">
          <b-navbar-item href="#">
            About
          </b-navbar-item>
          <b-navbar-item href="#">
            Contact
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a v-if="isAuthenticated" class="button is-primary" @click="$emit('showModal')">
              Post
            </a>
            <b-navbar-item v-else tag="router-link" to="signin" class="button is-primary">
              Sign In
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="signup" class="button">
              Sign Up
            </b-navbar-item>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { mapActions, mapGetters } from 'vuex'
// import { mapActions, mapState, mapGetters } from 'vuex'
import { auth } from '~/plugins/firebase'

export default {
  // props: {},
  data() {
    return {}
  },
  computed: {
    // ...mapState({
    //   me: 'auth/me'
    // }),
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    }),
    me() {
      return this.$store.state.auth.me
    }
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
