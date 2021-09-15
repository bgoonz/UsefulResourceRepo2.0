<template>
  <app-modal header="Update Profile" :onModalSubmit="submitModal">
    <form>
      <div class="field">
        <label class="title">Full Name</label>
        <input v-model="profileToUpdate.fullName" class="input" />
      </div>
      <div class="field">
        <label class="title">Address</label>
        <input v-model="profileToUpdate.address" class="input" />
      </div>
      <div class="field">
        <label class="title">Country</label>
        <input v-model="profileToUpdate.country" class="input" />
      </div>
      <div class="field">
        <label class="title">Phone</label>
        <input v-model="profileToUpdate.phone" class="input" />
      </div>
      <div class="field">
        <label class="title">Avatar</label>
        <input v-model="profileToUpdate.avatar" class="input" />
      </div>
      <div class="field">
        <label class="title">Info about user</label>
        <input v-model="profileToUpdate.info" class="input" />
      </div>
    </form>
  </app-modal>
</template>

<script>
import AppModal from "@/components/Modal";
export default {
  components: { AppModal },
  props: {
    userProfile: {
      required: true,
      type: Object,
    },
    onModalSubmit: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      profileToUpdate: { ...this.userProfile },
    };
  },
  methods: {
    submitModal(closeCallback) {
      this.onModalSubmit({ ...this.profileToUpdate }, closeCallback);
    },
  },
};
</script>

<style></style>
