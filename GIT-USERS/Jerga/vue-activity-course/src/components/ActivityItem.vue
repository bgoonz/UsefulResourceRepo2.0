<template>
  <div>
    <ActivityItemUpdate
      v-if="isUpdateActive"
      :activity="activity"
      :categories="categories"
      @toggleUpdate="changeUpdateState"
    />
    <ActivityItemDetail
      v-else
      :activity="activity"
      :categories="categories"
      @toggleUpdate="changeUpdateState"
    />
  </div>
</template>

<script>
import ActivityItemDetail from "./ActivityItemDetail";
import ActivityItemUpdate from "./ActivityItemUpdate";
export default {
  components: {
    ActivityItemDetail,
    ActivityItemUpdate,
  },
  props: {
    activity: {
      required: true,
      type: Object,
    },
    categories: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      isUpdateActive: false,
    };
  },
  methods: {
    changeUpdateState(isUpdate) {
      debugger;
      this.isUpdateActive = isUpdate;
    },
  },
};
</script>

<style scoped></style>
