<template>Welcome user, {{ user.name }}</template>

<script>
import { fetchUser } from "@/actions";
export default {
  async setup() {
    const user = await fetchUser();
    return { user };
  },
};
</script>
