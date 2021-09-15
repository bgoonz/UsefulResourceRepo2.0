<template>
  <nav class="navbar navbar-expand-lg navbar-light justify-content-between">
    <AppLogo />
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar"
      aria-controls="navbar"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar">
      <!--Main navigation list-->

      <ul class="navbar-nav">
        <li class="nav-item">
          <app-link to="/">Home</app-link>
        </li>
        <li class="nav-item">
          <app-link to="/condos">Condo Directory</app-link>
        </li>
        <li class="nav-item">
          <app-link to="/newlaunch">New Launch</app-link>
        </li>
        <li class="nav-item">
          <app-link to="/listings">Listings</app-link>
        </li>
        <li class="nav-item">
          <app-link to="/districts">Districts</app-link>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <!-- YOUR CUSTOM LINKS -->
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
      </ul>

      <!--Main navigation list-->
    </div>
    <!--end navbar-collapse-->
  </nav>
</template>

<script>
import AppLogo from "~/components/AppLogo.vue";
import AppLink from "~/components/AppLink";

export default {
  components: {
    AppLogo,
    AppLink,
  },
};
</script>

<style scoped>
#navbar {
  text-align: center;
}

#navbar a {
  text-decoration: none;
  display: inline-block;
}

#navbar a:hover {
  background: none;
  color: #ff0000;
  border-radius: 4px;
}
</style>
