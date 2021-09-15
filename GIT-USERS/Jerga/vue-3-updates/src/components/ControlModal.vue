<template>
  <button @click="isOpen = true" class="btn btn-sm btn-success mb-2">
    Open Modal
  </button>
  <modal @on-close="isOpen = false" @on-submit="saveControl" :isOpen="isOpen">
    <div>
      <ControlForm v-model:theme="theme" v-model:fontSize="fontSize" />
    </div>
  </modal>
</template>

<script>
// <ChildComponent
//   :prop1="prop1"
//   @update:prop1="prop1 = $event"
//   :prop2="prop2"
//   @update:prop2="prop2 = $event"
// />

import Modal from "@/components/shared/Modal";
import ControlForm from "@/components/shared/ControlForm";
export default {
  components: {
    Modal,
    ControlForm,
  },
  data() {
    return {
      isOpen: false,
      theme: "",
      fontSize: "",
    };
  },
  inject: ["setSettings"],
  methods: {
    saveControl() {
      const settings = { theme: this.theme, fontSize: this.fontSize };
      localStorage.setItem("resorce-app", JSON.stringify(settings));
      this.setSettings(settings);
      this.isOpen = false;
    },
  },
};
</script>
