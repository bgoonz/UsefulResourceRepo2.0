<template>
  <app-modal
    :onModalOpen="fetchUserContact"
    :hideFooter="true"
    header="Accepted Opportunity"
  >
    <div v-if="userToContact && userToContact.id">
      <h1>You have accepted deal with user "{{ userToContact.fullName }}"</h1>
      <div class="catcher">
        Call "{{ userToContact.fullName }}" on phone:
        <span class="phone-number">{{ userToContact.phone }}</span>
      </div>
    </div>
    <template #openingElement>
      <button class="button is-primary is-fullwidth">Contact User</button>
    </template>
  </app-modal>
</template>

<script>
import AppModal from "@/components/Modal";
export default {
  components: {
    AppModal,
  },
  props: ["userId"],
  data() {
    return {
      userToContact: {},
    };
  },
  methods: {
    fetchUserContact() {
      if (this.userId === this.userToContact.id) {
        return;
      }

      this.$store
        .dispatch("auth/getUserById", this.userId)
        .then((user) => (this.userToContact = user));
    },
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
