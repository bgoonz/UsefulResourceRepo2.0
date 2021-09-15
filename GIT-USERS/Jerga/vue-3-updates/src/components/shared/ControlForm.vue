<template>
  <form>
    <div class="mb-3">
      <label htmlFor="fontSize">Font size</label>
      <input
        :value="fontSize"
        @input="handleChange('fontSize', $event.target.value)"
        type="text"
        class="form-control"
        id="fontSize"
        placeholder="15"
      />
    </div>
    <div class="mb-3">
      <label htmlFor="theme">Theme</label>
      <select
        :value="theme"
        @change="handleChange('theme', $event.target.value)"
        class="form-control"
        name="type"
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
    theme: String,
    fontSize: String,
  },
  emits: ["update:theme", "update:fontSize"],
  methods: {
    handleChange(prop, value) {
      this.$emit(`update:${prop}`, value);
    },
    // handleTheme(theme) {
    //   this.$emit('update:theme, theme')
    // },
    // handleFontSize(fontSize) {
    //   this.$emit('update:fontSize', fontSize)
    // }
  },
};
</script>
