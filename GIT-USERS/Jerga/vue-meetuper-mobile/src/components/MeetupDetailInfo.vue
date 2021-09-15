<template>
  <view>
    <nb-card-item bordered>
      <nb-body>
        <!-- Label Styles -->
        <nb-text :style="styles.label"> Date </nb-text>
        <nb-text>
          {{ meetup.startDate | formatDate }}
        </nb-text>
        <!-- Label Styles -->
        <nb-text :style="styles.label"> From </nb-text>
        <nb-text>
          {{ meetup.timeFrom }}
        </nb-text>
        <!-- Label Styles -->
        <nb-text :style="styles.label"> To </nb-text>
        <nb-text>
          {{ meetup.timeTo }}
        </nb-text>
        <!-- Label Styles -->
        <nb-text :style="styles.label"> Category </nb-text>
        <nb-text>
          {{ meetup.category.name }}
        </nb-text>
        <!-- Label Styles -->
        <nb-text :style="styles.label"> Info </nb-text>
        <!-- short info -->
        <nb-text>
          {{ meetup.shortInfo }}
        </nb-text>
      </nb-body>
    </nb-card-item>
    <nb-card-item header bordered>
      <nb-text>Description</nb-text>
    </nb-card-item>
    <nb-card-item bordered>
      <nb-body>
        <!-- description -->
        <nb-text>
          {{ meetup.description }}
        </nb-text>
      </nb-body>
    </nb-card-item>
  </view>
</template>

<script>
import styles from "@/styles";
export default {
  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      styles,
    };
  },
};
</script>
