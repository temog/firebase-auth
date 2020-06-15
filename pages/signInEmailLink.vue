<template>
  <div class="container">
    <template v-if="showInput">
      <h1 class="title is-3 mt-4">
        メールを受信したEmailを入力してください
      </h1>

      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input v-model="email" type="text" class="input">
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" @click="signInWithEmailLink()">
            認証
          </button>
        </div>
      </div>
    </template>

    <div v-if="info" class="notification is-info mt-4">
      {{ info }}
    </div>

    <div v-if="error" class="notification is-danger mt-4">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  data () {
    return {
      showInput: false,
      email: null,
      info: null,
      error: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.signInEmailLink()
    })
  },
  methods: {
    ...mapMutations({
      signIn: 'user/signIn',
      setUser: 'user/setUser'
    }),
    signInEmailLink () {
      const isSignInWithEmailLink = firebase.auth().isSignInWithEmailLink(window.location.href)
      if (!isSignInWithEmailLink) {
        this.error = 'URLが不正です。メールを送信し直してください'
        return
      }

      const email = localStorage.getItem('signInEmailLink')
      if (!email) {
        this.info = 'メールを受信したEmailを入力してください'
        this.showInput = true
        return
      }

      this.email = email
      this.signInWithEmailLink()
    },
    async signInWithEmailLink () {
      if (!this.email) {
        this.error = 'メールを入力してください'
        return
      }
      try {
        const result = await firebase.auth().signInWithEmailLink(this.email, window.location.href)
        this.info = '認証に成功しました。5秒後にトップページへ移動します'
        this.error = null
        this.signInComplete(result)
      } catch (e) {
        console.warn(e)
        this.error = e.message
      }
    },
    signInComplete (result) {
      this.setUser(result.user)
      this.signIn()
      setTimeout(() => {
        this.$router.push('/')
      }, 5000)
    }
  }
}
</script>
