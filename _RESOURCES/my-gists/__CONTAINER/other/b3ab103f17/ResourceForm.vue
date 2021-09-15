<template>
  <form>
    <div class="mb-3">
      <label htmlFor="title">Title</label>
      <input
        :value="title"
        @input="changeTitle($event.target.value)"
        type="text"
      />
    </div>
    <div class="mb-3">
      <select :value="type" @change="changeType($event.target.value)">
        <option v-for="type in types" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>
    <button
      @click="submitForm"
      class="btn btn-primary btn-lg btn-block"
      type="button"
    >
      Submit
    </button>
  </form>
</template>
export default { props: { title: String, description: String, link: String,
type: String, }, data() { return { types: ['blog', 'book', 'video'] } },
methods: { submitForm() { this.$emit('on-form-submit'); }, changeTitle(title) {
this.$emit('update:title', title) }, changeType(type) {
this.$emit('update:type', type) } ... } }
