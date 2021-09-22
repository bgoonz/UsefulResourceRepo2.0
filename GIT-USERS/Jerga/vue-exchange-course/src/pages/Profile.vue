<template>
  <div class="container profile base-page">
    <div class="section profile-heading">
      <div class="columns is-mobile is-multiline">
        <div class="column is-2">
          <figure class="image header-icon user-profile-image">
            <!-- TODO: Get user avatar here -->
            <img class="is-rounded" :src="profile.avatar" />
          </figure>
        </div>
        <div class="column is-4-tablet is-10-mobile name">
          <div class="user-info">
            <p>
              <span class="title is-bold">{{ profile.fullName }}</span>
              <br />
              <!-- TODO: Here will be user update functionality -->
            </p>
            <!-- TODO: User info Here if any -->
            <p class="tagline">
              {{ profile.info }}
            </p>
          </div>
          <user-update-modal
            :onModalSubmit="updateProfile"
            :userProfile="user.profile"
          />
        </div>
        <!-- TODO: Set activeTab variable to 'pending exchanges' and class to 'isActive' when activeTab === 'pending exchanges' -->
        <div
          @click="selectedOpportunities = 'received'"
          :class="{ 'is-active': selectedOpportunities === 'received' }"
          class="
            stats-tab stats-tab-interactive
            column
            is-2-tablet is-4-mobile
            has-text-centered
          "
        >
          <p class="stat-val">Received</p>
          <p class="stat-key">Opportunities</p>
        </div>

        <!-- TODO: Set activeTab variable to 'sent exchanges' and class to 'isActive' when activeTab === 'sent exchanges' -->
        <div
          @click="selectedOpportunities = 'sent'"
          :class="{ 'is-active': selectedOpportunities === 'sent' }"
          class="
            stats-tab stats-tab-interactive
            column
            is-2-tablet is-4-mobile
            has-text-centered
          "
        >
          <p class="stat-val">Sent</p>
          <p class="stat-key">Opportunities</p>
        </div>

        <!-- TODO: Set activeTab variable to 'accepted exchanges' and class to 'isActive' when activeTab === 'accepted exchanges' -->
        <div class="stats-tab column is-2-tablet is-4-mobile has-text-centered">
          <p class="stat-val">{{ profile.credit }}</p>
          <p class="stat-key">Credits</p>
        </div>
      </div>
    </div>
    <div
      v-if="selectedOpportunities === 'received'"
      class="columns is-mobile is-multiline"
    >
      <!-- TODO: Iterate over exchanges -->
      <template v-if="opportunities && opportunities.length > 0">
        <div
          v-for="opportunity in opportunities"
          :key="opportunity.id"
          class="column is-3-tablet is-6-mobile"
        >
          <!-- Exchanges -->
          <div class="card">
            <div v-if="opportunity.fromExchange" class="card-image">
              <figure class="image is-4by3">
                <!-- TODO: Display Exchange Image -->
                <img :src="opportunity.fromExchange.image" />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <!-- TODO: Display Exchange title -->
                  <p class="title is-4">{{ opportunity.title }}</p>
                  <!-- TODO: Display Exchange type name -->
                  <p class="subtitle is-6">
                    <span
                      :class="[
                        { 'is-success': opportunity.status === 'accepted' },
                        { 'is-danger': opportunity.status === 'declined' },
                        { 'is-warning': opportunity.status === 'pending' },
                      ]"
                      class="tag is-dark subtitle"
                      >{{ opportunity.status }}</span
                    >
                  </p>
                </div>
              </div>
              <div class="content">
                <!-- TODO: Display exchange shortInfo -->
                <p v-if="opportunity.fromExchange">
                  {{ opportunity.fromExchange.description }}
                </p>
                <p v-else>User wants to exchange your item for cash</p>
              </div>
            </div>
            <footer class="card-footer">
              <!-- <router-link to="/" class="card-footer-item">Accept</router-link>
              <a class="card-footer-item delete-item">Decline</a> -->
              <opportunity-deal-modal
                v-if="opportunity.status === 'pending'"
                :opportunity="opportunity"
              />
              <opportunity-accepted-modal
                v-if="opportunity.status === 'accepted'"
                :userId="opportunity.fromUser.id"
              />
            </footer>
          </div>
          <br />
        </div>
      </template>
      <div v-else class="stats-error">No pending opportunities :(</div>
    </div>
    <div
      v-if="selectedOpportunities === 'sent'"
      class="columns is-mobile is-multiline"
    >
      <template v-if="sendOpportunities && sendOpportunities.length > 0">
        <div
          v-for="sOpportunity in sendOpportunities"
          :key="sOpportunity.id"
          class="column is-3-tablet is-6-mobile"
        >
          <!-- Exchanges -->
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <!-- TODO: Display Exchange Image -->
                <img :src="sOpportunity.toExchange.image" />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <!-- TODO: Display Exchange title -->
                  <p class="title is-4">{{ sOpportunity.toExchange.title }}</p>
                  <!-- TODO: Display Exchange type name -->
                  <p class="subtitle is-6">
                    <span
                      :class="[
                        { 'is-success': sOpportunity.status === 'accepted' },
                        { 'is-danger': sOpportunity.status === 'declined' },
                        { 'is-warning': sOpportunity.status === 'pending' },
                      ]"
                      class="tag is-dark subtitle"
                      >{{ sOpportunity.status }}</span
                    >
                  </p>
                </div>
              </div>
              <div class="content">
                <!-- TODO: Display exchange shortInfo -->
                <p>
                  {{ sOpportunity.toExchange.description }}
                </p>
              </div>
            </div>
            <footer class="card-footer">
              <opportunity-accepted-modal
                v-if="sOpportunity.status === 'accepted'"
                :userId="sOpportunity.toUser.id"
              />
            </footer>
          </div>
          <br />
        </div>
      </template>
      <div v-else class="stats-error">No send opportunities :(</div>
    </div>
  </div>
</template>
<script>
import UserUpdateModal from "@/components/profile/UserUpdateModal";
import OpportunityDealModal from "@/components/opportunity/OpportunityDealModal";
import OpportunityAcceptedModal from "@/components/opportunity/OpportunityAcceptedModal";

export default {
  components: {
    UserUpdateModal,
    OpportunityDealModal,
    OpportunityAcceptedModal,
  },
  data() {
    return {
      selectedOpportunities: "received",
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    profile() {
      return this.user.profile || {};
    },
    opportunities() {
      return this.$store.state.opportunity.opportunities;
    },
    sendOpportunities() {
      return this.$store.state.opportunity.sendOpportunities;
    },
  },
  created() {
    this.$store.dispatch("opportunity/getOpportunities");
    this.$store.dispatch("opportunity/getSendOpportunities");
  },
  methods: {
    updateProfile(profile, closeModal) {
      this.$store.dispatch("auth/updateProfile", profile).then((_) => {
        closeModal();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.user-info {
  margin-bottom: 10px;
}

.stats-error {
  font-size: 40px;
  font-weight: bold;
  margin-top: 30px;
}

.delete-item {
  color: red;
}

.stats-tab {
  border-bottom: 2px solid transparent;
  transition: 0.5s;

  &-interactive {
    &:hover {
      cursor: pointer;
      border-bottom: 2px solid black;
    }
  }

  &.is-active {
    border-bottom: 2px solid black;
  }
}

.stat-val {
  font-size: 2em;
  padding-top: 20px;
  font-weight: bold;
}

.stat-key {
  font-size: 1.4em;
  font-weight: 200;
}

.section.profile-heading
  .column.is-2-tablet.has-text-centered
  + .has-text-centered {
  border-left: 1px dotted rgba(0, 0, 0, 0.2);
}

.container.profile {
  margin-top: 1%;
}

.control.is-pulled-left span.select {
  margin-right: 5px;
  border-radius: 2px;
}

.modal-card .content h1 {
  padding: 40px 10px 10px;
  border-bottom: 1px solid #dadada;
}

.container.profile .profile-options .tabs ul li.link a {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f1f1f1;
}
</style>
