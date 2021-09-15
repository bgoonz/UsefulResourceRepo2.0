<template>
  <nb-container>
    <nb-content>
      <!-- Iterate People -->
      <view v-for="person in people" :key="person._id">
        <nb-list-item avatar>
          <nb-left>
            <!-- Display person avatar -->
            <nb-thumbnail large :source="{ uri: person.avatar }" />
          </nb-left>
          <nb-body>
            <!-- Display person username -->
            <nb-text>{{ person.username }}</nb-text>
          </nb-body>
        </nb-list-item>
      </view>
    </nb-content>
  </nb-container>
</template>

<script>
export default {
  props: {
    people: {
      type: Array,
      required: true,
    },
  },
};
</script>
