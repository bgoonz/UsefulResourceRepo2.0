<template>
  <div class="py-5 text-center">
    <teleport to="#teleportContent">
      <div class="user-container">
        <suspense>
          <template #default>
            <user-panel />
          </template>
          <template #fallback> Loading...... </template>
        </suspense>
      </div>
    </teleport>
    <img height="150" src="../assets/logo.png" />
    <h2>Keep Resources</h2>
    <p class="lead">Keep your resource at once place</p>
    <router-link
      :to="{ name: 'resourceHomePage' }"
      class="btn btn-outline-primary mr-2"
      >Home</router-link
    >
    <router-link
      :to="{ name: 'resourceNewPage' }"
      class="btn btn-outline-primary"
      >New</router-link
    >
  </div>
</template>

<script>
import UserPanel from "@/components/UserPanel";
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
