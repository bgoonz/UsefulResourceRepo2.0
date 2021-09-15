<template>
  <nb-container>
    <nb-header>
      <nb-left>
        <nb-button :on-press="toggleDrawer" transparent>
          <nb-icon name="menu" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>{{ headerTitle }}</nb-title>
      </nb-body>
      <nb-right> </nb-right>
    </nb-header>
    <slot />
  </nb-container>
</template>

<script>
import { DrawerActions } from "react-navigation-drawer";
export default {
  props: {
    navigation: {
      type: Object,
    },
    headerTitle: {
      type: String,
      default: "Header",
    },
  },
  methods: {
    toggleDrawer() {
      this.navigation.dispatch(DrawerActions.toggleDrawer());
    },
  },
};
</script>
