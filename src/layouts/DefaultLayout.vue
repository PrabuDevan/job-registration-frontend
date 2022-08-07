<template>
  <v-app>
    <v-app-bar flat app color="#114b85" dark>
      <div class="align-center">
        <v-img alt="Ice Apple logo" contain
          src="https://iceapple.tech/assets/img/favicon.png" height="64" />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'DefaultLayout'
};
</script>
