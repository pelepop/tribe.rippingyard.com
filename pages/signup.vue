<template>
  <section class="section">
    <ValidationObserver v-slot="{ invalid }">
      <div class="box">
        <validation-provider
          v-slot="{ errors }"
          rules="required|max:64"
          name="アカウント名"
        >
          <b-field
            label="アカウント名"
            label-position="on-border"
          >
            <p>
              <b-input v-model="userName" maxlength="128" size="is-medium"></b-input>
            </p>
          </b-field>

          <ul v-if="errors.length">
            <li v-for="(error, i) in errors" :key="`errors${i}`">
              {{ error }}
            </li>
          </ul>
        </validation-provider>

        <hr>

        <validation-provider
          v-slot="{ errors }"
          rules="required|max:64"
          name="表示名"
        >
          <b-field
            label="表示名"
            label-position="on-border"
          >
            <b-input v-model="displayName" maxlength="128" size="is-medium"></b-input>
          </b-field>

          <ul v-if="errors.length">
            <li v-for="(error, i) in errors" :key="`errors${i}`">
              {{ error }}
            </li>
          </ul>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          rules="required|max:256|email"
          name="E-Mail"
        >
          <b-field
            label="E-Mail"
            label-position="on-border"
          >
            <p>
              <b-input v-model="email" type="email" maxlength="256" size="is-medium"></b-input>
            </p>
          </b-field>

          <ul v-if="errors.length">
            <li v-for="(error, i) in errors" :key="`errors${i}`">
              {{ error }}
            </li>
          </ul>
        </validation-provider>


        <validation-provider
          v-slot="{ errors }"
          rules="required|max:256"
          name="パスワード"
        >
          <b-field
            label="パスワード"
            label-position="on-border"
          >
            <p>
              <b-input v-model="password" maxlength="128" size="is-medium" type="password" password-reveal></b-input>
            </p>
          </b-field>

          <ul v-if="errors.length">
            <li v-for="(error, i) in errors" :key="`errors${i}`">
              {{ error }}
            </li>
          </ul>
        </validation-provider>

        <p>
          <b-button type="is-primary" :disabled="invalid" @click="submit">Submit</b-button>
        </p>
      </div>
    </ValidationObserver>
  </section>
</template>

<script>
import { auth } from '~/plugins/firebase'
import User from '~/models/User'

export default {
  props: {},
  data() {
    return {
      displayName: '',
      userName: '',
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
            displayName: this.displayName
          })

          const user = new User()

          user.create({
            uid: result.user.uid,
            displayName: this.displayName,
            userName: this.userName,
            email: this.email
          })

          this.$buefy.notification.open({
            duration: 5000,
            message: 'ユーザーの登録が完了しました',
            position: 'is-bottom-right',
            type: 'is-success'
          })

        })
    }
  }
}
</script>
