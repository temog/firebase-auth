<template>
  <div class="container">
    <h1 class="title is-3">
      Sign In
    </h1>

    <button class="button is-link" @click="signInGoogle()">
      <i class="fab fa-google" />
      Google アカウントで Sign In
    </button>

    <br>
    <br>

    <button class="button is-link" @click="signInGitHub()">
      <i class="fab fa-github" />
      GitHub アカウントで Sign In
    </button>

    <h1 class="title is-3 mt-4">
      Email Link Authentication
    </h1>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input v-model="email" type="text" class="input">
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="sendEmailLink()">
          <i class="fas fa-envelope" />
          Send Email
        </button>
      </div>
    </div>

    <div v-if="info" class="notification is-info mt-4">
      {{ info }}
    </div>

    <div v-if="error" class="notification is-danger mt-4">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  data () {
    return {
      email: null,
      info: null,
      error: null
    }
  },
  computed: {
    ...mapGetters({ isSignIn: 'user/isSignIn' })
  },
  methods: {
    ...mapMutations({
      signIn: 'user/signIn',
      setUser: 'user/setUser'
    }),
    signInComplete (result) {
      this.setUser(result.user)
      this.signIn()
      this.$router.push('/')
    },
    async signInGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      try {
        const result = await firebase.auth().signInWithPopup(provider)
        this.signInComplete(result)
      } catch (e) {
        this.error = e.message
      }
    },
    async signInGitHub () {
      const provider = new firebase.auth.GithubAuthProvider()
      try {
        const result = await firebase.auth().signInWithPopup(provider)
        this.signInComplete(result)
      } catch (e) {
        this.error = e.message
      }
    },
    async sendEmailLink () {
      // 本当は適切なvalidation
      if (!this.email) {
        this.error = 'Email is required'
        return
      }

      const actionCodeSettings = {
        url: 'http://localhost:3000/signInEmailLink',
        handleCodeInApp: true
      }

      try {
        await firebase.auth().sendSignInLinkToEmail(this.email, actionCodeSettings)
        localStorage.setItem('signInEmailLink', this.email)
        this.info = 'メールを送信しました。本文中のリンクを開いてください'
      } catch (e) {
        console.warn(e)
      }
    }
  }
}
</script>
