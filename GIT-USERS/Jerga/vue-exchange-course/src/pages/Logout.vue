<template>
  <div class="centered-container">
    <h1 v-if="!isLoggedOut">Your are getting logged out!</h1>
    <div v-else>
      <h1>You have been succesfuly logged out!</h1>
      <router-link to="/" class="button is-primary is-large">
        Navigate back to home page
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedOut: false,
    };
  },
  created() {
    if (!this.$store.getters["auth/isAuthenticated"]) {
      return this.$router.push("/");
    }

    this.$store
      .dispatch("auth/signOut")
      .then((_) => (this.isLoggedOut = true))
      .catch((e) => {
        console.error(e);
        this.isLoggedOut = false;
      });
  },
};
</script>

<style scoped>
.centered-container {
  height: 100%;
  width: 100%;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
