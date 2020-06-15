<template>
  <div v-if="isSignIn" class="card" style="width:350px">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img class="is-rounded" :src="photoUrl" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">
            {{ displayName }}
          </p>
          <p class="subtitle is-6">
            {{ user.email }}
          </p>
        </div>
      </div>

      <div class="content">
        uid: {{ user.uid }}
      </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item">
        <i class="fas fa-id-card" />
        Profile
      </a>
      <a class="card-footer-item">
        <i class="fas fa-project-diagram" />
        Projects
      </a>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      isSignIn: 'user/isSignIn',
      user: 'user/user'
    }),
    displayName () {
      return this.user.displayName ?? '名無しさん'
    },
    photoUrl () {
      return this.user.photoURL ?? 'https://bulma.io/images/placeholders/48x48.png'
    }
  },
  methods: {
    ...mapMutations({ _signOut: 'user/signOut' })
  }
}
</script>
