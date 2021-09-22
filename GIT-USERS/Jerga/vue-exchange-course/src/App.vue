<template>
  <div>
    <app-header :items="menuItems" />
    <router-view />
  </div>
</template>

<script>
import AppHeader from "@/components/Header";
export default {
  name: "app",
  components: { AppHeader },
  data() {
    return {
      brandName: "Exchangario",
      menuItems: [
        { text: "Home", link: "/" },
        { text: "About", link: "/about" },
        { text: "FAQ", link: "/faq" },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "assets/styles/variables.scss";
@import "~bulma/bulma.sass";
@import "assets/styles/main.scss";

.page-wrapper {
  padding-top: 100px;
}

.base-page {
  padding-top: 30px;
}

.hero-section {
  position: relative;
}
.posts {
  padding-top: 70px;
}
.posts-type {
  font-size: 34px;
  margin-bottom: 10px;
  font-weight: bold;
}
.search-lookup {
  width: 960px;
  margin: 0 auto;
  background-color: #262d32;
  padding: 20px;
  color: white;
  border-radius: 10px;
}
.search-lookup-wrap {
  width: 100%;
  z-index: 2;
  position: absolute;
  top: auto;
  bottom: -42px;
}
.search-card-find {
  width: 100%;
  height: 180px;
  position: relative;
  display: block;
  border-radius: 3px;
  text-decoration: none;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.05);
  background-clip: content-box;
  background-size: cover;
  background-position: 50% 20%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  -webkit-tap-highlight-color: transparent;
  &-interest {
    position: absolute;
    bottom: 12px;
    right: 12px;
    > p {
      font-weight: bold;
    }
  }
  .title {
    color: white;
  }
  .subtitle {
    color: white;
  }
  &-content {
    &-date {
      margin: 10px;
      width: 70px;
      text-align: center;
      border-radius: 50%;
      .day {
        display: block;
        font-size: 21px;
        color: white;
        font-weight: bold;
      }
      .month {
        display: block;
        color: #ff5050;
        font-weight: bold;
        font-size: 23px;
        margin-bottom: -5px;
      }
    }
    &-info {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 15px;
      width: 100%;
    }
  }
}
</style>
