<template>
  <nav class="navbar is-white">
    <div class="container">
      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <a
            :class="{ 'is-active': filterOption === 'all' }"
            class="navbar-item"
            @click="emitFilter('all')"
          >
            All
          </a>
          <a
            :class="{ 'is-active': filterOption === 'inprogress' }"
            class="navbar-item"
            @click="emitFilter('inprogress')"
          >
            In Progress
          </a>
          <a
            :class="{ 'is-active': filterOption === 'finished' }"
            class="navbar-item"
            @click="emitFilter('finished')"
          >
            Finished
          </a>
          <a
            :class="{ 'is-active': filterOption === 'notstarted' }"
            class="navbar-item"
            @click="emitFilter('notstarted')"
          >
            Not Started
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      filterOption: "all",
    };
  },
  methods: {
    emitFilter(filterOption) {
      this.filterOption = filterOption;
      this.$emit("filterSelected", filterOption);
    },
  },
};
</script>
