<template>
  <section class="section">
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
  asyncData(context) {
    return {
      seeds: seeds.observedItems
    }
  }
}
</script>
