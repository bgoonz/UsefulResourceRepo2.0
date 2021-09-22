<template>
  <div>
    <AppHeader
      :onSearch="filterExchanges"
      :items="menuItems"
      style="border-bottom: none !important"
    ></AppHeader>
    <section class="posts">
      <div class="container-fluid">
        <div class="posts-type"></div>
        <!-- provides exchanges -->
        <exchange-list :exchanges="exchanges" />
      </div>
    </section>
    <Pagination :onNextPage="getMoreExchanges"></Pagination>
  </div>
</template>

<script>
import ExchangeList from "@/components/exchange/ExchangeList";
import AppHeader from "@/components/Header";
import Pagination from "@/components/Pagination";

export default {
  components: {
    ExchangeList,
    AppHeader,
    Pagination,
  },
  data() {
    return {
      searchedExchangeTitle: "",
    };
  },
  created() {
    this.$store.dispatch("exchange/getExchanges");
  },
  computed: {
    exchanges() {
      return this.$store.state.exchange.items;
    },
  },
  methods: {
    filterExchanges(searched) {
      this.searchedExchangeTitle = searched;
      this.$store.dispatch("exchange/getExchanges", { searched });
    },
    getMoreExchanges({ page }) {
      this.$store.dispatch("exchange/getMoreExchanges", {
        page,
        searched: this.searchedExchangeTitle,
      });
      window.scrollTo(0, 0);
      var idcover = document.getElementById("idcover");
      idcover.style.display = "none";
    },
  },
};
</script>

<style scoped>
.posts {
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 20px;
  padding-bottom: 40px;
}
@media (min-width: 1000px) {
  .posts {
    padding-right: 10px;
    padding-left: 10px;
  }
}

@media (min-width: 1550px) {
  .posts {
    padding-right: 70px;
    padding-left: 70px;
  }
}
</style>
