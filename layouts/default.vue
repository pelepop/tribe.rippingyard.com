<template>
  <div>
    <Header @showModal="showModal"></Header>
    <section class="main-content columns">
      <div class="container column is-7">
        <nuxt />
      </div>
      <div class="container column is-5">
        <button class="button is-primary is-medium" @click="showModal()">
          Launch Modal
        </button>
      </div>
    </section>
    <b-modal :active.sync="isModalActive" :width="640" scroll="keep">
      <post title="Form" @hideModal="hideModal"></post>
    </b-modal>
  </div>
</template>

<script>
import Header from '~/components/Header'
import Post from '~/components/Post'

export default {
  components: {
    Header,
    Post
  },
  data() {
    return {
      isModalActive: false,
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Sign in',
          icon: 'lightbulb',
          to: { name: 'signin' }
        }
      ]
    }
  },
  methods: {
    showModal() {
      this.isModalActive = true
    },
    hideModal() {
      this.isModalActive = false
    }
  }
}
</script>
