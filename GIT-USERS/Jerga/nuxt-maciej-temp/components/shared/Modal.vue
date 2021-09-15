<template>
  <div>
    <div @click="toggleIsActive">
      <slot name="actionButton">
        <!--        domyślne wartości jak nic nie podamy dalej-->
        <!--       <button class="button is-primary">Open</button>-->
      </slot>
    </div>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button
            @click="toggleIsActive"
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
          <button @click="toggleIsActive" class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleIsActive() {
      this.isActive = !this.isActive;
    },
    emitModalSubmit() {
      this.$emit("modalSubmited", this.closeModal);
    },
    closeModal() {
      this.isActive = false;
    },
  },
};
</script>

<style scoped></style>
