<template>
  <section class="section">
    <div class="content">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">
                {{ this.$store.state.auth.me.displayName }}
              </p>
              <p class="subtitle is-6">@johnsmith</p>
              <ul>
                <li>Post Entities</li>
                <li>Entity Details</li>
                <li>Edit Profile</li>
                <li>Follow Users</li>
                <li>Invite Code</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-for="seed in seeds" :key="seed.id" class="content">
      <p>
        <strong>{{ seed.content }}</strong>
      </p>
      <p class="is-size-7">
        Posted at {{ seed.createdate.format('YYYY-MM-DD HH:mm:ss') }}
      </p>
    </div>
  </section>
</template>

<script>
import Seed from '~/models/Seed'

let seeds = new Seed()
seeds = seeds.limit(8).orderBy('createdAt', 'desc')

export default {
  name: 'HomePage',
  middleware: 'auth',
  data() {
    return {
      me: this.$store.state.auth.me
    }
  },
  asyncData(context) {
    return {
      seeds: seeds.observedItems
    }
  }
}
</script>
