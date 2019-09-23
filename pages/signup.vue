<template>
  <section class="section">
    <div class="box">
      <p>
        <label for="">Name</label>
        <b-input v-model="name"></b-input>
      </p>
      <p>
        <label for="">E-Mail</label>
        <b-input v-model="email" type="email" maxlength="64"></b-input>
      </p>
      <p>
        <label for="">Password</label>
        <b-input v-model="password" type="password" password-reveal></b-input>
      </p>
      <p>
        <b-button type="is-primary" @click="submit">Submit</b-button>
      </p>
    </div>
  </section>
</template>

<script>
import { auth } from '~/plugins/firebase'

export default {
  props: {},
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submit() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          console.log(error.code, error.message)
        })
        .then(result => {
          console.log(result.user)
          result.user.updateProfile({
            displayName: this.name
          })
        })
    }
  }
}
</script>
