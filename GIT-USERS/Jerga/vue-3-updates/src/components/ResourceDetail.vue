<template>
  <div v-if="resource?._id" :class="`card ${theme()}`">
    <div class="card-header">
      {{ resource.title }}
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>{{ resource.description }}</p>
        <footer class="text-muted mb-2">{{ resource.type }}</footer>
        <a
          target="_blank"
          :href="resource.link"
          class="btn btn-outline-primary"
        >
          Resource Link
        </a>
      </blockquote>
    </div>
  </div>
  <div v-else class="card">
    <div class="card-body">No Resource Selected</div>
  </div>
</template>
<script>
export default {
  props: {
    resource: {
      validator: (prop) => typeof prop === "object" || prop === null,
      required: true,
    },
  },
  inject: ["theme"],
};
</script>

<style scoped>
.card.dark {
  color: black;
}
</style>
