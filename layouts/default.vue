<template>
  <div>
    <nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <i class="fas fa-fire" />
          Firebase Authentication
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="toggleMenu"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div v-if="isSignIn" class="navbar-menu" :class="{'is-active':menu}">
        <div class="navbar-end">
          <a class="navbar-item" @click="signOut">
            <i class="fas fa-sign-out-alt" />
            Sign Out
          </a>
        </div>
      </div>
    </nav>
    <section class="section">
      <nuxt />
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  data () {
    return {
      menu: false
    }
  },
  computed: {
    ...mapGetters({ isSignIn: 'user/isSignIn' })
  },
  watch: {
    iSignIn () {
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapMutations({
      signIn: 'user/signIn',
      _signOut: 'user/signOut',
      setUser: 'user/setUser'
    }),
    signOut () {
      try {
        firebase.auth().signOut()
        this._signOut()
      } catch (e) {
        console.warn(e)
      }
    },
    init () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setUser(user)
          this.signIn()
          return
        }

        // User is signed out.
        const routeName = this.$route.name
        if (!['signIn', 'signInEmailLink'].includes(routeName)) {
          this.$router.push('/signIn')
        }
      })
    },
    toggleMenu () {
      if (this.menu) {
        this.menu = false
      } else {
        this.menu = true
      }
    }
  }
}
</script>

<style>
*:not(.fas,.fab) {
  font-family: "M PLUS Rounded 1c" !important;
}
html {
  background-color:rgba(0, 0, 0, 0.1);
}
html, body {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.fas, .fab {
  margin-right: 0.6rem;
}
.mt-2 {
  margin-top: 2rem;
}
.mt-3 {
  margin-top: 3rem;
}
.mt-4 {
  margin-top: 4rem;
}
</style>
