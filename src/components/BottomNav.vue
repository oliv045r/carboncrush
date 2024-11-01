<template>
  <v-bottom-navigation
    v-model="active"
    color="primary"
    app
  >
    <v-btn
      v-for="item in items"
      :key="item.title"
      :to="item.to"
      :exact="item.exact"
      @click="navigate(item.to)"
      icon
    >
      <v-icon>{{ item.icon }}</v-icon>
      <span>{{ item.title }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { VBottomNavigation, VBtn, VIcon } from 'vuetify/lib/components';

export default {
  name: 'BottomNav',
  components: {
    VBottomNavigation,
    VBtn,
    VIcon,
  },
  data() {
    return {
      active: null,
      items: [
        { title: 'Home', to: '/', exact: true, icon: 'mdi-home' },
        { title: 'Background Select', to: '/background-select', icon: 'mdi-palette' },
        // Add more navigation items as needed
      ],
    };
  },
  methods: {
    navigate(to) {
      this.$router.push(to);
    },
  },
};
</script>

<style scoped>
.v-bottom-navigation {
  position: fixed;
  bottom: 0;
  width: 30%;
}
</style>