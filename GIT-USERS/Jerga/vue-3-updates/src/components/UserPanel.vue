<template>
  Welcome, {{ user.name }}
  <button @click="changeName()" class="btn btn-sm btn-primary">
    Change name
  </button>
</template>
<script>
import { fetchUser } from "@/actions";
import { ref } from "vue";
export default {
  async setup() {
    const user = await fetchUser();
    const reactiveUser = ref(user);
    const changeName = () => (reactiveUser.value.name = "John");
    return { user: reactiveUser, changeName };
  },
};
</script>
