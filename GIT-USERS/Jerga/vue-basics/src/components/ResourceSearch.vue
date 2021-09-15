<template>
  <form class="card p-2">
    <div class="input-group">
      <input
        @keyup="$emit('on-search', $event.target.value)"
        type="text"
        class="form-control"
        placeholder="Some title"
      />
    </div>
  </form>
</template>

<script>
export default {
  emits: ["on-search"],
};
</script>
