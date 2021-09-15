<template>
  <button @click="isOpen = true" class="btn btn-success">Settings</button>
  <modal
    :isOpen="isOpen"
    @on-close="isOpen = false"
    @on-submit="submitSettings"
  >
    <div>
      <SettingsForm v-model:fontSize="fontSize" v-model:theme="theme" />
    </div>
  </modal>
</template>

<script>
// <SettingsForm
//   :fontSize="fontSize"
//   :theme="theme"
//   @update:fontSize="fontSize = $event"
//   @update:theme="theme = $event" />

import Modal from "@/components/shared/Modal";
import SettingsForm from "@/components/SettingsForm";
export default {
  components: { Modal, SettingsForm },
  data() {
    return {
      isOpen: false,
      fontSize: "",
      theme: "",
    };
  },
  inject: ["setSettings"],
  methods: {
    submitSettings() {
      const settings = {
        fontSize: this.fontSize,
        theme: this.theme,
      };
      localStorage.setItem("resource-settings", JSON.stringify(settings));
      this.setSettings(settings);
      this.isOpen = false;
    },
  },
};
</script>
