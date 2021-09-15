<template>
  <div :class="`resource-app ${theme}`">
    <Header />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: { Header },
  data() {
    return {
      settings: this.getSettings(),
    };
  },
  provide() {
    return {
      theme: () => this.theme,
      setSettings: (settings) => (this.settings = settings),
    };
  },
  computed: {
    theme() {
      return this.settings.theme;
    },
  },
  methods: {
    getSettings() {
      const settings = localStorage.getItem("resorce-app");
      return settings ? JSON.parse(settings) : {};
    },
  },
};
</script>
<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

.resource-app.dark {
  background-color: #1d1d1d;
  color: white;
  min-height: 100vh;
}
</style>
