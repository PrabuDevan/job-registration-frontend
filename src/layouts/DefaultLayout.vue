<template>
  <v-app>
    <v-app-bar flat app color="#114b85" dark>
      <div class="align-center">
        <v-img alt="Ice Apple logo" contain
          src="https://iceapple.tech/assets/img/favicon.png" height="64" />
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="$router.push('/login')" v-if="!isLoggedIn" text class="text-none">Login</v-btn>
      <v-btn @click="$router.push('/')" v-if="!isLoggedIn" text class="text-none">Register</v-btn>
      <v-btn @click="$store.dispatch('LOGOUT')" v-if="isLoggedIn" text class="text-none">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'DefaultLayout',
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  }
};
</script>
