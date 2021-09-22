<template>
  <div>
    <hero :onSearch="filterExchanges" />
    <section class="posts">
      <div class="container">
        <div class="posts-type">Latest Posts</div>
        <!-- provides exchanges -->
        <exchange-list :exchanges="exchanges" />
      </div>
    </section>
    <pagination :onNextPage="getMoreExchanges" />
  </div>
</template>

<script>
import Hero from "@/components/Hero";
import Pagination from "@/components/Pagination";
import ExchangeList from "@/components/exchange/ExchangeList";

export default {
  components: {
    Hero,
    Pagination,
    ExchangeList,
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
      return this.$store.getters["exchange/filteredExchanges"](
        this.searchedExchangeTitle
      );
    },
  },
  methods: {
    getMoreExchanges({ page }) {
      this.$store.dispatch("exchange/getMoreExchanges", { page });
    },
    filterExchanges(searched) {
      this.searchedExchangeTitle = searched;
    },
  },
};
</script>
