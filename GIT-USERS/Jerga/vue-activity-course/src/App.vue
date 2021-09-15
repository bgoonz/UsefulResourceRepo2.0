<template>
  <div id="activityApp">
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <h1>{{ fullAppName }}</h1>
        </div>
      </div>
    </nav>
    <TheNavbar @filterSelected="setFilter" />
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <ActivityCreate :categories="categories" />
        </div>
        <div class="column is-9">
          <div
            class="box content"
            :class="{ fetching: isFetching, 'has-error': error }"
          >
            <div v-if="error">
              {{ error }}
            </div>
            <div v-else>
              <div v-if="isFetching">Loading ...</div>
              <div v-if="isDataLoaded">
                <ActivityItem
                  v-for="activity in filteredActivities"
                  :key="activity.id"
                  :activity="activity"
                  :categories="categories"
                />
              </div>
            </div>
            <div v-if="!isFetching">
              <div class="activity-length">
                Currenly {{ activityLength }} activities
              </div>
              <div class="activity-motivation">{{ activityMotivation }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import store from "./store";

import ActivityItem from "@/components/ActivityItem";
import ActivityCreate from "@/components/ActivityCreate";
import TheNavbar from "@/components/TheNavbar";

// import { fetchActivities, fetchUser, fetchCategories, deleteActivityAPI } from '@/api'
import fakeApi from "@/lib/fakeApi";

export default {
  name: "App",
  components: { ActivityItem, ActivityCreate, TheNavbar },
  data() {
    const {
      state: { activities, categories },
    } = store;
    return {
      creator: "Filip Jerga",
      appName: "Activity Planner",
      isFetching: false,
      error: null,
      user: {},
      activities,
      categories,
      filter: "all",
    };
  },
  computed: {
    filteredActivities() {
      let condition;

      if (this.filter === "all") {
        return this.activities;
      }

      if (this.filter === "inprogress") {
        condition = (value) => value > 0 && value < 100;
      } else if (this.filter === "finished") {
        condition = (value) => value === 100;
      } else {
        condition = (value) => value === 0;
      }

      return Object.values(this.activities).filter((activity) =>
        condition(activity.progress)
      );
    },
    fullAppName() {
      return this.appName + " by " + this.creator;
    },
    activityLength() {
      return Object.keys(this.activities).length;
    },
    activityMotivation() {
      if (this.activityLength && this.activityLength < 5) {
        return "Nice to see some activities (:";
      } else if (this.activityLength >= 5) {
        return "So many activities! Good Job!";
      } else {
        return "No activities, so sad :(";
      }
    },
    activitiesLength() {
      return Object.keys(this.activities).length;
    },
    categoriesLength() {
      return Object.keys(this.categories).length;
    },
    isDataLoaded() {
      return this.activitiesLength && this.categoriesLength;
    },
  },
  created() {
    // ONLY RUN ONE TO POPULATE LOCAL STORAGE!!!!!
    // fakeApi.fillDB()

    this.isFetching = true;
    store
      .fetchActivities()
      .then((activities) => {
        this.isFetching = false;
      })
      .catch((err) => {
        this.error = err;
        this.isFetching = false;
      });

    this.user = store.fetchUser();
    store.fetchCategories().then((categories) => {});
  },
  methods: {
    setFilter(filterOption) {
      this.filter = filterOption;
    },
  },
};
</script>

<style>
#activityApp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body {
  font-family: "Open Sans", serif;
  background: #f2f6fa;
}
footer {
  background-color: #f2f6fa !important;
}

.fetching {
  border: 2px solid orange;
}

.has-error {
  border: 2px solid red;
}

.activity-motivation {
  float: right;
}

.activity-length {
  display: inline-block;
}

.example-wrapper {
  margin-left: 30px;
}

.topNav {
  border-top: 5px solid #3498db;
}
.topNav .container {
  border-bottom: 1px solid #e6eaee;
}
.container .columns {
  margin: 3rem 0;
}
.navbar-menu .navbar-item {
  padding: 0 2rem;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8f99a3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eaee;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li {
  padding: 5px;
}

.navbar-brand > h1 {
  font-size: 31px;
  padding: 20px;
}
</style>
