<template>
  <div class="columns">
    <div class="container profile">
      <div class="section profile-heading">
        <div class="columns is-mobile is-multiline">
          <div class="column is-2">
            <figure class="image header-icon user-profile-image">
              <!-- TODO: Get user avatar here -->
              <img class="is-rounded" src="https://placehold.it/225x225" />
            </figure>
          </div>
          <div class="column is-4-tablet is-10-mobile name">
            <div class="user-info">
              <p>
                <!-- TODO: Display user name here -->
                <span class="title is-bold">Some Name</span>
                <br />
                <!-- TODO: Here will be user update functionality -->
              </p>
              <!-- TODO: User info Here if any -->
              <p class="tagline">
                <!-- {{user.info}} -->
                Just some info
              </p>
            </div>
            <button class="button is-success">Update Info</button>
          </div>
          <!-- TODO: Set activeTab variable to 'pending exchanges' and class to 'isActive' when activeTab === 'pending exchanges' -->
          <div
            class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
          >
            <p class="stat-val">Received</p>
            <p class="stat-key">Exchanges</p>
          </div>

          <!-- TODO: Set activeTab variable to 'sent exchanges' and class to 'isActive' when activeTab === 'sent exchanges' -->
          <div
            class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
          >
            <p class="stat-val">Sent</p>
            <p class="stat-key">Exchanges</p>
          </div>

          <!-- TODO: Set activeTab variable to 'accepted exchanges' and class to 'isActive' when activeTab === 'accepted exchanges' -->
          <div
            class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
          >
            <p class="stat-val">Accepted</p>
            <p class="stat-key">Exchanges</p>
          </div>
        </div>
      </div>
      <!-- TODO: Display this div when activeTab === 'exchanges pending' -->
      <div class="columns is-mobile is-multiline">
        <!-- TODO: Iterate over exchanges -->
        <template>
          <div class="column is-3-tablet is-6-mobile">
            <!-- Exchanges -->
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <!-- TODO: Display Exchange Image -->
                  <img src="https://placehold.it/300x225" />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <!-- TODO: Display Exchange title -->
                    <p class="title is-4">Some Title</p>
                    <!-- TODO: Display Exchange type name -->
                    <p class="subtitle is-6">
                      <span class="tag is-dark subtitle">Product</span>
                    </p>
                  </div>
                </div>
                <div class="content">
                  <!-- TODO: Display exchange shortInfo -->
                  <p>Just some short info</p>
                </div>
              </div>
              <footer class="card-footer">
                <router-link to="/" class="card-footer-item"
                  >Accept</router-link
                >
                <a class="card-footer-item delete-item">Decline</a>
              </footer>
            </div>
            <br />
          </div>
        </template>
        <!-- <div v-else class="stats-error">
          No  pending exchanges :(
        </div> -->
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
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
}

.stats-tab:hover {
  cursor: pointer;
  border-bottom: 2px solid black;
}

.stats-tab.isActive {
  border-bottom: 2px solid black;
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
