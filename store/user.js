export const state = () => ({
  signIn: false,
  user: null
})

export const mutations = {
  signIn (state) {
    state.signIn = true
  },
  signOut (state) {
    state.signIn = false
    state.user = null
  },
  setUser (state, user) {
    state.user = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    }
  }
}

export const getters = {
  isSignIn: state => state.signIn === true,
  user: state => state.user
}
