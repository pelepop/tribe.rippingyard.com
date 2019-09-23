<template>
  <section class="section">
    <div v-if="isAuthenticated" class="box">
      <p>ログイン中です！</p>
      <p>{{ me.displayName }}</p>
      <b-button type="is-primary" @click="logout">Logout</b-button>
    </div>
    <div v-else>
      <p>
        <label for="">E-Mail</label>
        <b-input v-model="email" type="email" maxlength="64"></b-input>
      </p>
      <p>
        <label for="">Password</label>
        <b-input v-model="password" type="password" password-reveal></b-input>
      </p>
      <p>
        <b-button type="is-primary" @click="login">Login</b-button>
      </p>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import { mapActions, mapState, mapGetters } from 'vuex'
import { auth } from '~/plugins/firebase'

export default {
  props: {},
  data() {
    return {
      email: '',
      password: ''
    }
  },
  layout: 'signin',
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    }),
    me() {
      return this.$store.state.auth.me
    }
  },
  methods: {
    ...mapActions({
      setMe: 'auth/setMe'
    }),
    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.setMe(auth.currentUser)
        })
        .catch(function(e) {
          console.log(e)
        })
    },
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
