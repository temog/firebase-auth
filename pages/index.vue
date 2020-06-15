<template>
  <div class="container">
    <h1 class="title is-3">
      ログイン済み ユーザ
    </h1>
    <user-component />
  </div>
</template>

<script>
import UserComponent from '~/components/User'

export default {
  components: {
    UserComponent
  }
}
</script>
