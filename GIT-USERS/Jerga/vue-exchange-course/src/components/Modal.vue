<template>
  <div class="app-modal">
    <div v-if="$slots.openingElement" @click="open">
      <slot name="openingElement" />
    </div>
    <button v-else @click="open" class="button is-primary is-outlined m-t-sm">
      Update Info
    </button>
    <div :class="['modal', { 'is-active': isOpen }]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ header }}</p>
          <button @click="close" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <slot />
        </section>
        <footer v-if="!hideFooter" class="modal-card-foot">
          <div v-if="$slots.footerElement">
            <slot name="footerElement" />
          </div>
          <div v-else>
            <button
              @click="submitModal"
              :disabled="!isSubmitButtonEnabled"
              class="button is-success"
            >
              {{ submitText }}
            </button>
            <button @click="close" class="button">Cancel</button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onModalSubmit: {
      required: false,
      type: Function,
    },
    header: {
      type: String,
      default: "Confirmation Window",
    },
    submitText: {
      type: String,
      default: "Save changes",
    },
    isSubmitButtonEnabled: {
      type: Boolean,
      default: true,
    },
    hideFooter: {
      type: Boolean,
      default: false,
    },
    onModalOpen: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    submitModal() {
      this.onModalSubmit(() => (this.isOpen = false));
    },
    close() {
      this.isOpen = false;
    },
    open() {
      this.onModalOpen && this.onModalOpen();
      this.isOpen = true;
    },
  },
};
</script>

<style scoped>
.app-modal {
  width: 100%;
}
</style>
