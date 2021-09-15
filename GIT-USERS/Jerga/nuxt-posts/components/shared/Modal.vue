<template>
  <div>
    <div @click="isActive = true">
      <slot name="actionButton">
        <button class="button is-primary">Open</button>
      </slot>
    </div>
    <!-- Toggle Class Here -->
    <div :class="{ 'is-active': isActive }" class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <!-- Close Modal Here -->
          <button
            @click="isActive = false"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <slot></slot>
        </section>
        <footer class="modal-card-foot">
          <button @click="emitModalSubmit" class="button is-success">
            Save changes
          </button>
          <!-- Close Modal -->
          <button @click="isActive = false" class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    emitModalSubmit() {
      this.$emit("modalSubmitted", {
        closeModal: this.closeModal,
        data: "Just some data",
      });
    },
    closeModal() {
      this.isActive = false;
    },
  },
};
</script>
