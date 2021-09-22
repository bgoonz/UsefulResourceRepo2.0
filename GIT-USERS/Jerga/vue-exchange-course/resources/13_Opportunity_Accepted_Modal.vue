<template>
  <app-modal ref="appModal" header="Accepted Opportunity">
    <div>
      <h1>You have accepted deal with user "Some User"</h1>
      <div class="catcher">
        Call "Some User" on phone: <span class="phone-number">31273621</span>
      </div>
    </div>
    <template #openingElement>
      <button class="button is-fullwidth">See Details</button>
    </template>
  </app-modal>
</template>

<script>
import AppModal from "@/components/Modal";
export default {
  components: {
    AppModal,
  },
};
</script>
<style scoped lang="scss">
.catcher {
  font-size: 23px;
}
.phone-number {
  font-size: 27px;
  font-weight: bold;
}
.info-container {
  display: flex;
  margin: 20px 0;
  .info-heading {
    flex: 1;
    font-size: 20px;
    padding-right: 30px;
    .app-title {
      font-weight: bold;
      font-size: 30px;
    }
  }
  .info-value {
    &-title {
      font-size: 20px;
      text-align: center;
    }
    &-money {
      font-size: 45px;
      font-weight: bold;
    }
  }
}
</style>
