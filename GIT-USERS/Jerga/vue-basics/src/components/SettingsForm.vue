<template>
  <form>
    <div class="mb-3">
      <label htmlFor="fontSize">Font Size:</label>
      <input
        :value="fontSize"
        @input="handleChange"
        type="text"
        name="fontSize"
        class="form-control"
        id="fontSize"
        placeholder="17"
      />
    </div>
    <div class="mb-3">
      <label htmlFor="theme">Theme:</label>
      <select
        :value="theme"
        @change="handleChange"
        class="form-control"
        name="theme"
        id="theme"
      >
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
    },
    fontSize: {
      type: String,
    },
  },
  emits: ["update:theme", "update:fontSize"],
  methods: {
    handleChange(event) {
      const { value, name } = event.target;
      this.$emit(`update:${name}`, value);
    },
  },
};
</script>
