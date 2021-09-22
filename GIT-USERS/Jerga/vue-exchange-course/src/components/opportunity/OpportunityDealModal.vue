<template>
  <app-modal ref="appModal" :header="headerText" submitText="Accept Deal">
    <div>
      <h1>
        User "{{ opportunity.fromUser.name }}" has an amazing offer for you!
      </h1>
      <template v-if="opportunity.fromExchange">
        <div class="card-image">
          <figure class="image is-4by3">
            <!-- TODO: Display Exchange Image -->
            <img :src="opportunity.fromExchange.image" />
          </figure>
        </div>
        <div class="info-container">
          <div class="info-heading">
            <p class="app-title">{{ opportunity.fromExchange.title }}</p>
            <p class="description">
              {{ opportunity.fromExchange.description }}
            </p>
          </div>
          <div class="info-value">
            <div class="info-value-title">Price:</div>
            <div class="info-value-money">
              ${{ opportunity.fromExchange.price }}
            </div>
          </div>
        </div>
      </template>
      <template v-if="opportunity.fromExchangeCash">
        <div class="info-container">
          <div class="info-heading">
            <p class="app-title">
              "{{ opportunity.fromUser.name }}" wants to exchange credits
            </p>
          </div>
          <div class="info-value">
            <div class="info-value-title">Price:</div>
            <div class="info-value-money">
              ${{ opportunity.fromExchangeCash }}
            </div>
          </div>
        </div>
      </template>
      <hr />
      <h1>For Yours...</h1>
      <div class="card-image">
        <figure class="image is-4by3">
          <!-- TODO: Display Exchange Image -->
          <img :src="opportunity.toExchange.image" />
        </figure>
      </div>
      <div class="info-container">
        <div class="info-heading">
          <p class="app-title">{{ opportunity.toExchange.title }}</p>
          <p class="description">{{ opportunity.toExchange.description }}</p>
        </div>
        <div class="info-value">
          <div class="info-value-title">Price:</div>
          <div class="info-value-money">
            ${{ opportunity.toExchange.price }}
          </div>
        </div>
      </div>
    </div>
    <template #openingElement>
      <button class="button is-fullwidth">View a deal</button>
    </template>

    <template #footerElement>
      <button @click="acceptOpportunity(opportunity)" class="button is-success">
        Accept Deal
      </button>
      <button @click="declineOpportunity(opportunity)" class="button is-danger">
        Decline Deal
      </button>
      <button @click="() => modal.close()" class="button">Close</button>
    </template>
  </app-modal>
</template>

<script>
import AppModal from "@/components/Modal";
export default {
  components: {
    AppModal,
  },
  props: ["opportunity"],
  computed: {
    headerText() {
      return this.opportunity.fromExchange
        ? `Here is an offer for a ${this.opportunity.fromExchange.type}`
        : "Here is an offer for credits";
    },
    modal() {
      return this.$refs.appModal;
    },
  },
  methods: {
    acceptOpportunity(opportunity) {
      this.$store
        .dispatch("opportunity/acceptOpportunity", opportunity)
        .then((_) => {
          this.modal.close();
          this.$toasted.success("Opportunity has been accepted!", {
            duration: 3000,
          });
        });
    },
    declineOpportunity(opportunity) {
      this.$store
        .dispatch("opportunity/declineOpportunity", opportunity)
        .then((_) => {
          this.modal.close();
          this.$toasted.success("Opportunity has been declined!", {
            duration: 3000,
          });
        });
    },
  },
};
</script>
<style scoped lang="scss">
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
