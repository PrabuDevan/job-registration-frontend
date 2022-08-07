<template>
  <component :is="layout"> 
    <router-view />
  </component>
</template>

<script>
export default {
  name: "App",
  components: {
    DefaultLayout: () => import('./layouts/DefaultLayout.vue'),
    AdminLayout: () => import('./layouts/AdminLayout.vue')
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'DefaultLayout'
    }
  }
};
</script>
