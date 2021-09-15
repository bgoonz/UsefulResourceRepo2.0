<template>
  <div class="columns is-multiline">
    <!-- 1. Iterate over exchanges -->
    <div
      v-for="exchange in exchanges"
      :key="exchange.id"
      class="column is-12-mobile is-6-tablet is-4-widescreen is-6-desktop"
    >
      <div class="item post-card bottom-border">
        <router-link
          class="item-link"
          :to="{ name: 'ExchangeDetailPage', params: { id: exchange.id } }"
        >
          <!-- 2. Provide image from exchange to background-image -->
          <figure
            class="image is-2by1 item-figure background-img"
            :style="{ 'background-image': `url(${exchange.image})` }"
            alt="image"
          ></figure>
          <div class="item-featured">
            <div class="exchange-icon">
              <font-awesome-icon icon="star" />
            </div>
          </div>
        </router-link>
        <div class="item-tags">
          <!-- 3. Iterate over exchange tags -->
          <!-- TODO: Create custom key from tag ??? -->
          <a
            v-for="tag in exchange.tags"
            :key="tag"
            class="button is-rounded"
            href="#"
            title="Some Title"
            >#{{ tag }}</a
          >
        </div>
        <!-- 4. Display exchange title -->
        <h2 class="title item-title is-size-4 has-text-weight-extra-bold">
          <a class="item-link" href="#">{{ exchange.title }}</a>
        </h2>
        <div class="level">
          <div class="level-left">
            <!-- Dont worry about author, TODO: finish later -->
            <div class="item-author">Filip Jerga</div>
          </div>
          <!-- Dont worry about date, TODO: finish later -->
          <div class="level-right">27th December 2019</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    exchanges: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.exchange-icon {
  height: 25px;
  width: 25px;
  color: #ffbc8c;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
