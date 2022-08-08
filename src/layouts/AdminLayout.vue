<template>
  <v-app>
    <v-app-bar flat app clipped-left color="#114b85" dark>
      <div class="align-center">
        <v-img alt="Ice Apple logo" contain
          src="https://iceapple.tech/assets/img/favicon.png" height="64" />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      permanent
      app
      clipped
    >
      <v-list-item :to="{ name: 'ViewApplicants' }" class="px-2 text-center">
        <v-list-item-title>View Applicants</v-list-item-title>
      </v-list-item>
      <v-list-item :to="{ name: 'AddApplicant' }" class="px-2 text-center">
        <v-list-item-title>Add Applicant</v-list-item-title>
      </v-list-item>
      <v-list-item @click="$store.dispatch('LOGOUT')" class="px-2 text-center">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'AdminLayout',
  data() {
    return {
        drawer: false
    }
  }
};
</script>
