<template>
  <article class="post">
    <div class="activity-title-wrapper">
      <h4 class="activity-title">{{ activity.title }}</h4>
      <i
        class="fas fa-cog activity-settings"
        @click="isMenuDisplayed = !isMenuDisplayed"
      />
    </div>
    <p>{{ textUtility_capitilize(categories[activity.category].text) }}</p>
    <p>{{ activity.notes }}</p>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png" />
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Filip Jerga</a> updated
            {{ activity.updatedAt | prettyTime }} &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <span
          >Progress:
          <span :style="{ color: activityProgress }"
            >{{ activity.progress }} %</span
          ></span
        >
      </div>
    </div>
    <div v-if="isMenuDisplayed" class="activity-controll">
      <a class="button is-warning" @click="$emit('toggleUpdate', true)">Edit</a>
      <a class="button is-danger" @click="deleteActivity">Delete</a>
    </div>
  </article>
</template>

<script>
import textUtility from "@/mixins/textUtility";
import store from "@/store";

export default {
  mixins: [textUtility],
  props: {
    categories: {
      type: Object,
      required: true,
    },
    activity: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isMenuDisplayed: false,
    };
  },
  computed: {
    activityProgress() {
      const progress = this.activity.progress;

      if (progress <= 0) {
        return "red";
      } else if (progress <= 50) {
        return "orange";
      } else {
        return "green";
      }
    },
  },
  methods: {
    deleteActivity() {
      store.deleteActivity(this.activity);
    },
  },
};
</script>

<style lang="scss" scoped>
.activity-title {
  margin-bottom: 5px;
  display: inline-block;
}

.activity-settings {
  float: right;
  font-size: 22px;

  &:hover {
    cursor: pointer;
  }
}

.activity-controll {
  margin: 20px 0 0 0;

  a {
    margin-right: 5px;
  }
}

.post .title {
  margin-bottom: 5px;
}
</style>
