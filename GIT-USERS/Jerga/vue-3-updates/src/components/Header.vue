<template>
  <div class="user-container">
    <Suspense>
      <template #default>
        <UserPanel />
      </template>
      <template #fallback> Loading user ... </template>
    </Suspense>
  </div>
  <div class="py-5 text-center">
    <img height="150" src="../assets/logo.png" />
    <h2>Keep Resources</h2>
    <p class="lead">Keep your resource at once place</p>
    <router-link :to="'/resources'" class="btn btn-outline-primary">
      Home
    </router-link>
    <router-link :to="'/resources/new'" class="btn ml-2 btn-outline-primary">
      New
    </router-link>
  </div>
</template>
<script>
import UserPanel from "./UserPanel";
export default {
  components: { UserPanel },
};
</script>
<style scoped>
.user-container {
  padding: 20px;
  font-weight: bold;
  font-size: 20px;
  background-color: #ffd16c;
}
</style>
