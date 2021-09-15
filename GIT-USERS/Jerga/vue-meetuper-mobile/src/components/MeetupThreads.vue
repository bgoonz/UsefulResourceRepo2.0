<template>
  <nb-container v-if="threadsExist">
    <nb-content>
      <!-- Iterate Threads -->
      <view v-for="thread in threads" :key="thread._id">
        <nb-list-item avatar>
          <nb-left>
            <!-- Thread User Avatar -->
            <nb-thumbnail :source="{ uri: thread.user.avatar }" small />
          </nb-left>
          <nb-body>
            <!-- Thread User Name -->
            <nb-text>{{ thread.user.name }}</nb-text>
            <!-- Thread Title -->
            <nb-text note :numberOfLines="1">{{ thread.title }}</nb-text>
          </nb-body>
          <nb-right>
            <!-- Thread Date -->
            <nb-text note>{{ thread.createdAt | formatDate }}</nb-text>
          </nb-right>
        </nb-list-item>
        <!-- Iterate Posts Here -->
        <view class="post-container" v-for="post in thread.posts">
          <nb-list-item avatar>
            <nb-left>
              <!-- Post User Avatar -->
              <nb-thumbnail :source="{ uri: post.user.avatar }" small />
            </nb-left>
            <nb-body>
              <!-- Post User Name -->
              <nb-text>{{ post.user.name }}</nb-text>
              <!-- Post Text -->
              <nb-text note>{{ post.text }}</nb-text>
            </nb-body>
            <nb-right>
              <nb-text note>{{ post.updatedAt | fromNow }}</nb-text>
            </nb-right>
          </nb-list-item>
        </view>
      </view>
    </nb-content>
  </nb-container>
  <nb-container v-else>
    <AppMessage
      message="There are no threads currently created :("
      msgType="warning"
    />
  </nb-container>
</template>

<script>
export default {
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
  computed: {
    threadsExist() {
      return this.threads && this.threads.length > 0;
    },
  },
};
</script>

<style>
.post-container {
  padding-right: 20px;
  padding-left: 20px;
}
</style>
