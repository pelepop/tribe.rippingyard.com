<template>
  <div>
    <nav
      class="navbar header has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          PROJECT TEST
        </nuxt-link>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <div class="container column is-8">
        <nuxt />
      </div>
      <div class="container column is-4">
        <post title="Form"></post>
      </div>
    </section>
  </div>
</template>

<script>
import Post from '~/components/Post'

export default {
  components: {
    Post
  },
  data() {
    return {
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
  }
}
</script>
