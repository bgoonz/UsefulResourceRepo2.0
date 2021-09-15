<template>
  <div v-if="!resource?._id" class="card">
    <div class="card-body">No Resource is selected :(</div>
  </div>
  <div v-else :class="`card ${getTheme()}`">
    <div class="card-header">
      {{ resource.title }}
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>{{ resource.description }}</p>
        <footer class="text-muted mb-2">{{ resource.type }}</footer>
      </blockquote>
      <a
        target="_blank"
        :href="resource.link"
        class="btn btn-outline-primary mr-2"
        >Resource Link</a
      >
      <slot name="buttonLink"></slot>
    </div>
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
  inject: ["getTheme"],
};
</script>

<style>
.card.dark {
  color: black;
}
</style>
