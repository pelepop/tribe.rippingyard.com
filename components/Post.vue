<template>
  <div v-if="isAuthenticated">
    <ValidationObserver v-slot="{ invalid }">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <b-field label="Topic" label-position="on-border">
              <b-input v-model="label" maxlength="128"></b-input>
            </b-field>
            <validation-provider
                v-slot="{ errors }"
                rules="required|max:240"
                name="本文"
              >
              <b-field
                label="Comment"
                label-position="on-border"
              >
                <p>
                  <b-input
                  v-model="content"
                  maxlength="240"
                  type="textarea"
                ></b-input>
                </p>
              </b-field>

              <ul v-if="errors.length">
                <li v-for="(error, i) in errors" :key="`errors${i}`">
                  {{ error }}
                </li>
              </ul>
            </validation-provider>
            <b-field>
              <div v-if="previewImage">
                <div>
                  <span @click="removeImage">x</span>
                  <img :src="previewImage" />
                </div>
              </div>
              <b-upload v-model="image" drag-drop @input="upload">
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon icon="upload" size="is-large"></b-icon>
                    </p>
                    <p>Drop your files here or click to upload</p>
                  </div>
                </section>
              </b-upload>
            </b-field>
          </div>
        </div>
        <footer class="card-footer">
          <div class="card-footer-item">
            <b-button type="is-primary" :disabled="invalid" @click="post">Send</b-button>
          </div>
        </footer>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
// import Entity from '~/models/Entity'
import { mapGetters } from 'vuex'
import uploader from '~/plugins/uploader'
import Seed from '~/models/Seed'

export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      content: '',
      label: '',
      image: {},
      previewImage: ''
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  },
  methods: {
    post() {

      // const entity = new Entity()
      // entity.create({
      //   id: this.label,
      //   name: this.label
      // })
      // console.log(entity)
      const seed = new Seed()

      seed.create({
        content: this.content
      })

      uploader(this.image)
      this.reset()

    },
    upload() {
      const reader = new FileReader()
      reader.readAsDataURL(this.image)
      reader.addEventListener(
        'load',
        () => {
          this.previewImage = reader.result
        },
        false
      )
    },
    removeImage() {
      this.image = {}
      this.previewImage = null
    },
    reset() {
      this.content = ''
      this.removeImage()
      this.$emit('hideModal')
    }
  }
}
</script>
