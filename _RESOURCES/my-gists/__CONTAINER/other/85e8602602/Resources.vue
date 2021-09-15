<template>
  ...
  <input
    @keyup="handleSearch"
    type="text"
    class="form-control"
    placeholder="Some title"
  />
  ...
</template>
<script>
...
methods: {
  ...
  handleSearch(e) {
    this.setSearchQuery(e.target.value)
  }
}
...
</script>
