<template>
  <section class="section">
    <div v-if="isAuthenticated" class="box">
      <p>ログイン中です！</p>
      <p>{{ me.displayName }}</p>
      <b-button type="is-primary" @click="logout">Logout</b-button>
    </div>
    <div v-else>
      <ValidationObserver v-slot="{ invalid }">
        <validation-provider
            v-slot="{ errors }"
            rules="required|email"
            name="E-Mail"
          >
          <p>
            <label for="">E-Mail</label>
            <b-input v-model="email" type="email" maxlength="64"></b-input>
          </p>
          <ul v-if="errors.length">
            <li v-for="(error, i) in errors" :key="`errors${i}`">
              {{ error }}
            </li>
          </ul>
        </validation-provider>
        <validation-provider
            v-slot="{ errors }"
            rules="required|max:64"
            name="パスワード"
          >
          <p>
            <label for="">パスワード</label>
            <b-input v-model="password" type="password" password-reveal></b-input>
          </p>
          <ul v-if="errors.length">
            <li v-for="(error, i) in errors" :key="`errors${i}`">
              {{ error }}
            </li>
          </ul>
        </validation-provider>
        <p>
          <b-button type="is-primary" :disabled="invalid" @click="login">Login</b-button>
        </p>
      </ValidationObserver>
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
  // layout: 'signin',
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
          // if( !this.me ) {
          //   this.$buefy.notification.open({
          //     duration: 5000,
          //     message: 'ユーザーが登録されていません',
          //     position: 'is-bottom-right',
          //     type: 'is-danger',
          //     hasIcon: false
          //   })
          // }
        })
        .catch(function(e) {

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
