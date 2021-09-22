<template>
  <app-modal
    :onModalSubmit="submitModal"
    :isSubmitButtonEnabled="isAllowedPrice"
    submitText="Comfirm"
  >
    <div class="deal">
      <!-- TODO: replace by actual name -->
      <div class="deal-highlight">{{ exchange.user.fullName }} Offer</div>
      <div class="deal-wrapper">
        <!-- TODO: type of an exchange -->
        <div>Offering {{ exchange.type }}</div>
        <!-- TODO: title of exchange  -->
        <div>"{{ exchange.title }}"</div>
      </div>
      <div class="deal-highlight">Your Offer</div>
      <div class="counter-offer">
        <div class="field">
          Would you prefer to exchange credit ?
          <label class="checkbox is-large">
            <input v-model="isOfferingCredit" type="checkbox" />
            Yes
          </label>
        </div>
        <!-- TODO: provide "disabled" class when user is NOT offering credit -->
        <div class="field" :class="!isOfferingCredit ? 'disabled' : ''">
          <label class="label">How Much Credit ?</label>
          <div class="control">
            <input
              v-model="selectedCredit"
              class="input"
              type="number"
              placeholder="40"
            />
          </div>
        </div>
        <!-- TODO: provide "disabled" class when user IS offering credit -->
        <div class="field" :class="isOfferingCredit ? 'disabled' : ''">
          <label class="label">Exchange</label>
          <div class="control">
            <div class="select">
              <select v-model="selectedExchange">
                <option
                  v-for="offeredExchange in offeredExchanges"
                  :key="offeredExchange.id"
                  :value="offeredExchange"
                >
                  {{ offeredExchange.title }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div v-if="selectedExchange">
          Your price is:
          <span class="deal-highlight">{{ selectedExchange.price$ }}</span>
        </div>
        <div
          v-if="percentDifference !== null"
          :class="`price price-${percentDifferenceClass}`"
        >
          {{ priceDifferenceText }}
        </div>
      </div>
      <i>Allowed difference is not less than {{ ALLOWED_DIFFERENCE }}%</i>
    </div>
    <template #openingElement>
      <a
        target="_"
        class="button is-fullwidth is-large is-danger is-outlined m-b-sm"
      >
        Make a deal
      </a>
    </template>
  </app-modal>
</template>

<script>
import AppModal from "@/components/Modal";
import { db } from "@/db";
export default {
  components: { AppModal },
  props: {
    onModalSubmit: {
      required: true,
      type: Function,
    },
    exchange: {
      type: Object,
      required: true,
    },
    offeredExchanges: {
      type: Array,
      required: true,
    },
    fromUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOfferingCredit: false,
      selectedExchange: null,
      selectedCredit: null,
      ALLOWED_DIFFERENCE: 20,
    };
  },
  computed: {
    offeredPrice() {
      if (this.isOfferingCredit) {
        return this.selectedCredit;
      }

      return this.selectedExchange && this.selectedExchange.price;
    },
    percentDifference() {
      if (!this.offeredPrice) {
        return null;
      }

      const priceDifference = this.offeredPrice - this.exchange.price;
      return (priceDifference / this.exchange.price) * 100;
    },
    priceDifferenceText() {
      if (this.percentDifference === null) {
        return "";
      }
      if (this.percentDifference === 0) {
        return "You are offering the exact same amount";
      }

      const roundedPercentDifference =
        Math.round(this.percentDifference * 100) / 100;
      const differenceText = this.percentDifference > 0 ? "Higher" : "Lower";

      return `Offered price is ${roundedPercentDifference}% ${differenceText} than exchange price`;
    },
    isAllowedPrice() {
      if (!this.offeredPrice) {
        return false;
      }
      return this.percentDifference >= -this.ALLOWED_DIFFERENCE;
    },
    percentDifferenceClass() {
      return this.isAllowedPrice ? "allowed" : "declined";
    },
  },
  methods: {
    submitModal(closeCallback) {
      const opportunity = {
        title: this.exchange.title,
        toExchange: db.doc("exchanges/" + this.exchange.id),
        toUser: db.doc("profiles/" + this.exchange.user.id),
        fromUser: {
          id: this.fromUser.uid,
          name: this.fromUser.profile.fullName,
          avatar: this.fromUser.profile.avatar,
        },
      };

      if (this.isOfferingCredit) {
        opportunity.fromExchangeCash = parseInt(this.selectedCredit, 10);
      } else {
        opportunity.fromExchange = db.doc(
          "exchanges/" + this.selectedExchange.id
        );
      }

      this.$store
        .dispatch("opportunity/createOpportunity", opportunity)
        .then((_) => {
          closeCallback();
          this.$toasted.success("Opportunity has been succesfuly created!", {
            duration: 3000,
          });
        })
        .catch((e) => console.error(e));
    },
  },
};
</script>

<style scoped lang="scss">
.price {
  padding: 7px;

  &-allowed {
    background-color: #cdeacd;
  }

  &-declined {
    background-color: #ffc2c2;
  }
}

.deal-wrapper {
  margin-bottom: 10px;
}
.counter-offer,
.deal-wrapper {
  border: 2px solid grey;
  padding: 10px;
  margin-top: 10px;
  &-title {
    font-size: 21px;
    margin: 5px 0;
    font-weight: bold;
  }
}
.deal {
  font-size: 19px;
  &-highlight {
    font-size: 19px;
    font-weight: bold;
  }
}
.disabled {
  &.field {
    input,
    textarea,
    select {
      pointer-events: none;
      color: grey;
    }
    label {
      color: grey;
    }
  }
}
</style>
