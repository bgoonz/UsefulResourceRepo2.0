<app-modal :onModalSubmit="submitModal">
  <div class="deal">
    <!-- TODO: replace by actual name -->
    <div class="deal-highlight">Exchange Owner Offer</div>
    <div class="deal-wrapper">
      <!-- TODO: type of an exchange -->
      <div>Offering service</div>
      <!-- TODO: title of exchange  -->
      <div>"Renting book"</div>
    </div>
    <div class="deal-highlight">Your Offer</div>
    <div class="counter-offer">
      <div class="field">
        Would you prefer to exchange credit ?
        <label class="checkbox is-large">
          <input type="checkbox">
          Yes
        </label>
      </div>
      <!-- TODO: provide "disabled" class when user is NOT offering credit -->
      <div class="field">
        <label class="label">How Much Credit ?</label>
        <div class="control">
          <input
            class="input"
            type="number"
            placeholder="40">
        </div>
      </div>
      <!-- TODO: provide "disabled" class when user IS offering credit -->
      <div class="field">
        <label class="label">Exchange</label>
        <div class="control">
          <div class="select">
            <select>
              <option value="service">Service</option>
              <option value="product">Product</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
  <template #openingElement>
    <a
      target="_"
      class="button is-fullwidth is-large is-danger is-outlined m-b-sm">
      Make a deal
    </a>
  </template>
</app-modal>

<style scoped lang="scss">
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
